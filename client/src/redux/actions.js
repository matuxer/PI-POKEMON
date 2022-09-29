import axios from 'axios';

const GET_POKEMONS = 'GET_POKEMONS';
const GET_TYPES = 'GET_TYPES';
const GET_POKEMON_DETAILS = 'GET_POKEMON_DETAILS';
const CLEAR_POKEMONS = 'CLEAR_POKEMONS';

export function getPokemons(name){
  return async function(dispatch){
    let pokemons;
    try {
      if (name) {
        pokemons = (await axios.get(`https://pokemon-pi-w7jn.onrender.com/pokemons?name=${name}`)).data;
      }else {
        pokemons = (await axios.get('https://pokemon-pi-w7jn.onrender.com/pokemons')).data;
      }
      return dispatch({
        type: GET_POKEMONS,
        payload: pokemons,
      });
    } catch (e) {
      return dispatch({
        type: CLEAR_POKEMONS,
        payload: ['noPokemons'],
      })
    }
  }
};

export function getTypes() {
  return async function(dispatch) {
    try {
      const types = (await axios.get('https://pokemon-pi-w7jn.onrender.com/types')).data;
      return dispatch({
        type: GET_TYPES,
        payload: types,
      })
    } catch (e) {
      console.log(e);
    }
  }
};

export function getPokemonDetails(id) {
  return async function(dispatch) {
    try {
      const details = (await axios.get(`https://pokemon-pi-w7jn.onrender.com/pokemons/${id}`)).data;
      return dispatch({
        type: GET_POKEMON_DETAILS,
        payload: details,
      })
    } catch (e) {
      console.log(e);
    }
  }
}

export { GET_POKEMONS, GET_TYPES, GET_POKEMON_DETAILS, CLEAR_POKEMONS };
