import { WIDTH, MOVEMENT_DIRECTION, COLORS, VALUES, SQUARE_OFFSET } from './const'
import { newRandomShape } from './shape'
import { drawSquare } from './utils'

export default class Piece {
  constructor (context) {
    this.shape = newRandomShape()
    this.position = { x: Math.floor(WIDTH / 2), y: 0 }
    this.context = context
  }

  /* returns true if the piece is in the top of the board */
  isInTheTop () {
    return this.position.y <= 0
  }

  /* Move piece towards the given direction */
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
      if (value !== VALUES.EMPTY_BLOCK) {
        drawSquare(this.context, {
          x: this.position.x + x,
          y: this.position.y + y,
          color: COLORS[value],
          offset: SQUARE_OFFSET
        })
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
