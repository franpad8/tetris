import { PIXELS_PER_SQUARE } from './const'

export function drawSquare (context, { color, x, y }) {
  context.fillStyle = color
  context.fillRect(
    x * PIXELS_PER_SQUARE,
    y * PIXELS_PER_SQUARE,
    PIXELS_PER_SQUARE,
    PIXELS_PER_SQUARE
  )
}
