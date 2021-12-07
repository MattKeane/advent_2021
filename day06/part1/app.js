const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const fishes = data.split(',').map(fish => +fish)
    let fish = fishes.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})
    
    for (let i = 0; i < 80; i ++) {
        const newFish = {}
        for (const key in fish) {
            const day = +key
            if (day === 0) {
                newFish[8] = (newFish[8] || 0) + fish[0]
                newFish[6] = (newFish[6] || 0) + fish[0]
            } else {
                newFish[day - 1] = (newFish[day - 1] || 0) + fish[day]
            }
        }
        fish = newFish
    }

    let count = 0
    for (const key in fish) {
        count += fish[key]
    }

    console.log(count)
})