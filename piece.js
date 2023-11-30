import { PIXELS_PER_SQUARE, WIDTH, MOVEMENT_DIRECTION } from './const'

export default class Piece {
  constructor (context) {
    this.shape = new ReversedL()
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
    const numberOfShapeTypes = Object.keys(SHAPE_TYPES).length
    const ShapeClass = SHAPE_TYPES[Math.floor(Math.random() * numberOfShapeTypes)]
    this.shape = new ShapeClass()
  }
}

class Shape {
  constructor () {
    this.grid = []
  }

  // Transponse Matrix
  rotate () {
    const rows = []
    for (let i = 0; i < this.grid[0].length; i++) {
      const row = []
      for (let j = 0; j < this.grid.length; j++) {
        row.push(this.grid[j][i])
      }
      rows.push(row)
    }

    this.grid = rows
  }
}

class Square extends Shape {
  constructor () {
    super()
    this.grid = [
      [1, 1],
      [1, 1]
    ]
  }
}

class L extends Shape {
  get grids () {
    return [
      [
        [1, 0],
        [1, 0],
        [1, 1]
      ],
      [
        [1, 1, 1],
        [1, 0, 0]
      ],
      [
        [1, 1],
        [0, 1],
        [0, 1]
      ],
      [
        [0, 0, 1],
        [1, 1, 1]
      ]
    ]
  }

  constructor () {
    super()
    this.currentIndex = 0
    this.grid = this.grids[this.currentIndex]
  }

  rotate () {
    this.currentIndex = (this.currentIndex + 1) % this.grids.length
    this.grid = this.grids[this.currentIndex]
  }
}

class ReversedL extends L {
  get grids () {
    return [
      [
        [1, 1],
        [1, 0],
        [1, 0]
      ],
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      [
        [0, 1],
        [0, 1],
        [1, 1]
      ],
      [
        [1, 1, 1],
        [0, 0, 1]
      ]
    ]
  }
}

class Stick extends Shape {
  constructor () {
    super()
    this.grid = [
      [1],
      [1],
      [1],
      [1]
    ]
  }
}

class Zeta extends Shape {
  constructor () {
    super()
    this.grid = [
      [0, 1, 1],
      [1, 1, 0]
    ]
  }
}

class ReversedZeta extends Shape {
  constructor () {
    super()
    this.grid = [
      [1, 1, 0],
      [0, 1, 1]
    ]
  }
}

const SHAPE_TYPES = {
  0: Square,
  1: L,
  2: Zeta,
  3: Stick,
  4: ReversedZeta,
  5: ReversedL
}
