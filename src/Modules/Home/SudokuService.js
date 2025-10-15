
// 9x9 bosh tablo
function emptyBoard() {
  return Array(9).fill(0).map(() => Array(9).fill(0))
}

// Random array qarishdirmaq 
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5)
}

// Sudoku helli ucun 
function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num
            if (solve(board)) return true
            board[row][col] = 0
          }
        }
        return false
      }
    }
  }
  return true
}

// Qaydalara uygunluq yoxlama
function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false
  }

  const startRow = Math.floor(row / 3) * 3
  const startCol = Math.floor(col / 3) * 3

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === num) return false
    }
  }
  return true
}

// Tam dolu Sudoku board yaradıcı
function generateSolvedBoard() {
  const board = emptyBoard()

 
  board[0] = shuffle([1,2,3,4,5,6,7,8,9])

  solve(board)
  return board
}

// Puzzle duzeldici
export function makePuzzle(givens = 40) {
  const solved = generateSolvedBoard()
  const puzzle = solved.map(row => [...row])

  let cellsToRemove = 81 - givens
  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0
      cellsToRemove--
    }
  }

  return { puzzle, solution: solved }
}
