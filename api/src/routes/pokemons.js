const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const router = Router();
const { getAllPokemons, getById } = require('./controllers/apiControllers.js');


router.get('/', async (req, res, next) => {
  const { name } = req.query;
  try {
    let pokemons = await getAllPokemons();
    if (!name) {
      return res.status(200).send(pokemons);
    }else{
      const regex = new RegExp(`[A-Z]*${name}[A-Z]*`, 'i');
      let pokeName = await pokemons.filter(e => {
        if (regex.test(e.name)) {
          return e;
        }
      });
      if (pokeName.length === 0) {
        return res.status(404).send('No se ha encontrado el Pokemon deseado');
      }
      return res.status(200).send(pokeName);
    }
  } catch (e) {
    next(e);
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    let idDetails = await getById(id);
    res.send(idDetails);
  } catch (e) {
    next(e);
  }
})

router.post('/', async (req, res, next) => {
  const { name, health, attack, defense, speed, height, weight, types } = req.body;
  try {
    let pokemon = await Pokemon.create({
      name, health, attack, defense, speed, height, weight
    });
    const pokeTypes = await Type.findAll({
      where: { name: types }
    });
    pokemon.addType(pokeTypes);
    res.send(pokemon);
  } catch (e) {
    next(e)
  }
})

module.exports = router;