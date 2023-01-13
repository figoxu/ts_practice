#!/bin/bash

function compile() {
  tsc ./hello.ts
}

function main() {
    compile
}

main