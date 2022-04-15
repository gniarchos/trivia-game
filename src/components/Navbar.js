import React from 'react'
import { Icon } from '@iconify/react'

function gotoGithub() {
    window.location.href='https://github.com/gniarchos/trivial-game'
}

function restartGame() {
    window.location.reload()
}

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='git-div'>
        <Icon onClick={gotoGithub} className='git-img' icon="ant-design:github-filled" width="29" />
      </div>
      
      <div className='nav-logo'>
        <h1 className='logo-h1'>Questions</h1>
        <p className='logo-subtitle'>Trivia Game</p>
      </div> 

      <div className='restart-div'>
        <Icon onClick={restartGame} className='restart-img' width="30" icon="ci:refresh" />
      </div>
    </div>
  )
}
