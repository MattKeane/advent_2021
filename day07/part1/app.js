const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const crabs = data
        .split(',')
        .map(crab => +crab)
        .sort((a, b) => a - b)
    const halfway = Math.floor(crabs.length / 2)
    const median = crabs[halfway]
    const movement = crabs.reduce((acc, cur) => {
        return acc + Math.abs(cur - median)
    }, 0)
    console.log(movement)
})