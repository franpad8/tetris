const WIDTH = 15
const HEIGHT = 30
const PIXELS_PER_SQUARE = 30

export default class Game {
  init () {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    context.fillStyle = '#000'
    context.rect(0, 0, WIDTH * PIXELS_PER_SQUARE, HEIGHT * PIXELS_PER_SQUARE)
    context.fill()
  }

  start () {

  }
}
