import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
    <Link to='/home'>HOME</Link>
    <br />
    <Link to='/createpokemon'>FORM</Link>
    </div>
  )
}

export default NavBar