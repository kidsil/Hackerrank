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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

const isRotation = (stack, needle) => {
	return stack.length == needle.length && stack.repeat(2).indexOf(needle) !== -1;
}

function main() {
    const ws = fs.createWriteStream('result.txt');
    const n = readLine();
    const n2 = readLine();

    let result = isRotation(n, n2);

    ws.write(result + "\n");
    ws.end();
}

