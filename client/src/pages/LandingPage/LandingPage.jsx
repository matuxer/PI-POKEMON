import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <section className={styles.masthead} role="img" aria-label="Image Description">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png" alt="pokemon Logo SVG" />
      <button  className={styles.landingButton} >
        <Link className={styles.landingLink} to='/home'>Let's Go!</Link>
      </button>
  </section>
  )
}
export default LandingPage