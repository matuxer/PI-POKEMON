import React from 'react';
import styles from './Pagination.module.css';
import LeftArrowIcon from '../../Images/LeftArrowIcon.svg';
import RightArrowIcon from '../../Images/RightArrowIcon.svg';

function Pagination({ postsPerPage, totalPosts, paginate, loading, currentPage}) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  if (totalPosts <= postsPerPage || loading) {
    return (
      <></>
    )
  }

  return (
    <nav className={styles.paginationNav}>
      <button className={styles.LeftArrowIcon} onClick={ () => paginate(currentPage - 1) } href="#" disabled={currentPage === 1}>
        <img src={LeftArrowIcon} alt="LeftArrowIcon" />
      </button>
      <p className={styles.currentPage} >{currentPage}</p>
      <button className={styles.RightArrowIcon} onClick={ () => paginate(currentPage + 1) } href="#" disabled={currentPage === pageNumbers[pageNumbers.length - 1]}>
        <img src={RightArrowIcon} alt="RightArrowIcon" />
      </button>
    </nav>
  )
}

export default Pagination
