import { COLORS } from './const'

class Shape {
  constructor () {
    this.currentIndex = 0
    this.grid = this.grids[this.currentIndex]
    this.colorIndex = 1 + Math.floor(Math.random() * (Object.keys(COLORS).length - 1))
    this.grid = this.grid.map(row => row.map(value => value === 1 ? this.colorIndex : value))
  }

  rotate () {
    this.currentIndex = (this.currentIndex + 1) % this.grids.length
    this.grid = this.grids[this.currentIndex]
    this.grid = this.grid.map(row => row.map(value => value === 1 ? this.colorIndex : value))
  }
}

class Square extends Shape {
  get grids () {
    return [
      [
        [1, 1],
        [1, 1]
      ]
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
}

class ReversedL extends Shape {
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
  get grids () {
    return [
      [
        [1],
        [1],
        [1],
        [1]
      ],
      [
        [1, 1, 1, 1]
      ]
    ]
  }
}

class Zeta extends Shape {
  get grids () {
    return [
      [
        [0, 1, 1],
        [1, 1, 0]
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1]
      ]
    ]
  }
}

class ReversedZeta extends Shape {
  get grids () {
    return [
      [
        [1, 1, 0],
        [0, 1, 1]
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0]
      ]
    ]
  }
}

class T extends Shape {
  get grids () {
    return [
      [
        [1, 1, 1],
        [0, 1, 0]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 0]
      ],
      [
        [0, 1, 0],
        [1, 1, 1]
      ],
      [
        [0, 1],
        [1, 1],
        [0, 1]
      ]
    ]
  }
}

const SHAPE_TYPES = {
  0: Square,
  1: L,
  2: Zeta,
  3: Stick,
  4: ReversedZeta,
  5: ReversedL,
  6: T
}

export function newRandomShape () {
  const numberOfShapeTypes = Object.keys(SHAPE_TYPES).length
  const ShapeClass = SHAPE_TYPES[Math.floor(Math.random() * numberOfShapeTypes)]
  return new ShapeClass()
}
