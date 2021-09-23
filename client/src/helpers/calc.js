export const calcEndIndex = (cols, rows) => {
    const spaceLeftCols = cols - Math.floor(cols);
    const spaceLeftRows = rows - Math.floor(rows);

    let yInd, xInd;

    if (spaceLeftCols > 0.5){
        xInd = Math.floor(cols);
    }else{
        xInd = Math.floor(cols) - 1;
    }

    if (spaceLeftRows > 0.5){
        yInd = Math.floor(rows);
    }else{
        yInd = Math.floor(rows) - 1;
    }

    return {x: xInd, y: yInd};
}

export const checkVectorEquality = (vector1, vector2) =>{
    return (vector1.x === vector2.x && vector1.y === vector2.y);
}