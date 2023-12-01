import { WIDTH, HEIGHT, PIXELS_PER_SQUARE, POINTS_PER_ROW, MOVEMENT_DIRECTION, MILLISECONDS_PER_FRAME } from './const'
import Board from './board'
import Piece from './piece'

let lastTime = 0
let delta = 0
export default class Game {
  init () {
    this.#initCanvas()
    this.board = new Board(this.context)
    this.piece = new Piece(this.context)
    this.update = this.update.bind(this)
    this.points = 0
    this.#registerEventsListeners()
  }

  #initCanvas () {
    this.context = document.getElementById('canvas').getContext('2d')
    this.context.fillStyle = '#000'
    this.context.rect(0, 0, WIDTH * PIXELS_PER_SQUARE, HEIGHT * PIXELS_PER_SQUARE)
    this.context.fill()
  }

  #drawPoints () {
    this.context.font = '26px Arial'
    this.context.fillStyle = '#fff'
    this.context.fillText(`${this.points}`, 20, 50)
  }

  #registerEventsListeners () {
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case MOVEMENT_DIRECTION.LEFT:
          this.piece.move(MOVEMENT_DIRECTION.LEFT)
          if (!this.#checkCollision()) {
            this.piece.move(MOVEMENT_DIRECTION.RIGHT)
          }
          break
        case MOVEMENT_DIRECTION.RIGHT:
          this.piece.move(MOVEMENT_DIRECTION.RIGHT)
          if (!this.#checkCollision()) {
            this.piece.move(MOVEMENT_DIRECTION.LEFT)
          }
          break
        case MOVEMENT_DIRECTION.UP:
          this.piece.move(MOVEMENT_DIRECTION.ROTATE)
          if (!this.#checkCollision()) {
            this.piece.move(MOVEMENT_DIRECTION.ROTATE)
          }
          break
        case MOVEMENT_DIRECTION.DOWN:
          this.#project()
          break
      }
    })
  }

  #checkCollision () {
    return this.piece.shape.grid.every((row, y) => {
      return row.every((value, x) => {
        return value === 0 || (this.board.getValueAt(this.piece.position.x + x, this.piece.position.y + y) < 1 &&
                               this.board.getValueAt(this.piece.position.x + x, this.piece.position.y + y) !== undefined)
      })
    })
  }

  #solidify () {
    this.piece.shape.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board.setValueAt(value, this.piece.position.x + x, this.piece.position.y + y)
        }
      })
    })
  }

  #project () {
    while (this.#checkCollision()) {
      this.piece.fall()
    }
    this.#handleCollision()
  }

  #handleCollision () {
    this.piece.move(MOVEMENT_DIRECTION.UP)
    if (this.piece.position.y === 0) { // Game Over
      alert('Game Over!')
      this.reset()
    } else {
      this.#solidify()
      this.piece.reset()
      this.#checkCompletedRows()
    }
  }

  update (time) {
    delta = time - lastTime
    if (delta > MILLISECONDS_PER_FRAME) {
      this.board.draw()
      this.piece.draw()
      this.piece.fall()
      if (!this.#checkCollision()) {
        this.#handleCollision()
      }
      this.#drawPoints()
      lastTime = time
    }
    window.requestAnimationFrame(this.update)
  }

  #checkCompletedRows () {
    const numRowsRemoved = this.board.removeCompletedRows()
    this.points += numRowsRemoved * POINTS_PER_ROW
  }

  start () {
    this.update()
  }

  reset () {
    this.board.reset()
    this.piece.reset()
    this.points = 0
  }
}
