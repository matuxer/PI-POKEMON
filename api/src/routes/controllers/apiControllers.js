const axios = require('axios');
const { Pokemon, Type } = require('../../db.js');

const getApiPokemons = async () => {
  const pokemonsUrl = ((await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=6')).data.results).map(el => el.url);
  const urlInfo = await axios.all(pokemonsUrl.map( async (url) => {
    let result = (await axios.get(url)).data;
    return {
      id: result.id,
      name: result.name,
      health: result.stats[0].base_stat,
      attack: result.stats[1].base_stat,
      defense: result.stats[2].base_stat,
      speed: result.stats[5].base_stat,
      height: result.height,
      weight: result.weight,
      image: result.sprites.other.dream_world.front_default,
      types: (result.types).map(el => el.type.name)
    }
    }
  ));
  return urlInfo;
}

const getDbPokemons = async () => {
  const pokemonsDb = await Pokemon.findAll({
    include: [{
      model: Type,
      attributes: ["name"],
    }],
  });
  const result = await pokemonsDb.map(poke => {
    return {
      id: poke.id,
      name: poke.name,
      health: poke.health,
      attack: poke.attack,
      defense: poke.defense,
      speed: poke.speed,
      height: poke.height,
      weight: poke.weight,
      image: poke.image,
      types: poke.types.map(type => type.name),
    }
  })
  return result;
}

const getAllPokemons = async () => {
  const pokeApi = await getApiPokemons();
  const pokeDb = await getDbPokemons();
  const pokeAll = [...pokeDb, ...pokeApi];
  return pokeAll;
}

const getApiTypes = async () => {
  const apiTypes = ((await axios.get('https://pokeapi.co/api/v2/type')).data.results).map(type => type.name);
  await apiTypes.map(el => {
    Type.findOrCreate({
      where: {
        name: el,
      },
    });
  });
  const result = await Type.findAll();
  return result;
}

const getApiById = async (id) => {
  const idDetails = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
  return {
    id: idDetails.id,
    name: idDetails.name,
    health: idDetails.stats[0].base_stat,
    attack: idDetails.stats[1].base_stat,
    defense: idDetails.stats[2].base_stat,
    speed: idDetails.stats[5].base_stat,
    height: idDetails.height,
    weight: idDetails.weight,
    image: idDetails.sprites.other.dream_world.front_default,
    types: (idDetails.types).map(el => el.type.name)
  }
}

const getDbById = async (id) => {
  const idDetails = await Pokemon.findByPk(id, {
    include: [{
      model: Type,
      attributes: ["name"],
    }],
  })
  return {
    id: idDetails.id,
    name: idDetails.name,
    health: idDetails.health,
    attack: idDetails.attack,
    defense: idDetails.defense,
    speed: idDetails.speed,
    height: idDetails.height,
    weight: idDetails.weight,
    image: idDetails.image,
    types: idDetails.types.map(type => type.name),
  };
}

const getById = async (id) => {
  let result;
  if (/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id)) {
    result = await getDbById(id);
    return result;
  }else {
    result = await getApiById(id);
    return result;
  }
}

module.exports = {
  getAllPokemons,
  getApiTypes,
  getById
}