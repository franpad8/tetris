import { WIDTH, HEIGHT, PIXELS_PER_SQUARE } from './const'
import Board from './board'
import Piece from './piece'
export default class Game {
  init () {
    const canvas = document.getElementById('canvas')
    this.context = canvas.getContext('2d')
    this.context.fillStyle = '#000'
    this.context.rect(0, 0, WIDTH * PIXELS_PER_SQUARE, HEIGHT * PIXELS_PER_SQUARE)
    this.context.fill()
    this.board = new Board(this.context)
    this.piece = new Piece(this.context)
  }

  start () {
    this.board.draw()
    this.piece.draw()
  }
}
