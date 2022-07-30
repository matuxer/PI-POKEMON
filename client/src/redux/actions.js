import axios from 'axios';

const GET_POKEMONS = 'GET_POKEMONS';
const GET_TYPES = 'GET_TYPES';

export function getPokemons(){
  return async function(dispatch){
    try {
      const pokemons = (await axios.get('http://localhost:3001/pokemons')).data;
      return dispatch({
        type: GET_POKEMONS,
        payload: pokemons,
      });
    } catch (e) {
      console.log(e);
    }
  }
};

export function getTypes() {
  return async function(dispatch) {
    try {
      const types = (await axios.get('http://localhost:3001/types')).data;
      return dispatch({
        type: GET_TYPES,
        payload: types,
      })
    } catch (e) {
      console.log(e);
    }
  }
};

export { GET_POKEMONS, GET_TYPES };