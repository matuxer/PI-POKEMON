import React, { useState, useEffect } from "react";
import { getColor } from "../../controllers/clientControllers";
import styles from "./TypesCheckBox.module.css";

function TypesCheckBox({ name, handleCheck, checked, cleanCheck }) {
  const initialState = checked;
  const [check, setCheck] = useState(initialState);
  let labelChecked = styles.notCheckedLabel;
  const [label, setLabel] = useState(false);

  if (label) labelChecked = styles.checkedLabel;

  let handleOneCheck = (e) => {
    setCheck(!check);
    setLabel((prev) => !prev);
    handleCheck(e);
  };
  useEffect(() => {
    setCheck(false);
  }, [cleanCheck]);

  return (
    <div className={styles.checkBoxContainer}>
    <label
      style={{ backgroundColor: getColor(name) }}
      className={`${styles.checkBoxLabel} ${labelChecked}`}
    >
      <input
        className={styles.checkBoxInput}
        checked={check}
        type="checkbox"
        name="types"
        value={name}
        onChange={handleOneCheck}
      />
      {name.toUpperCase()}
    </label>
    </div>
  );
}

export default TypesCheckBox;
