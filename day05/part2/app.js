const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const lines = data.split('\n').map(line => {
        const [start, end] = line.split(' -> ')
        const startCoords = start.split(',')
        const endCoords = end.split(',')
        return {
            start: {
                x: +startCoords[0],
                y: +startCoords[1],
            },
            end: {
                x: +endCoords[0],
                y: +endCoords[1],
            }
        }
    })

    const map = []

    lines.forEach(({start, end}) => {
        if (start.x === end.x) {
            const [startPoint, endPoint] = start.y > end.y ? [end, start] : [start, end]
            while (map.length <= endPoint.y) {
                map.push([])
            }
            for (let i = startPoint.y; i <= endPoint.y; i++) {
                while (map[i].length <= startPoint.x) {
                    map[i].push(0)
                }
                map[i][startPoint.x] += 1
            }
        } else if (start.y === end.y) {
            const [startPoint, endPoint] = start.x > end.x ? [end, start] : [start, end]
            while (map.length <= endPoint.y) {
                map.push([])
            }
            while (map[startPoint.y].length <= endPoint.x) {
                map[startPoint.y].push(0)
            }
            for (let i = startPoint.x; i <= endPoint.x; i ++) {
                map[startPoint.y][i] += 1
            }
        } else if (start.x < end.x && start.y < end.y) {
            while (map.length <= end.y) {
                map.push([])
            }
            let x = start.x
            for (let i = start.y; i <= end.y; i++) {
                while (map[i].length <= x) {
                    map[i].push(0)
                }
                map[i][x] += 1
                x++
            }
        } else if (end.x < start.x && end.y < start.y) {
            while (map.length <= start.y) {
                map.push([])
            }
            let x = end.x
            for (let i = end.y; i <= start.y; i++) {
                while (map[i].length <= x) {
                    map[i].push(0)
                }
                map[i][x] += 1
                x++
            }
        } else if (start.x > end.x && start.y < end.y) {
            while (map.length <= end.y) {
                map.push([])
            }
            let x = start.x
            for (let i = start.y; i <= end.y; i++) {
                while (map[i].length <= x) {
                    map[i].push(0)
                }
                map[i][x] += 1
                x--
            }
        } else {
            while (map.length <= start.y) {
                map.push([])
            }
            let x = end.x
            for (let i = end.y; i <= start.y; i++) {
                while (map[i].length <= x) {
                    map[i].push(0)
                    
                }
                map[i][x] += 1
                x--
            }
        }
    })
    
    const overlapCount = map.reduce((acc, cur) => {
        const innerCount = cur.reduce((acc, cur) => {
            if (cur > 1) acc++
            return acc
        }, 0)
        return acc + innerCount
    }, 0)

    console.log(overlapCount)
})