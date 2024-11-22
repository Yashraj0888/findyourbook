import React from 'react';

import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";
import { useGlobalContext } from '../../context.';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookList = () => {
  const { books, loading, resultTitle, nextPage, prevPage, currentPage, totalBooks } = useGlobalContext();

  // Process books with cover images
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: singleBook.id.replace("/works/", ""), // Removing /works/ to get only id
      cover_img: singleBook.cover_id
        ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
        : coverImg,
    };
  });

  if (loading) return <Loading />;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalBooks / 10); // Assuming 10 books per page

  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="booklist-content grid">
          {booksWithCovers.map((item, index) => {
            return <Book key={index} {...item} />;
          })}
        </div>
        
        {/* Pagination Controls */}
        <div className="pagination">
      <button
        className="btn prev-btn"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <FaChevronLeft size={20} />
      </button>
      <span className="current-page">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn next-btn"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight size={20} />
      </button>
    </div>
      </div>
    </section>
  );
};

export default BookList;
