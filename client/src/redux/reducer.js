import { GET_POKEMONS, GET_TYPES, GET_POKEMON_DETAILS, CLEAR_POKEMONS } from './actions';

const initialState = {
  pokemons: [],
  types: [],
  pokemon: {},
};

export default function rootReducer(state = initialState, action){
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GET_POKEMON_DETAILS:
      return{
        ...state,
        pokemon: action.payload,
      }
    case CLEAR_POKEMONS:
      return{
        ...state,
        pokemons: action.payload,
      }  
    default:
      return state;
  }
};