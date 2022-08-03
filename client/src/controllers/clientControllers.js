

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
    error.types = "Se requiere minimo 1 tipo"
  }else if (input.types.length > 2) {
    error.types = "Solo se pueden 2 tipos"
  }
  return error;
}