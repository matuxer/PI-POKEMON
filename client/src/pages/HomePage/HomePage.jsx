import React, { useEffect, useState } from 'react';
import { getPokemons } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../../components/Cards/Cards';
import NavBar from '../../components/NavBar/NavBar';
import styles from './HomePage.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { filterCards, orderCards } from '../../controllers/clientControllers';


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
    setCurrentPage(1);
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

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [ currentPage ]);

  return (
    <div className={styles.homePage}>
      <NavBar />
      <div className={styles.searchBar}>
        <form className={styles.searchForm} onSubmit={handleSubmit} onReset={handleSearchReset}>
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
            <button disabled={search === ""} className={styles.resetSearchButton} type="reset">X</button>
          </div>
        </form>
      </div>
      <div className={styles.ordersAndFilters}>
      <form className={styles.ordersAndFiltersForm} onReset={handleReset}>
      <div className={styles.typesFilter}>
        <select name="types" id="types" value={ filterType } onChange={handleFilter}>
          <option defaultValue="select">Select type...</option>
          {types.map(el => ( <option key={el.id} value={el.name} >{el.name}</option> ))}
        </select>
      </div>
      <div className={styles.createdFilter}>
        <select name="created" id="created" value={ filterCreated } onChange={handleFilter}>
          <option defaultValue="all">All</option>
          <option value="created">Created</option>
          <option value="pokedex">Pokedex</option>
        </select>
      </div>
      <div className={styles.orders}>
        <select name="order" id="order" value={ order } onChange={handleOrder} >
          <option defaultValue="select">Select order...</option>
          <option value="aToZ">A to Z</option>
          <option value="zToA">Z to A</option>
          <option value="highAttack">High Attack</option>
          <option value="lowAttack">Low Attack</option>
        </select>
      </div>
      <div className={styles.buttonContainer}>
        <button type="reset" className={styles.resetButton} >RESET</button>
      </div>
      </form>
      </div>
      <div className={styles.homeCards}>
      <Cards pokemons={currentPokemons} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={pokemons[0] === 'noPokemons' || loading === true ? 0 : pokemons.length} paginate={paginate} />
      </div>
    </div>
  )
}

export default HomePage