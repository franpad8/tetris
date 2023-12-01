import { COLORS, HEIGHT, SQUARE_OFFSET, VALUES, WIDTH } from './const'
import { drawSquare } from './utils'
export default class Board {
  constructor (context) {
    this.grid = Array(HEIGHT).fill(0).map(x => Array(WIDTH).fill(VALUES.EMPTY_BLOCK))
    this.context = context
  }

  #getValueAt (x, y) {
    return this.grid[y]?.[x]
  }

  setValueAt (value, x, y) {
    if (this.grid[y]) {
      this.grid[y][x] = value
    }
  }

  isEmptyBlock (x, y) {
    return this.#getValueAt(x, y) === VALUES.EMPTY_BLOCK
  }

  isInvalidBlock (x, y) {
    return this.#getValueAt(x, y) === VALUES.INVALID_BLOCK
  }

  isFilledBlock (x, y) {
    return !this.isEmptyBlock(x, y) && !this.isInvalidBlock(x, y)
  }

  #isCompletedRow (y) {
    return this.grid[y].every((_, x) => this.isFilledBlock(x, y))
  }

  draw () {
    this.grid.forEach((row, y) => {
      // if row is completed then paint it white before it gets deleted
      if (this.#isCompletedRow(y)) {
        row.forEach((_, x) => {
          drawSquare(this.context, { color: '#fff', x, y })
        })
      } else {
        row.forEach((value, x) => {
          const offset = this.isFilledBlock(x, y) ? SQUARE_OFFSET : 0
          drawSquare(this.context, { color: COLORS[value], x, y, offset })
        })
      }
    })
  }

  reset () {
    this.grid = Array(HEIGHT).fill(0).map(x => Array(WIDTH).fill(VALUES.EMPTY_BLOCK))
  }

  removeCompletedRows () {
    const completedRowsIndexes = []
    this.grid.forEach((_, rowIndex) => {
      if (this.#isCompletedRow(rowIndex)) {
        completedRowsIndexes.push(rowIndex)
      }
    })

    setTimeout(() => {
      completedRowsIndexes.forEach(rowToDeleteIndex => {
        this.grid.splice(rowToDeleteIndex, 1)
        this.grid.unshift(Array(WIDTH).fill(VALUES.EMPTY_BLOCK))
      })
    }, 500)

    return completedRowsIndexes.length
  }
}
