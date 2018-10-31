'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputStcircle = '';
let currentLine = 0;
const fs = require('fs');

process.stdin.on('data', function(inputStdin) {
    inputStcircle += inputStdin;
});

process.stdin.on('end', function() {
    inputStcircle = inputStcircle.split('\n');

    main();
});

function readLine() {
    return inputStcircle[currentLine++];
}

function renderMatrix(matrix) {
    let str = '';
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            str += matrix[i][j] + (j + 1 < matrix[i].length ? ' ' : '');
        }
        str += (i + 1 < matrix.length ? '\n' : '');
    }
    return str;
}

//Updating only the defined values
function updateMatrix(matrix, newMatrix) {
    for (let i = 0; i < newMatrix.length; i++) {
        if (Array.isArray(newMatrix[i])) {
            for (let j = 0; j < newMatrix[i].length; j++) {
                if (typeof newMatrix[i][j] !== 'undefined') {
                    matrix[i][j] = newMatrix[i][j];
                }
            }
        }
    }
}

function moveElem(newMatrix, i, j, matrix, dir) {
    //Changing from Matrix locations to Array indexes
    i = i - 1;
    j = j - 1;
    switch (dir) {
        case 'left':
            if (!Array.isArray(newMatrix[i])) newMatrix[i] = [];
            newMatrix[i][j - 1] = matrix[i][j];
            break;
        case 'right':
            if (!Array.isArray(newMatrix[i])) newMatrix[i] = [];
            newMatrix[i][j + 1] = matrix[i][j];
            break;
        case 'up':
            if (!Array.isArray(newMatrix[i - 1])) newMatrix[i - 1] = [];
            newMatrix[i - 1][j] = matrix[i][j];
            break;
        case 'down':
            if (!Array.isArray(newMatrix[i + 1])) newMatrix[i + 1] = [];
            newMatrix[i + 1][j] = matrix[i][j];
            break;
        case 'none':
            if (!Array.isArray(newMatrix[i])) newMatrix[i] = [];
            newMatrix[i][j] = matrix[i][j];
            break;
    }

}


// The method I'm using is of concentric circles, we calculate how many circles the matrix has and loop through them
function matrixRotation(matrix, m, n, r) {
    //number of circles (smaller rows/columns number divided by 2);
    const circleNum = parseInt(Math.min.apply(null, [m, n]) / 2);
    let newMatrix, matrixBuffer, fullRotation, multiplier, rotations, dir;
    newMatrix = [];
    for (let c = 0; c < circleNum; c++) {
        matrixBuffer = matrix.slice();
        //Multiplier for the full rotation equation
        multiplier = (c * 2) + 1;
        //Calculating fullRotation - the number of steps it takes for a full rotation of the circle
        fullRotation = 2 * (n - multiplier) + 2 * (m - multiplier);
        //Getting the remainder from a division of total rotations by the circle's fullRotation number (as it's meaningless to repeatedly rotate a fullRotation)
        rotations = r % fullRotation;
        console.log('fullrotation: ' + fullRotation + ' rotations: ' + rotations);
        dir = '';
        //If rotations = 0 we need to just set the elements as they are on the newMatrix, we run 1 rotation with direction set to 'none'
        if (rotations == 0) {
            dir = 'none';
            rotations = 1;
        }
        for (let rotation = 0; rotation < rotations; rotation++) {
            for (let i = c + 1; i < m - c; i++) {
                if (dir !== 'none') dir = 'down';
                moveElem(newMatrix, i, c + 1, matrixBuffer, dir);
                if (dir !== 'none') dir = 'up';
                moveElem(newMatrix, i + 1, n - c, matrixBuffer, dir);
            }
            for (let j = c + 1; j < n - c; j++) {
                if (dir !== 'none') dir = 'left';
                moveElem(newMatrix, c + 1, j + 1, matrixBuffer, dir);
                if (dir !== 'none') dir = 'right';
                moveElem(newMatrix, m - c, j, matrixBuffer, dir);
            }

            updateMatrix(matrixBuffer, newMatrix);

        }
    }
    return newMatrix;
}
const initialTime = Date.now();
function main() {
    const ws = fs.createWriteStream('result.txt');
    const mnr = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(mnr[0], 10);

    const n = parseInt(mnr[1], 10);

    const r = parseInt(mnr[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    console.log('PRE RENDER - Time passed: ' + (Date.now() - initialTime));
    const result = renderMatrix(matrixRotation(matrix, m, n, r));
    console.log('END - Time passed: ' + (Date.now() - initialTime));
    ws.write(result);
    ws.end();
}
