import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarLinks}>
        <Link className={styles.links} to='/home'>HOME</Link>
      </div>
      <div className={styles.navBarLinks}>
        <Link className={styles.links} to='/createpokemon'>FORM</Link>
      </div>
    </div>
  )
}

export default NavBar