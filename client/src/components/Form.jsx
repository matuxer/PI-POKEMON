import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import NavBar from './NavBar'
import TypesCheck from './TypesCheck';
import axios from 'axios';

const validate = (input) => {
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

function Form() {
  const types = useSelector(state => state.types);
  const initialState = {
    name: '',
    health: 1,
    attack: 5,
    defense: 5,
    speed: 5,
    height: 1,
    weight: 1,
    image: '',
    types: [],
  }
  const [input, setInput] = useState(initialState);
  const [error, setError] = React.useState({ name: "" });
  const [checked, setChecked] = useState(false);
  const [clean, setClean] = useState(false);

  let handleOnChange = (e) => {
    setInput(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    let error = validate({...input, [e.target.name]: e.target.value});
    setError(error);
    return error;
  }

  let handleCheck = (e) => {
    let epList = [...input.types]
    if(e.target.checked){
      epList = [...input.types, e.target.value]
    }else {
      epList.splice(input.types.indexOf(e.target.value), 1);
    }
    setInput(prevState => ({
      ...prevState,
      types: epList
    }));
    let error = validate({...input, types: epList});
    setError(error);
    return error;
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.image) {
      await axios.post('http://localhost:3001/pokemons', {
        name: input.name.trim(),
        health: parseInt(input.health),
        attack: parseInt(input.attack),
        defense: parseInt(input.defense),
        speed: parseInt(input.speed),
        height: parseInt(input.height),
        weight: parseInt(input.weight),
        types: input.types,
      })
    }else{
      await axios.post('http://localhost:3001/pokemons`', {
        name: input.name.trim(),
        health: parseInt(input.health),
        attack: parseInt(input.attack),
        defense: parseInt(input.defense),
        speed: parseInt(input.speed),
        height: parseInt(input.height),
        weight: parseInt(input.weight),
        image: input.image,
        types: input.types,
      })
    }
    setInput(initialState);
    setChecked(false);
    setClean(!clean);
  }

  console.log(input)
  console.log(error);
  return (
    <div>
      <NavBar />
      <h1>FORM</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Pokemon Name:</label>
          <input 
          name='name'
          value={input.name}
          type="text"
          onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="health">Pokemon Health:</label>
          <input 
          name='health'
          value={input.health}
          type="range"
          min={1}
          max={255}
          onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="attack">Pokemon Attack:</label>
          <input 
          name='attack'
          value={input.attack}
          type="range"
          min={5}
          max={190}
          onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="defense">Pokemon Defense:</label>
          <input 
          name='defense'
          value={input.defense}
          type="range"
          min={5}
          max={230}
          onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="speed">Pokemon Speed:</label>
          <input 
          name='speed'
          value={input.speed}
          type="range"
          min={5}
          max={200}
          onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="height">Pokemon Height:</label>
          <input 
          name='height'
          value={input.height}
          type="range"
          min={1}
          max={200}
          onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="weight">Pokemon Weight:</label>
          <input 
          name='weight'
          value={input.weight}
          type="range"
          min={1}
          max={1000}
          onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="image">Pokemon Image:</label>
          <input 
          name='image'
          value={input.image}
          type="text"
          onChange={handleOnChange}
          />
        </div>
        <div>
          <ul>
            {types.map(type => (<TypesCheck key={type.id} name={type.name} handleCheck={handleCheck} checked={checked} cleanCheck={clean} />))}
          </ul>
        </div>
        <div>
          <input disabled={Object.keys(error).length>0} type='submit' value='ENVIAR'/>
        </div>
      </form>
    </div>
  )
}

export default Form