#!/bin/bash

function compile() {
  tsc ./hello.ts
}

function run() {
  node ./hello.js
}

function main() {
    compile
    run
}

main