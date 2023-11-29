import { WIDTH, HEIGHT, PIXELS_PER_SQUARE, MOVEMENT_DIRECTION } from './const'
import Board from './board'
import Piece from './piece'

let lastTime = 0
let delta = 0
export default class Game {
  init () {
    const canvas = document.getElementById('canvas')
    this.context = canvas.getContext('2d')
    this.context.fillStyle = '#000'
    this.context.rect(0, 0, WIDTH * PIXELS_PER_SQUARE, HEIGHT * PIXELS_PER_SQUARE)
    this.context.fill()
    this.board = new Board(this.context)
    this.piece = new Piece(this.context)
    this.update = this.update.bind(this)
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case MOVEMENT_DIRECTION.LEFT:
          this.piece.move(MOVEMENT_DIRECTION.LEFT)
          if (!this.checkCollision()) {
            this.piece.move(MOVEMENT_DIRECTION.RIGHT)
          }
          break
        case MOVEMENT_DIRECTION.RIGHT:
          this.piece.move(MOVEMENT_DIRECTION.RIGHT)
          if (!this.checkCollision()) {
            this.piece.move(MOVEMENT_DIRECTION.LEFT)
          }
          break
      }
    })
  }

  checkCollision () {
    return this.piece.shape.every((row, y) => {
      return row.every((value, x) => {
        console.log(this.board.getValueAt(this.piece.position.x + x, this.piece.position.y + y))
        return value !== 1 || (this.board.getValueAt(this.piece.position.x + x, this.piece.position.y + y) !== 1 &&
                               this.board.getValueAt(this.piece.position.x + x, this.piece.position.y + y) !== undefined)
      })
    })
  }

  update (time) {
    delta = time - lastTime
    if (delta > 1000) {
      this.board.draw()
      this.piece.draw()
      this.piece.fall()
      lastTime = time
    }
    window.requestAnimationFrame(this.update)
  }

  start () {
    this.update()
  }
}
