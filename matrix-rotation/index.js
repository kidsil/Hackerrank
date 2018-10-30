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
    }

}


// The method I'm using is of concentric circles, we calculate how many circles the matrix has and loop through them
function matrixRotation(matrix, m, n, r) {
    //number of circles (smaller rows/columns number divided by 2);
    const circleNum = parseInt(Math.min.apply(null, [m, n]) / 2);
    //How many rotations until the matrix is back to its original state

    let newMatrix;
    for (let rotation = 0; rotation < r; rotation++) {
        newMatrix = [];
        for (let c = 0; c < circleNum; c++) {
            for (let i = c + 1; i < m - c; i++) {
                moveElem(newMatrix, i, c + 1, matrix, 'down');
                moveElem(newMatrix, i + 1, n - c, matrix, 'up');
            }
            for (let j = c + 1; j < n - c; j++) {
                moveElem(newMatrix, c + 1, j + 1, matrix, 'left');
                moveElem(newMatrix, m - c, j, matrix, 'right');
            }
        }
        matrix = newMatrix.slice();
    }
    return newMatrix;
}

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

    const result = renderMatrix(matrixRotation(matrix, m, n, r));

    ws.write(result);
    ws.end();
}
