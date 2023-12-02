import {
  WIDTH,
  HEIGHT,
  PIXELS_PER_SQUARE,
  POINTS_PER_ROW,
  MOVEMENT_DIRECTION,
  MILLISECONDS_PER_FRAME,
  VALUES,
  BACKGROUND_COLOR
} from './const'
import Board from './board'
import Piece from './piece'

let lastTime = 0
let delta = 0
let isGameOver = false
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
    this.context.fillStyle = BACKGROUND_COLOR
    this.context.rect(0, 0, WIDTH * PIXELS_PER_SQUARE, HEIGHT * PIXELS_PER_SQUARE)
    this.context.fill()
  }

  #drawPoints () {
    this.context.font = '26px Courier New'
    this.context.fillStyle = '#fff'
    this.context.fillText(`${this.points}`, 20, 50)
  }

  #registerEventsListeners () {
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case MOVEMENT_DIRECTION.LEFT:
          if (this.#checkCollision(event.key)) {
            this.piece.move(MOVEMENT_DIRECTION.LEFT)
          }
          break
        case MOVEMENT_DIRECTION.RIGHT:
          if (this.#checkCollision(event.key)) {
            this.piece.move(MOVEMENT_DIRECTION.RIGHT)
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

  #checkCollision (direction) {
    return this.piece.shape.grid.every((row, y) => {
      return row.every((shapeValue, x) => {
        if (direction === MOVEMENT_DIRECTION.DOWN) {
          return shapeValue === VALUES.EMPTY_BLOCK ||
            (!this.board.isInvalidBlock(this.piece.position.x + x, this.piece.position.y + y + 1) &&
            this.board.isEmptyBlock(this.piece.position.x + x, this.piece.position.y + y + 1))
        } else if (direction === MOVEMENT_DIRECTION.RIGHT) {
          return shapeValue === VALUES.EMPTY_BLOCK ||
            (!this.board.isInvalidBlock(this.piece.position.x + x + 1, this.piece.position.y + y) &&
            this.board.isEmptyBlock(this.piece.position.x + x + 1, this.piece.position.y + y))
        } else if (direction === MOVEMENT_DIRECTION.LEFT) {
          return shapeValue === VALUES.EMPTY_BLOCK ||
            (!this.board.isInvalidBlock(this.piece.position.x + x - 1, this.piece.position.y + y) &&
            this.board.isEmptyBlock(this.piece.position.x + x - 1, this.piece.position.y + y))
        } else {
          return shapeValue === VALUES.EMPTY_BLOCK ||
            (!this.board.isInvalidBlock(this.piece.position.x + x, this.piece.position.y + y) &&
            this.board.isEmptyBlock(this.piece.position.x + x, this.piece.position.y + y))
        }
      })
    })
  }

  #solidify () {
    this.piece.shape.grid.forEach((row, y) => {
      row.forEach((shapeValue, x) => {
        if (shapeValue !== VALUES.EMPTY_BLOCK) {
          this.board.setValueAt(shapeValue, this.piece.position.x + x, this.piece.position.y + y)
        }
      })
    })
  }

  #project () {
    while (this.#checkCollision(MOVEMENT_DIRECTION.DOWN)) {
      this.piece.fall()
    }
    this.#handleCollision()
  }

  #handleCollision () {
    this.#solidify()
    this.piece.reset()
    this.#checkCompletedRows()
  }

  update (time) {
    delta = time - lastTime
    isGameOver = false
    if (delta > MILLISECONDS_PER_FRAME) {
      this.board.draw()
      this.piece.draw()
      this.#drawPoints()
      if (!this.#checkCollision(MOVEMENT_DIRECTION.DOWN)) {
        isGameOver = this.piece.isInTheTop()
        this.#handleCollision()
      } else {
        this.piece.fall()
      }
      lastTime = time
    }

    if (isGameOver) {
      window.dispatchEvent(new CustomEvent('finish'))
      return
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
    isGameOver = false
  }
}
