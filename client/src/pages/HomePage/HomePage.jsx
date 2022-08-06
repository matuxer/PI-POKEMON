import OrdersAndFilters from './../../components/OrdersAndFilters/OrdersAndFilters';
import React, { useEffect, useState } from 'react';
import { getPokemons } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';
import NavBar from '../../components/NavBar/NavBar';
import styles from './HomePage.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { filterCards, orderCards } from '../../controllers/clientControllers';


function HomePage() {
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
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [ currentPage ]);

  return (
    <div className={styles.homePage}>
      <NavBar />
      <SearchBar handleSubmit={handleSubmit} handleSearchReset={handleSearchReset} search={search} handleSearch={handleSearch} />
      <OrdersAndFilters handleReset={handleReset} filterType={filterType} handleFilter={handleFilter} filterCreated={filterCreated} order={order} handleOrder={handleOrder}  />
      <div className={styles.homeCards}>
      <Cards pokemons={currentPokemons} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={pokemons.length} paginate={paginate} />
      </div>
    </div>
  )
}

export default HomePage