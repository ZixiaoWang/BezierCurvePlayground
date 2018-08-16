var DEFAULT_POINTS_NUMBER = 1000;

window.addEventListener('load', (event) => {

    let canvas = $('.canvas');
    let ctx = canvas.getContext('2d');
    let pointsPanel = $('.pointsPanel');
    let pointsNumEle = $('#pointsNumber');
    let applyBtn = $('#applyBtn');
    let clearBtn = $('#clearBtn');
    let pointsArr = [];
    
    function $(selector) {
        return document.querySelector(selector);
    }

    function drawPoint(x, y, size, color) {
        ctx.beginPath();
        ctx.strokeStyle = color || "blue";
        ctx.arc(x, y, (size ? size : 5), 0,2*Math.PI);
        ctx.fillStyle = color || 'blue';
        ctx.stroke();
        ctx.fill();
    }

    function drawLine(x1, y1, x2, y2, width, color) {
        ctx.beginPath();
        ctx.lineWidth = width || 2;
        ctx.strokeStyle = color || "red";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function createBezierPoints(points) {
        let pointsNumber = parseInt(pointsNumEle.value) || DEFAULT_POINTS_NUMBER;
        console.log(pointsNumber)
        let bezierPoints = getBezierPoints(points, pointsNumber);
        return bezierPoints.map((pointCoor) => {
            let x = pointCoor[0];
            let y = pointCoor[1];
            return [x, y];
        })
    }

    function addPoint(x, y) {
        pointsArr.push([x, y]);
    }

    function updatePre(x, y) {
        pointsPanel.innerText = pointsArr.map(point => {
            return '[' + point[0].toFixed(1) + ', ' + point[1].toFixed(1) + ']';
        }).join('\n');
    }

    let containerRect = canvas.getBoundingClientRect();
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;
    pointsPanel.style.maxHeight = containerRect.height + 'px';

    canvas.addEventListener(
        'click', 
        (event) => {
            let x1, y1;
            let x2 = event.clientX - containerRect.left;
            let y2 = event.clientY - containerRect.top;

            if(pointsArr.length === 0) {
                x1 = x2;
                y1 = y2;
                drawPoint(x1, y1, 5, 'skyblue');
            } else {
                x1 = pointsArr[pointsArr.length-1][0];
                y1 = pointsArr[pointsArr.length-1][1];
                drawPoint(x2, y2, 5, 'skyblue');
                drawLine(x1, y1, x2, y2, 2, 'skyblue');
            }

            addPoint(x2, y2);
            updatePre(x2, y2);
        }
    );

    clearBtn.addEventListener(
        'click',
        (event) => {
            pointsArr = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updatePre();
        }
    )

    applyBtn.addEventListener(
        'click',
        (event) => {
            let bezierPoints = createBezierPoints(pointsArr);
            for(let i=0; i<bezierPoints.length-1; i++) {
                let startPoint = bezierPoints[i];
                let targetPoint = bezierPoints[i+1];
                drawLine(
                    startPoint[0], startPoint[1],
                    targetPoint[0], targetPoint[1],
                    2, 'red'
                );
            }
        }
    )
});
