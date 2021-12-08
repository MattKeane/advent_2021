const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const crabs = data
        .split(',')
        .map(crab => +crab)
    const max = Math.max(...crabs)
    const min = Math.min(...crabs)
    let best = Infinity
    for (let i = min; i <= max; i++) {
        const fuelSpent = crabs.reduce((acc, cur) => {
            const distance = Math.abs(cur - i)
            const fuel= ((distance + 1) / 2) * distance
            return acc + fuel
        }, 0)
        if (fuelSpent < best) best = fuelSpent
    }
    console.log(best)
})