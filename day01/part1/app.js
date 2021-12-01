const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        const depths = data.split('\n')
        let increased = 0
        for (let i = 1; i < depths.length; i++) {
            if (+depths[i] > +depths[i - 1]) increased++;
        }
        console.log(increased)
    }
})