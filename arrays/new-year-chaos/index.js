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

// Complete the minimumBribes function below.
const maxSwaps = 2;
function minimumBribes(q) {
    let swapArr = [];
    let tempElem;
    let minimumBribes = 0;
    for (let j = 0; j < q.length; j++) {
        // let swapDone = false;
        let value = q[j];
        let i;
        for (i = j - 1; i > -1 && q[i] > value; i--) {
            q[i + 1] = q[i];
            minimumBribes++;
            swapArr[q[i + 1]] = isNaN(swapArr[q[i + 1]]) ? 1 : swapArr[q[i + 1]] + 1;
            if (swapArr[q[i + 1]] > maxSwaps)
                return 'Too chaotic';

        }

        q[i + 1] = value;
        // if (!swapDone) break;
    }
    console.log(q);
    return minimumBribes;
}

function main() {
    const ws = fs.createWriteStream('result.txt');
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        let minB = minimumBribes(q);
        ws.write(minB + '\n');
        console.log(minB)
    }
    
    ws.end();
}
