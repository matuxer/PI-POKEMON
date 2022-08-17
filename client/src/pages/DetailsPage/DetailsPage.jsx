import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetails } from "../../redux/actions";
import Pokeball from "../../components/Pokeball/Pokeball";
import styles from "./DetailsPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { getColor } from '../../controllers/clientControllers';
import HorizontalLineIcon from '../../Images/HorizontalLineIcon.svg';
import VerticalLineIcon from '../../Images/VerticalLineIcon.svg';

function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dispatcher = async (id) => {
      await dispatch(getPokemonDetails(id));
      setLoading(true);
    };
    dispatcher(id);
  }, [dispatch, id]);

  if (!loading)
    return (
      <>
        <NavBar />
        <div className={styles.loadingDetails}>
          <Pokeball />
        </div>
      </>
    );
  return (
    <div className={styles.detailsPage}>
      <NavBar />
      <div className={styles.detailsContainer}>
        <div className={styles.pokeDetails}>
          <div className={styles.pokeId}>Id: {pokemon.id}</div>
          <img
            className={styles.pokeImage}
            src={pokemon.image}
            alt={pokemon.name}
          />
          <div className={styles.pokeName}>{pokemon.name.toUpperCase()}</div>
          <img className={styles.HorizontalLineIcon} src={HorizontalLineIcon} alt="HorizontalLineIcon" />
          <div className={styles.statsContainer}>
            <div className={styles.firstThreeStats}>
              <div className={styles.pokeStats}>
                <div className={styles.statName}>HEIGHT</div>
                <div className={styles.statValue}>{pokemon.height}</div>
              </div>
              <div className={styles.pokeStats}>
                <div className={styles.statName}>WEIGHT</div>
                <div className={styles.statValue}>{pokemon.weight}</div>
              </div>
              <div className={styles.pokeStats}>
                <div className={styles.statName}>HEALTH</div>
                <div className={styles.statValue}>{pokemon.health}</div>
              </div>
            </div>
            <img className={styles.VerticalLineIcon} src={VerticalLineIcon} alt="VerticalLineIcon" />
            <div className={styles.lastThreeStats}>
              <div className={styles.pokeStats}>
                <div className={styles.statName}>SPEED</div>
                <div className={styles.statValue}>{pokemon.speed}</div>
              </div>
              <div className={styles.pokeStats}>
                <div className={styles.statName}>ATTACK</div>
                <div className={styles.statValue}>{pokemon.attack}</div>
              </div>
              <div className={styles.pokeStats}>
                <div className={styles.statName}>DEFENSE</div>
                <div className={styles.statValue}>{pokemon.defense}</div>
              </div>
            </div>
          </div>
          <div className={styles.typesContainer}>
            {pokemon.types?.map((type) => (
              <div style={{background: getColor(type)}} className={styles.type} key={type}>{type.toUpperCase()}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
