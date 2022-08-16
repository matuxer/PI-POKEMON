import React from "react";
import styles from './SearchBar.module.css';
import SearchIcon from '../../Images/SearchIcon.svg';
import ResetIcon from '../../Images/ResetIcon.svg';

export default function SearchBar({
  handleSubmit,
  handleSearchReset,
  search,
  handleSearch
}) {

  return (
    <div className={styles.searchBar}>
      <form className={styles.searchForm} onSubmit={handleSubmit} onReset={handleSearchReset}>
        <div>
          <input value={search} className={styles.searchBarInput} placeholder='Search Pokemon...' type="text" onChange={handleSearch} />
        </div>
        <div>
          <button disabled={(search === '')} className={styles.submitSearchButton} type='submit'>
            <img src={SearchIcon} alt="SearchIcon" />
          </button>
        </div>
        <div>
          <button disabled={search === ""} className={styles.resetSearchButton} type="reset">
            <img src={ResetIcon} alt="ResetIcon" />
          </button>
        </div>
      </form>
    </div>
  );
};