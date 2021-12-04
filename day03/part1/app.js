const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const lines = data.split('\n')
    const count = lines.reduce((acc, cur) => {
        for (let i = 0; i < cur.length; i++) {
            acc[i] = acc[i] || {}
            acc[i][cur[i]] = (acc[i][cur[i]] || 0) + 1
        }
        return acc
    }, [])
    const { gamma, epsilon } = count.reduce((acc, cur) => {
        if (cur[0] > cur[1]) {
            acc.gamma += '0'
            acc.epsilon += '1'
        } else {
            acc.gamma += '1'
            acc.epsilon += '0'
        }
        return acc
    }, {
        gamma: '',
        epsilon: ''
    })
    const gammaDecimal = parseInt(gamma, 2)
    const epsilonDecimal = parseInt(epsilon, 2)
    console.log(gammaDecimal * epsilonDecimal)
})