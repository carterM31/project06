/**
 * For this app we need logic that will let us know who's turn it is.
 * while letting us know who wins, loses and if tie happens.
 * all while not reloading the page. 
 */

// our const reaching out to get the cell, board, winning message, restart game.
const cellElements = document.querySelectorAll('[data-cell]')
const gameBoard = document.getElementById('gameBoard')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

var player1 = "player 1"
var player2 = "player 2"

function editNames() {
  player1 = prompt("Change Player1 name!")
  player2 = prompt("Change Player2 name!")

  document.querySelector("p.Player1").innerHTML = Player1
  document.querySelector("p.Player2").innerHTML = Player2
}

// here we set up our x and O with winning combo.
const xTic = 'x'
const oTic = 'circle'
const winningTicTacToe = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// Call our startGame function.
startGame()
// Event click to restart.
restartButton.addEventListener('click', startGame)

// We want to start the game and make sure cells are empty.
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(xTic)
    cell.classList.remove(oTic)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  previewNextTic()
  winningMessageElement.classList.remove('show')
}

// pass draw into the endGame func to give the win or draw message.
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

// Event listener with handleClick using .target we also have if else if else statement.
function handleClick(event) {
  const cell = event.target
  const currentClass = circleTurn ? oTic : xTic
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    previewNextTic()
  }
}

// needed a func to go through each cell and check for xTic and oTic 
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(xTic) || cell.classList.contains(oTic)
  })
}

// we and to place the xTic or oTic when we choose our cell.
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//need to swap plyers when called 
function swapTurns() {
  circleTurn = !circleTurn
}

// I wanted to see a preview of the next players turn 
function previewNextTic() {
  gameBoard.classList.remove(xTic)
  gameBoard.classList.remove(oTic)
  if (circleTurn) {
    gameBoard.classList.add(oTic)
  } else {
    gameBoard.classList.add(xTic)
  }
}


// Finally need to check if we won the game and return 
function checkWin(currentClass) {
  return winningTicTacToe.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}