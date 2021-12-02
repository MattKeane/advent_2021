const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const instructions = data.split('\n').map(line => {
        const lineArr = line.split(' ')
        return {
            direction: lineArr[0],
            distance: +lineArr[1],
        }
    })

    let submarine = {
        horizontal: 0,
        depth: 0,
        forward: function(distance) {
            this.horizontal += distance
        },
        down: function(distance) {
            this.depth += distance
        },
        up: function(distance) {
            this.depth -= distance
        }
    }

    instructions.forEach(({direction, distance}) => {
        submarine[direction](distance)
    })

    console.log(submarine.horizontal * submarine.depth)
})