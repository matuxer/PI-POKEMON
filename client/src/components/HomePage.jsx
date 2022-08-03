import React, { useEffect, useState } from 'react';
import { getPokemons } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Cards from './Cards';
import NavBar from './NavBar';
import styles from './HomePage.module.css';
import Pagination from './Pagination';

const filterCards = (arr, str) => {
  if (str === 'created') {
    return arr.filter(el => /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(el.id));
  }else if (str === 'pokedex') {
    return arr.filter(el => !/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(el.id));
  }else {
    return arr.filter(el => el.types[0] === str || el.types[1] === str);
  }
}

const orderCards = (arr, str) => {
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

function HomePage() {
  const types = useSelector(state => state.types);
  const pokemonsArr = useSelector(state => state.pokemons);
  const dispatch = useDispatch();
  let pokemons = [...pokemonsArr];

  const [order, setOrder] = useState('select');
  const [filterType, setFilterType] = useState('select');
  const [filterCreated, setFilterCreated] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  if (filterType !== 'select') {
    pokemons = filterCards( pokemons, filterType );
  }
  if (filterCreated !== 'all') {
    pokemons = filterCards( pokemons, filterCreated );
  }
  if (order !== 'select') {
    pokemons = orderCards( pokemons, order );
  }
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  let handleSearch = (e) => {
    setSearch(e.target.value.trim())
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatcher(search);
    setCurrentPage(1)
  }
  
  let handleSearchReset = (e) => {
    e.preventDefault();
    setSearch("");
    dispatcher();
    setCurrentPage(1)
  }

  let handleFilter = (e) => {
    e.preventDefault();
    if (e.target.name === "types") {
      if(e.target.value === "Select type...") {
        setFilterType('select')
      }else {
        setFilterType(e.target.value);
      }
    }else if(e.target.name === "created") {
      if(e.target.value === "All") {
        setFilterCreated('all')
      }else {
        setFilterCreated(e.target.value);
      }
    }
  }

  let handleOrder = (e) => {
    e.preventDefault();
    if(e.target.value === "Select order...") {
      setOrder('select');
    }else {
      setOrder(e.target.value);
    }
  }

  let handleReset = (e) => {
    e.preventDefault();
    setFilterType('select');
    setFilterCreated('all');
    setOrder('select');
  }

  async function dispatcher(name) {
    setLoading(true)
    if (name) {
      await dispatch(getPokemons(name));
    }else {
      await dispatch(getPokemons());
    }
    setLoading(false)
  }

  useEffect(() => {
    dispatcher();
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1)
  }, [ filterType, filterCreated, order ]);


  return (
    <div className={styles.homePage}>
      <NavBar />
      <h1>HOME</h1>
      <div>
        <form onSubmit={handleSubmit} onReset={handleSearchReset}>
          <div>
            <input 
            value={ search }
            type="text" 
            onChange={handleSearch}
            />
          </div>
          <div>
            <button type='submit'>SEARCH</button>
          </div>
          <div>
            <button disabled={search === ""} type="reset">X</button>
          </div>
        </form>
      </div>
      <div className={styles.homeCards}>
      <form onReset={handleReset}>
      <div>
        <label htmlFor="types" >TYPES</label>
        <select name="types" id="types" value={ filterType } onChange={handleFilter}>
          <option defaultValue="select">Select type...</option>
          {types.map(el => ( <option key={el.id} value={el.name} >{el.name}</option> ))}
        </select>
      </div>
      <div>
        <select name="created" id="created" value={ filterCreated } onChange={handleFilter}>
          <option defaultValue="all">All</option>
          <option value="created">Created</option>
          <option value="pokedex">Pokedex</option>
        </select>
      </div>
      <div>
        <button type="reset">RESET</button>
      </div>
      </form>
      <form onReset={handleReset}>
      <div>
        <select name="order" id="order" value={ order } onChange={handleOrder} >
          <option defaultValue="select">Select order...</option>
          <option value="aToZ">A to Z</option>
          <option value="zToA">Z to A</option>
          <option value="highAttack">High Attack</option>
          <option value="lowAttack">Low Attack</option>
        </select>
      </div>
      <div>
        <button type="reset">RESET</button>
      </div>
      </form>
      <Cards pokemons={currentPokemons} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={pokemons.length} paginate={paginate} />
      </div>
    </div>
  )
}

export default HomePage