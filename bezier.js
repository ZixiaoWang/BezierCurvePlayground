function getBezierPoints(points, amount) {
    let number = amount || 100;
    let totalPoints = [];

    function drawSinglePoint(points, precentage) {
        if(points.length === 1) {
            return points[0];
        };
    
        let lowOrderArr = [];
        for(let i=0; i<points.length-1; i++) {
            let x1 = points[i][0];
            let y1 = points[i][1];
            let x2 = points[i+1][0];
            let y2 = points[i+1][1];
         
            lowOrderArr.push(
                [
                    x1 + ((x2-x1) * precentage),
                    y1 + ((y2-y1) * precentage)
                ]
            );
        }
    
        return drawSinglePoint(lowOrderArr, precentage);
    }

    for(let i=0; i<=number; i++) {
        let point = drawSinglePoint(points, (i/number));
        totalPoints.push(point);
    }

    return totalPoints;
}
