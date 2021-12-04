const fs = require('fs')

class BingoNode {
    constructor(value) {
        this.value = value
        this.marked = false
        this.row = []
        this.col = []
    }

    setRow(row) {
        this.row = row
        row.push(this)
    }

    setCol(col) {
        this.col = col
        col.push(this)
    }

    setFirstDia(dia) {
        this.firstDia = dia
        dia.push(this)
    }

    setSecondDia(dia) {
        this.secondDia = dia
        dia.push(this)
    }

    checkWin() {
        if (this.row.every(node => node.marked)) return true
        if (this.col.every(node => node.marked)) return true
        if (this.firstDia && this.firstDia.every(node => node.marked)) return true
        if (this.secondDia && this.secondDia.every(node => node.marked)) return true
        return false
    }

    mark() {
        this.marked = true
        return this.checkWin()
    }
}

class BingoBoard {
    constructor(boardInput) {
        this.won = false
        this.valueMap = {}
        this.board = []
        for (let i = 0; i < boardInput.length; i++) {
            const row = []
            this.board.push(row)
            for (let j = 0; j < boardInput[i].length; j++) {
                const value = boardInput[i][j]
                const node = new BingoNode(value)
                this.valueMap[value] = this.valueMap[value] || []
                this.valueMap[value].push(node)                
                node.setRow(row)
            }
        }

        for (let i = 0; i < this.board[0].length; i++) {
            const col = []
            for (let j = 0; j < this.board.length; j++) {
                this.board[j][i].setCol(col)
            }
        }

        const firstDia = []
        for (let i = 0; i < this.board.length; i++) {
            this.board[i][i].setFirstDia(firstDia)
        }

        const secondDia = []
        for (let i = this.board.length - 1; i >= 0; i--) {
            this.board[i][i].setSecondDia(secondDia)
        }
    }

    markSquare(value) {
        if (this.valueMap[value]) {
            for (let i = 0; i < this.valueMap[value].length; i++) {
                if (this.valueMap[value][i].mark()) {
                    this.won = true
                    return this.getScore(value)
                }
            }
            return false
        }
    }

    getScore(lastMarked) {
        const sumOfUnmarked = this.board.reduce((acc, cur) => {
            const rowSum = cur.reduce((acc, cur) => {
                acc += cur.marked ? 0 : cur.value
                return acc
            }, 0)
            return acc + rowSum
        }, 0)
        return sumOfUnmarked * lastMarked
    }
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const blocks = data.split('\n\n')
    const calls = blocks[0].split(',').map(num => +num)
    const boardInputs = blocks.slice(1).map(boardInput =>{
        return boardInput.split('\n').map(row => {
            const trimmedRow = row.trim()
            return trimmedRow.split(/\s+/).map(num => +num)
        })
    })
    
    function playGame(calls, boardInputs) {
        const boards = boardInputs.map(input => new BingoBoard(input))
        let won = 0
        for (let i = 0; i < calls.length; i++) {
            for (let j = 0; j < boards.length; j++) {
                if (!boards[j].won) {
                    const markOutput = boards[j].markSquare(calls[i])
                    if (markOutput) {
                        if (++won === boards.length) {
                            return markOutput
                        }
                    }
                }
            }
        }
    }

    console.log(playGame(calls, boardInputs))
})