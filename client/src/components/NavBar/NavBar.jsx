import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import HomePageIcon from '../../Images/HomePageIcon.svg';
import FormPageIcon from '../../Images/FormPageIcon.svg';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <Link className={styles.homeIcon} to='/home' >
        <img src={HomePageIcon} alt="HomePageIcon" />
      </Link>
      <Link className={styles.formIcon} to='/createpokemon' >
        <img src={FormPageIcon} alt="HomePageIcon" />
      </Link>
    </div>
  )
}

export default NavBar