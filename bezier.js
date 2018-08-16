function getBezierPoints(controlPointsArr, outputPointsAmount) {
    let number = outputPointsAmount || 100;
    let totalPoints = [];

    function drawSinglePoint(controlPointsArr, precentage) {
        if(controlPointsArr.length === 1) {
            return controlPointsArr[0];
        };
    
        let lowOrderArr = [];
        for(let i=0; i<controlPointsArr.length-1; i++) {
            let x1 = controlPointsArr[i][0];
            let y1 = controlPointsArr[i][1];
            let x2 = controlPointsArr[i+1][0];
            let y2 = controlPointsArr[i+1][1];
         
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
        let point = drawSinglePoint(controlPointsArr, (i/number));
        totalPoints.push(point);
    }

    return totalPoints;
}
