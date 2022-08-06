import React from "react";
import styles from './SearchBar.module.css';

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
          <input value={search} type="text" onChange={handleSearch} />
        </div>
        <div>
          <button type='submit'>SEARCH</button>
        </div>
        <div>
          <button disabled={search === ""} className={styles.resetSearchButton} type="reset">X</button>
        </div>
      </form>
    </div>
  );
};