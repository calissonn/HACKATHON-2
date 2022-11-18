import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header() {

  const history = useNavigate()
  return (
    <header className="header">
      <img className="header__logo" alt="logo" src="/assets/logo.png" onClick={() => history('/')} />
      <h4 className="header__text" onClick={() => history('/')} >Rick and Morty</h4>
      <div  className="header__link">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/drqueijo/hackaton-unialfa-2022">Repo</a>
        <a target="_blank" rel="noopener noreferrer" href="https://rickandmortyapi.com/documentation">Docs</a>
      </div>
    </header>
  )
}

export default Header