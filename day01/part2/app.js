const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        const depths = data.split('\n').map(depth => +depth)
        let increased = 0
        let prev = depths[0] + depths[1] + depths[2]
        for (let i = 3; i < depths.length; i ++) {
            const next = prev - depths[i - 3] + depths[i]
            if (next > prev) increased++
            prev = next
        }
        console.log(increased)
    }
})