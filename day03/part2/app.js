const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const lines = data.split('\n')
    function getOxy(nums, place) {
        const [ zeros, ones ] = nums.reduce((acc, cur) => {
            acc[cur[place]].push(cur)
            return acc
        }, [[], []])
        const most = zeros.length > ones.length ? zeros : ones
        if (most.length === 1) {
            return most
        } else {
            return getOxy(most, place + 1)
        }
    }

    function getCO2(nums, place) {
        const [ zeros, ones ] = nums.reduce((acc, cur) => {
            acc[cur[place]].push(cur)
            return acc
        }, [[], []])
        const least = ones.length < zeros.length ? ones : zeros
        if (least.length === 1) {
            return least
        } else {
            return getCO2(least, place + 1)
        }
    }
    const oxy = parseInt(getOxy(lines, 0), 2)
    const co2 = parseInt(getCO2(lines, 0), 2)
    console.log(oxy * co2)
})