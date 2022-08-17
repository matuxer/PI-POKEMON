const colours = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  unknown: '#699D8E',
  shadow: '#000000',
};


export const filterCards = (arr, str) => {
  if (str === 'created') {
    return arr.filter(el => /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(el.id));
  }else if (str === 'pokedex') {
    return arr.filter(el => !/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(el.id));
  }else {
    return arr.filter(el => el.types[0] === str || el.types[1] === str);
  }
}

export const orderCards = (arr, str) => {
  if (str === 'aToZ') {
    return arr.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  } else if (str === 'zToA') {
    return arr.sort(function (a, b) {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
  } else if (str === 'highAttack') {
    return arr.sort(function (a, b) {
      if (a.attack < b.attack) {
        return 1;
      }
      if (a.attack > b.attack) {
        return -1;
      }
      return 0;
    });
  } else if (str === 'lowAttack') {
    return arr.sort(function (a, b) {
      if (a.attack > b.attack) {
        return 1;
      }
      if (a.attack < b.attack) {
        return -1;
      }
      return 0;
    });
  }
}

export const validate = (input) => {
  let error = {};
  let noNumbers = /[0-9]/;
  if (input.name.length === 0) {
    error.name = "Se requiere un nombre"
  }else if(noNumbers.test(input.name)){
    error.name = "No se permiten numeros en el nombre"
  };
  if (input.types.length === 0) {
    error.types = "The Pokemon needs at least 1 TYPE"
  }else if (input.types.length > 2) {
    error.types = "The Pokemon can't have more than 2 TYPES"
  }
  return error;
}

export const getColor = (type) => {
  for(const key in colours){
    if(type === key) return colours[key];
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}