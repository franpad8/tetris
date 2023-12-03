export const APP_WIDTH = document.getElementById('app').clientWidth
export const APP_HEIGHT = document.getElementById('app').clientHeight
export const HEIGHT = 30
export const WIDTH = Math.floor(HEIGHT * APP_WIDTH / APP_HEIGHT)
export const PIXELS_PER_SQUARE = APP_HEIGHT / HEIGHT
export const SQUARE_OFFSET = PIXELS_PER_SQUARE / 6
export const POINTS_PER_ROW = 100
export const MILLISECONDS_PER_FRAME = 200
export const PIXELS_PER_PREVIEW_SQUARE = PIXELS_PER_SQUARE / 3
export const PREVIEW_SQUARE_OFFSET = PIXELS_PER_PREVIEW_SQUARE / 5

export const MOVEMENT_DIRECTION = {
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  ROTATE: 'Rotate'
}

export const BACKGROUND_COLOR = '#000'

export const COLORS = [
  '#000',
  '#f00',
  '#0f0',
  '#00f',
  '#ff0',
  '#f0f',
  '#0ff'
]

export const VALUES = {
  EMPTY_BLOCK: 0,
  INVALID_BLOCK: undefined
}
