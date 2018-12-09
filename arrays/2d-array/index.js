'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the hourglassSum function below.
const hourGlassHeightWidth = 3;
let hourGlassSum;
let maxHourGlassSum = false;
function calcHourGlassSum(arr, i, j) {
    let hourGlassSum = arr[i][j] + arr[i][j+1] + arr[i][j+2]
    + arr[i+1][j+1]
    + arr[i+2][j] + arr[i+2][j+1] + arr[i+2][j+2];
    return hourGlassSum;
}
function hourglassSum(arr) {
    for (let i = 0; i < arr.length - hourGlassHeightWidth + 1; i++) {
        for (let j = 0; j < arr[i].length - hourGlassHeightWidth + 1; j++) {
            hourGlassSum = calcHourGlassSum(arr, i, j);
            if (maxHourGlassSum === false || maxHourGlassSum < hourGlassSum)
                maxHourGlassSum = hourGlassSum;
        }
    }
    return maxHourGlassSum;
}

function main() {
    const ws = fs.createWriteStream('result.txt');

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}