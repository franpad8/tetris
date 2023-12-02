import './style.css'
import Game from './game'

function show (element, displayType = 'block') {
  element.style.display = displayType
}

function hide (element) {
  element.style.display = 'none'
}
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas')
  const menu = document.querySelector('.menu')
  const endgame = document.querySelector('.endgame')
  const points = document.querySelector('.points')

  document.querySelectorAll('.menu__item').forEach(menuItem => {
    menuItem.addEventListener('click', () => {
      hide(menu)
      show(canvas)
      game.start()
    })
  })

  window.addEventListener('finish', () => {
    hide(canvas)
    show(endgame, 'flex')
    points.textContent = game.points
  })

  endgame.addEventListener('click', () => {
    hide(endgame)
    show(menu)
    game.reset()
  })
})

const game = new Game()
game.init()
