import React, { useEffect, useState } from 'react';
import { getPokemons } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Cards from './Cards';
import NavBar from './NavBar';

function HomePage() {
  const pokemons = useSelector(state => state.pokemons);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  async function dispatcher() {
    setLoading(true)
    await dispatch(getPokemons())
    setLoading(false)
  }

  useEffect(() => {
    dispatcher();
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <h1>HOME</h1>
      <Cards pokemons={pokemons} loading={loading} />
    </div>
  )
}

export default HomePage