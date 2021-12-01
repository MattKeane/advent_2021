const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        const depths = data.split('\n').map(depth => +depth)
        let increased = 0
        for (let i = 3; i < depths.length; i++) {
            if (depths[i] > depths[i - 3]) increased ++
        }
        console.log(increased)
    }
})