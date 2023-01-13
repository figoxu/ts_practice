#!/bin/bash

function installNode() {
    brew install node
}

function installNpm() {
  npm i typescript -D
  npm i ts-node -D
  npm install -g typescript
}

function main() {
    installNode
    installNpm
}