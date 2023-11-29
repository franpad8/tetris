import { PIXELS_PER_SQUARE, WIDTH } from './const'

export default class Piece {
  constructor (context) {
    this.shape = [
      [1, 1],
      [1, 1]
    ]
    this.position = { x: Math.floor(WIDTH / 2), y: 0 }
    this.context = context
  }

  draw () {
    this.shape.forEach((row, y) => row.forEach((value, x) => {
      console.log(value)
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
}
