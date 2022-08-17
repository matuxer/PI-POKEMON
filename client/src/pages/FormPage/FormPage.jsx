import React, { useState } from "react";
import { useSelector } from "react-redux";
import TypesCheckBox from "../../components/TypesCheckBox/TypesCheckBox";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validate } from "../../controllers/clientControllers";
import styles from "./FormPage.module.css";

function Form() {
  const navigate = useNavigate();
  const types = useSelector((state) => state.types);
  const initialState = {
    name: "",
    health: 1,
    attack: 5,
    defense: 5,
    speed: 5,
    height: 1,
    weight: 1,
    image: "",
    types: [],
  };
  const [input, setInput] = useState(initialState);
  const [error, setError] = useState({ name: "" });
  const [checked, setChecked] = useState(false);
  const [clean, setClean] = useState(false);

  let typesSelectorStyle = styles.typesSelector;

  if (error.hasOwnProperty("types")) {
    typesSelectorStyle = styles.typesSelectorError_1;
  } else {
    typesSelectorStyle = styles.typesSelector;
  }

  let handleOnChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    let error = validate({ ...input, [e.target.name]: e.target.value });
    setError(error);
    return error;
  };

  let handleCheck = (e) => {
    let epList = [...input.types];
    if (e.target.checked) {
      epList = [...input.types, e.target.value];
    } else {
      epList.splice(input.types.indexOf(e.target.value), 1);
    }
    setInput((prevState) => ({
      ...prevState,
      types: epList,
    }));
    let error = validate({ ...input, types: epList });
    setError(error);
    return error;
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.image) {
      await axios.post("http://localhost:3001/pokemons", {
        name: input.name.trim(),
        health: parseInt(input.health),
        attack: parseInt(input.attack),
        defense: parseInt(input.defense),
        speed: parseInt(input.speed),
        height: parseInt(input.height),
        weight: parseInt(input.weight),
        types: input.types,
      });
    } else {
      await axios.post("http://localhost:3001/pokemons`", {
        name: input.name.trim(),
        health: parseInt(input.health),
        attack: parseInt(input.attack),
        defense: parseInt(input.defense),
        speed: parseInt(input.speed),
        height: parseInt(input.height),
        weight: parseInt(input.weight),
        image: input.image,
        types: input.types,
      });
    }
    setInput(initialState);
    setChecked(false);
    setClean(!clean);
    navigate("/home");
  };

  return (
    <div className={styles.formPage}>
      <NavBar />
      <div className={styles.formContainer}>
        <h4 className={styles.formTitle}>Create Your Pokemon</h4>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={
              error.name !== "Se requiere un nombre"
                ? styles.nameInput
                : styles.nameError
            }
            name="name"
            value={input.name}
            type="text"
            placeholder="Pokemon Name..."
            onChange={handleOnChange}
          />
          <div className={styles.rangeInputsContainer}>
            <div className={styles.healthInput}>
              <label htmlFor="health">Health:</label>
              <input
                className={styles.rangeInput}
                name="health"
                value={input.health}
                type="range"
                min={1}
                max={255}
                onChange={handleOnChange}
              />
              <span className={styles.inputValue}>{input.health}</span>
            </div>
            <div className={styles.attackInput}>
              <label htmlFor="attack">Attack:</label>
              <input
                className={styles.rangeInput}
                name="attack"
                value={input.attack}
                type="range"
                min={5}
                max={190}
                onChange={handleOnChange}
              />
              <span className={styles.inputValue}>{input.attack}</span>
            </div>
            <div className={styles.defenseInput}>
              <label htmlFor="defense">Defense:</label>
              <input
                className={styles.rangeInput}
                name="defense"
                value={input.defense}
                type="range"
                min={5}
                max={230}
                onChange={handleOnChange}
              />
              <span className={styles.inputValue}>{input.defense}</span>
            </div>
            <div className={styles.speedInput}>
              <label htmlFor="speed">Speed:</label>
              <input
                className={styles.rangeInput}
                name="speed"
                value={input.speed}
                type="range"
                min={5}
                max={200}
                onChange={handleOnChange}
              />
              <span className={styles.inputValue}>{input.speed}</span>
            </div>
            <div className={styles.heightInput}>
              <label htmlFor="height">Height:</label>
              <input
                className={styles.rangeInput}
                name="height"
                value={input.height}
                type="range"
                min={1}
                max={200}
                onChange={handleOnChange}
              />
              <span className={styles.inputValue}>{input.height}</span>
            </div>
            <div className={styles.weightInput}>
              <label htmlFor="weight">Weight:</label>
              <input
                className={styles.rangeInput}
                name="weight"
                value={input.weight}
                type="range"
                min={1}
                max={1000}
                onChange={handleOnChange}
              />
              <span className={styles.inputValue}>{input.weight}</span>
            </div>
          </div>
          <input
            className={styles.imageInput}
            name="image"
            value={input.image}
            placeholder="Image URL..."
            type="text"
            onChange={handleOnChange}
          />
          <div className={typesSelectorStyle}>Types:</div>
          <div className={styles.typesCheckBox}>
            {types.length > 0 ? (
              types.map((type) => (
                <TypesCheckBox
                  key={type.id}
                  name={type.name}
                  handleCheck={handleCheck}
                  checked={checked}
                  cleanCheck={clean}
                />
              ))
            ) : (
              <div className={styles.lds_dual_ring}></div>
            )}
          </div>
          <div className={styles.typesError}>{error.types}</div>
          <div className={styles.submitButton}>
            <button type="submit" disabled={Object.keys(error).length > 0}>
              CREAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
