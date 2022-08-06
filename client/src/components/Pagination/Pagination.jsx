import React from 'react';
import styles from './Pagination.module.css';

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  if (totalPosts === 0) {
    return (
      <div></div>
    )
  }

  return (
    <nav className={styles.paginationNav}>
      { pageNumbers.map(number => (
        <button onClick={ () => paginate(number) } href="#" key={number} className={styles.paginationLink} >
          {number}
        </button>
      )) }
    </nav>
  )
}

export default Pagination
