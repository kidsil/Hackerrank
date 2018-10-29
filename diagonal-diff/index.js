'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the diagonalDifference function below.
function diagonalDifference(arr) {
    let diagonalDown = 0;
    let diagonalUp = 0;
    for (let i = 0; i < arr.length; i++) {
        diagonalDown += parseInt(arr[i][i], 10);
        diagonalUp += parseInt(arr[i][arr.length - i - 1], 10);
    }
    return Math.abs(diagonalDown - diagonalUp);
}

function main() {
    const ws = fs.createWriteStream('result.txt');

    const n = parseInt(readLine(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = diagonalDifference(arr);

    ws.write(result + '\n');

    ws.end();
}
