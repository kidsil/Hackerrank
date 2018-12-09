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

// Complete the minSwaps function below.
function minimumSwaps(arr) {
    let minSwaps = 0;
    let tempElem;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]==(i+1))
            continue;
        
        tempElem = arr[arr[i]-1];
        arr[arr[i]-1] = arr[i];
        arr[i] = tempElem;
        minSwaps++;
        i--;

    }
    return minSwaps;
}

function main() {
    const ws = fs.createWriteStream('result.txt');
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr, 0);

    ws.write(res + '\n');

    ws.end();
}
