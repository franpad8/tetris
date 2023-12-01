import { BACKGROUND_COLOR, PIXELS_PER_SQUARE } from './const'

export function drawSquare (context, { color, x, y, offset = 0 }) {
  context.fillStyle = BACKGROUND_COLOR
  context.fillRect(
    x * PIXELS_PER_SQUARE,
    y * PIXELS_PER_SQUARE,
    PIXELS_PER_SQUARE,
    PIXELS_PER_SQUARE
  )

  if (color !== BACKGROUND_COLOR) {
    context.fillStyle = color
    context.fillRect(
      x * PIXELS_PER_SQUARE + offset,
      y * PIXELS_PER_SQUARE + offset,
      PIXELS_PER_SQUARE - offset,
      PIXELS_PER_SQUARE - offset
    )
  }
}
