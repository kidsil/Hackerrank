'use strict';

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

// Complete the insertionSort1 function below.
function insertionSort1(n, arr) {
    let insertElem = arr[arr.length - 1];
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] > insertElem) {
            arr[i + 1] = arr[i];
            console.log(arr.toString().replace(/,/g,' '));
        } else if (arr[i] < insertElem) {
            arr[i + 1] = insertElem;
            console.log(arr.toString().replace(/,/g,' '));
            break;
        }
    }
    //In case the last element is the smallest in the sorted array
    if (arr[0] > insertElem) {
        arr[0] = insertElem;
        console.log(arr.toString().replace(/,/g,' '));
    }
}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    insertionSort1(n, arr);
}
