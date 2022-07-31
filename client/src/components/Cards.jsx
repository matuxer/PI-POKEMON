import React from 'react'

function Cards({ pokemons, loading }) {
  
  if (loading) return ( <h3>Loading...</h3> )
  return (
    <div>
      <ul>
        {pokemons.map(el => (
          <li key={el.id}>
            <h4>{el.name}</h4>
            <img src={el.image} alt={`${el.name}`} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cards