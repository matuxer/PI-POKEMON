import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';

function PokemonDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const [loading, setLoading] = useState(false);

  const dispatcher = async (id) => {
    await dispatch(getPokemonDetails(id));
    setLoading(true);
  }

  useEffect(() => {
    dispatcher(id);
  }, [dispatch]);

  if(!loading) return ( 
  <div>
    <NavBar />
    <h1>DETAILS</h1>
    <h3>Loading...</h3>
  </div> )
  return (
    <div>
      <NavBar />
      <h1>DETAILS</h1>
      <div>
        <p>{pokemon.id}</p>
        <img src={pokemon.image} alt={pokemon.name} />
        <p>Name: {pokemon.name}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Health: {pokemon.health}</p>
        <p>Speed: {pokemon.speed}</p>
        <p>Attack: {pokemon.attack}</p>
        <p>Defense: {pokemon.defense}</p>
        <ul>
          {pokemon.types?.map(type => <li key={type} >{type}</li>) }
        </ul>
      </div>
    </div>
  )
}


export default PokemonDetails