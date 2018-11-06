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

function insertionSort2(n, arr) {
    let reduce = 0;
    let insertElem;
    let swapDone = true;
    for (let i = 0; i < arr.length; i++) {
        if (!swapDone) {
            reduce++;
        }
        swapDone = false;
        insertElem = arr[arr.length - 1 - reduce];
        for (let j = arr.length - 2 - reduce; j >= 0; j--) {
            if (arr[j] > insertElem) {
                arr[j + 1] = arr[j];
                swapDone = true;
                console.log(arr.toString().replace(/,/g,' '));
            } else if (arr[j] < insertElem) {
                if (arr[j + 1] != insertElem) {
                    arr[j + 1] = insertElem;
                    console.log(arr.toString().replace(/,/g,' '));
                }
                break;
            }
        }
        //In case the last element is the smallest in the sorted array
        if (arr[0] > insertElem) {
            arr[0] = insertElem;
            console.log(arr.toString().replace(/,/g,' '));
        }
    }
}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    insertionSort2(n, arr);
}
