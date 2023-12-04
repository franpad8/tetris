import './style.css'
import Game from './game'

function show (element, displayType = 'block') {
  element.style.display = displayType
}

function hide (element) {
  element.style.display = 'none'
}

function getBestScore () {
  return window.localStorage.getItem('bestscore') || 0
}

function saveScore (score) {
  const currentBestScore = getBestScore()
  if (!currentBestScore || currentBestScore < score) {
    window.localStorage.setItem('bestscore', score)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas')
  const menu = document.querySelector('.menu')
  const bestscoreSection = document.querySelector('.bestscore-section')
  const endgame = document.querySelector('.endgame')
  const points = document.querySelector('.points')
  const bestScoreText = document.querySelector('.bestscore__value')

  document.querySelectorAll('.menu__item').forEach(menuItem => {
    if (menuItem.classList.contains('startgame')) {
      menuItem.addEventListener('click', () => {
        hide(menu)
        show(canvas)
        game.start()
      })
    } else if (menuItem.classList.contains('bestscore')) {
      menuItem.addEventListener('click', () => {
        hide(menu)
        show(bestscoreSection, 'flex')
        bestScoreText.textContent = getBestScore()
      })
    }
  })

  window.addEventListener('finish', () => {
    hide(canvas)
    show(endgame, 'flex')
    points.textContent = game.points
  })

  endgame.addEventListener('click', () => {
    hide(endgame)
    saveScore(game.points)
    game.reset()
    show(menu)
  })

  bestscoreSection.addEventListener('click', () => {
    hide(bestscoreSection)
    show(menu)
  })
})

const game = new Game()
game.init()
