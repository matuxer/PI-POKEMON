import React from "react";
import { useSelector } from "react-redux";
import styles from './OrdersAndFilters.module.css';

export default function OrdersAndFilters({
  handleReset,
  filterType,
  handleFilter,
  filterCreated,
  order,
  handleOrder
}) {
  const types = useSelector(state => state.types);

  return (
    <div className={styles.ordersAndFilters}>
      <form className={styles.ordersAndFiltersForm} onReset={handleReset}>
        <div className={styles.typesFilter}>
          <select name="types" id="types" value={filterType} onChange={handleFilter}>
            <option defaultValue="select">Select type...</option>
            {types.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
          </select>
        </div>
        <div className={styles.createdFilter}>
          <select name="created" id="created" value={filterCreated} onChange={handleFilter}>
            <option defaultValue="all">All</option>
            <option value="created">Created</option>
            <option value="pokedex">Pokedex</option>
          </select>
        </div>
        <div className={styles.orders}>
          <select name="order" id="order" value={order} onChange={handleOrder}>
            <option defaultValue="select">Select order...</option>
            <option value="aToZ">A to Z</option>
            <option value="zToA">Z to A</option>
            <option value="highAttack">High Attack</option>
            <option value="lowAttack">Low Attack</option>
          </select>
        </div>
        <div className={styles.buttonContainer}>
          <button type="reset" className={styles.resetButton}>RESET</button>
        </div>
      </form>
    </div>
  );
};