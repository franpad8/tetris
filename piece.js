import { PIXELS_PER_SQUARE, WIDTH, MOVEMENT_DIRECTION } from './const'
import { newRandomShape } from './shape'

export default class Piece {
  constructor (context) {
    this.shape = newRandomShape()
    this.position = { x: Math.floor(WIDTH / 2), y: 0 }
    this.context = context
  }

  move (direction) {
    switch (direction) {
      case MOVEMENT_DIRECTION.ROTATE:
        this.shape.rotate()
        break
      case MOVEMENT_DIRECTION.RIGHT:
        this.position.x++
        break
      case MOVEMENT_DIRECTION.LEFT:
        this.position.x--
        break
      case MOVEMENT_DIRECTION.UP:
        this.position.y--
        break
    }
  }

  draw () {
    this.shape.grid.forEach((row, y) => row.forEach((value, x) => {
      if (value === 1) {
        this.context.fillStyle = 'orangered'
        this.context.fillRect(
          (this.position.x + x) * PIXELS_PER_SQUARE,
          (this.position.y + y) * PIXELS_PER_SQUARE,
          PIXELS_PER_SQUARE,
          PIXELS_PER_SQUARE)
      }
    }))
  }

  fall () {
    this.position.y++
  }

  /* Assigns new shape and resets position to top */
  reset () {
    this.position = { x: Math.floor(WIDTH / 2), y: 0 }
    this.shape = newRandomShape()
  }
}
