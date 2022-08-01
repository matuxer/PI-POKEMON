import React, { useState, useEffect } from 'react'

function TypesCheck({ name, handleCheck, checked, cleanCheck }) {
  const initialState = checked
  const [check, setCheck] = useState(initialState);

  let handleOneCheck = (e) => {
    setCheck(!check);
    handleCheck(e);
  } 
  useEffect(() => {
    setCheck(false)
  }, [cleanCheck]);

  return (
    <li>
      <label htmlFor="types">{name}</label>
      <input checked={check} type="checkbox" name='types' value={name} onChange={handleOneCheck} />
    </li>
  )
}

export default TypesCheck