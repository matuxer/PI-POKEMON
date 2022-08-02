import React from 'react';
import styles from './Pagination.module.css';

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.paginationNav}>
      { pageNumbers.map(number => (
        <a onClick={ () => paginate(number) } href="#" key={number} className={styles.paginationLink} >
          {number}
        </a>
      )) }
    </nav>
  )
}

export default Pagination
