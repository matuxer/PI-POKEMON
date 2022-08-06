import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Cards.module.css';

function Cards({ pokemons, loading }) {
  if (loading) {
    return ( 
    <div className={styles.loadingContainer}>
      <div className={`${styles.pokeball} ${styles.pokeball_animated}`}></div>
    </div>)
  }else if (pokemons[0] === 'noPokemons' || pokemons.length === 0) {
    return (
      <div className={styles.pokemonsNotFound}>
        <img className={styles.notFoundImage} src="https://svgsilh.com/svg/1574006.svg" alt="pokemons not found" />
        <p>We couldn`t find the Pokemon you're looking for</p>
      </div>
    )
  }
  return (
    <div className={styles.cardsPage}>
        {pokemons.map(el => (
          <div  key={el.id} className={styles.card}>
            <Link className={styles.cardLink} to={`/pokemon/${el.id}`}>
            <div style={{ backgroundImage: `url(${el.image})` } } className={styles.cardImg}></div>
            <div className={styles.cardInfo}>
              <div className={styles.cardText}>
                <p className={styles.textName}>{el.name}</p>
                <p className={styles.textTypes}>{(el.types.length > 1) ? `${el.types[0]}, ${el.types[1]}` : `${el.types[0]}`}</p>
              </div>
              <div className={styles.cardIcon}>
                <svg className={styles.cardSvg} viewBox="0 0 28 25">
                  <path d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"></path>
                </svg>
              </div>
            </div>
            </Link>
          </div>
        ))}
    </div>
  )
}



export default Cards