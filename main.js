import './style.css'
import Game from './game'

document.querySelectorAll('.menu__item').forEach(menuItem => {
  menuItem.addEventListener('click', () => {
    document.querySelector('.menu').style.display = 'none'
    document.getElementById('canvas').style.display = 'block'
    game.start()
  })
})

const game = new Game()
game.init()
