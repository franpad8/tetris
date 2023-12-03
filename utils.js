import { BACKGROUND_COLOR, PIXELS_PER_SQUARE } from './const'

export function drawSquare (context, { color, x, y, offset = 0, width = PIXELS_PER_SQUARE }) {
  context.fillStyle = BACKGROUND_COLOR
  context.fillRect(
    x * width,
    y * width,
    width,
    width
  )

  if (color !== BACKGROUND_COLOR) {
    context.fillStyle = color
    context.fillRect(
      x * width + offset,
      y * width + offset,
      width - offset,
      width - offset
    )
  }
}
