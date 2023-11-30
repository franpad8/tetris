import { HEIGHT, PIXELS_PER_SQUARE, WIDTH } from './const'
export default class Board {
  constructor (context) {
    this.grid = Array(HEIGHT).fill(0).map(x => Array(WIDTH).fill(0))
    this.context = context
  }

  getValueAt (x, y) {
    return this.grid[y]?.[x]
  }

  setValueAt (value, x, y) {
    this.grid[y][x] = value
  }

  draw () {
    this.grid.forEach((row, y) => {
      this.grid[y].forEach((value, x) => {
        if (value === 0) {
          this.context.fillStyle = 'black'
        } else if (value === 1) {
          this.context.fillStyle = 'yellow'
        }

        this.context.fillRect(x * PIXELS_PER_SQUARE, y * PIXELS_PER_SQUARE, PIXELS_PER_SQUARE, PIXELS_PER_SQUARE)
      })
    })
  }

  reset () {
    this.grid = Array(HEIGHT).fill(0).map(x => Array(WIDTH).fill(0))
  }

  removeCompletedRows () {
    const completedRowsIndexes = []
    this.grid.forEach((row, rowIndex) => {
      if (row.every((value) => value === 1)) {
        completedRowsIndexes.push(rowIndex)
      }
    })
    completedRowsIndexes.forEach(rowToDeleteIndex => {
      this.grid.splice(rowToDeleteIndex, 1)
      this.grid.unshift(Array(WIDTH).fill(0))
    })

    return completedRowsIndexes.length
  }
}
