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

export function newRandomShape () {
  const numberOfShapeTypes = Object.keys(SHAPE_TYPES).length
  const ShapeClass = SHAPE_TYPES[Math.floor(Math.random() * numberOfShapeTypes)]
  return new ShapeClass()
}
