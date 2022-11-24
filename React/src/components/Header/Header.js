import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header() {

  const history = useNavigate()
  return (
    <header className="header">
      <img className="header__logo" alt="logo" src="/assets/rick-morty.jpeg" onClick={() => history('/')} />
      <h4 className="header__text" onClick={() => history('/')} >Rick and Morty</h4>
      <div  className="header__link">
      </div>
    </header>
  )
}

export default Header