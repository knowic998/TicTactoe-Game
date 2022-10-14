const state = {
    gameElement:  document.querySelector(' .game'),
    cells: Array(9).fill(null),
    symbols: ['o', 'x'],
    winningCombinations: [
        [0, 1, 2,], //top
        [3, 4, 5], // middle
        [7, 8, 9], // bottom
        [0, 3, 6,], // left
        [1, 4, 7,], // middle
        [2, 5, 8,], //right
        [0, 4, 8,], //left diag winning
        [2, 4, 6,] // right diag

    ],
    gameFinished: false
}

function drawBoard() {
    state.gameElement.innerHTML = ''

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')

        if (state.cells[i]) { // does the cell have an x or an o? if so this code runs//
            const cellSymbol = document.createElement('p')
            cellSymbol.innerText = state.cells[i]
            cellSymbol.classList.add('symbol')

            cell.append(cellSymbol)
        } else {
            cell.addEventListener('click', function () {
                if (state.gameFinished) {
                    return
                }

                state.symbols.reverse()
                state.cells[i] = state.symbols[0]

                drawBoard()

                if (checkForWinner()) {
                    state.gameFinished = true
                    DrawMessage('Congratulations! You Won!')
                }

                if (checkForDraw()) {
                    state.gameFinished = true
                    DrawMessage("It's a Draw")
                }

            })

        }

        state.gameElement.append(cell)

    }
}

function DrawMessage(message) {
    const banner = document.createElement('div')
    banner.classList.add('banner')

    const h1 = document.createElement('h1')
    h1.innerText = message

    banner.append(h1)

    state.gameElement.append(banner)


}

function checkForDraw() {
    return state.cells.every(function (cell){
        return cell !== null
    })
}

function checkForWinner () {
    return state.winningCombinations.some(function (combo) {
        const cells = combo.map(function (index) {
            return state.cells[index]
        })

        return !(cells.includes(null)) && new Set(cells).size ===  1
    })
}

drawBoard()