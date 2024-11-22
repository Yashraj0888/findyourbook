import React, { useState, useContext, useEffect, useCallback } from 'react';

// Base URL for the Open Library API
const BASE_URL = "http://openlibrary.org/search.json";
const AppContext = React.createContext();

// App Provider component to manage global state
const AppProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    title: "", // Start with an empty title, so user can search for anything
    author: "",
    publishYear: "",
    subject: ""
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalBooks, setTotalBooks] = useState(0); // Total number of books
  const [error, setError] = useState(null); // Error state for API call
  const booksPerPage = 10; // Number of books per page
  const [cache, setCache] = useState({}); // Cache for API responses

  // Function to generate dynamic query string from search parameters
  const generateQueryString = (params) => {
    const query = new URLSearchParams();

    if (params.title) query.append("title", params.title);
    if (params.author) query.append("author", params.author);
    if (params.publishYear) query.append("first_publish_year", params.publishYear); // Use 'first_publish_year'
    if (params.subject) query.append("subject", params.subject);
    query.append("page", currentPage);
    query.append("limit", booksPerPage);
    query.append("fields", "key,author_name,cover_i,edition_count,first_publish_year,title");

    return query.toString();
  };

  // Fetch books with the current search params and cache results
  const fetchBooks = useCallback(async () => {
    const queryString = generateQueryString(searchParams);
    const currentTimestamp = new Date().getTime();
    const cacheExpiration = 60 * 60 * 1000; // Cache expiration time in milliseconds (1 hour)

    if (cache[queryString] && (currentTimestamp - cache[queryString].timestamp) < cacheExpiration) {
      setBooks(cache[queryString].books);
      setTotalBooks(cache[queryString].totalBooks);
      return;
    }

    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const response = await fetch(`${BASE_URL}?${queryString}`);
      const data = await response.json();
      const { docs, num_found } = data;

      if (docs) {
        const newBooks = docs.slice(0, booksPerPage).map((bookSingle) => {
          const { key, author_name, cover_i, edition_count, first_publish_year, title } = bookSingle;
          return {
            id: key,
            author: author_name,
            cover_id: cover_i,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title
          };
        });

        setBooks(newBooks);
        setTotalBooks(num_found);

        setCache((prevCache) => ({
          ...prevCache,
          [queryString]: {
            books: newBooks,
            totalBooks: num_found,
            timestamp: currentTimestamp
          }
        }));

        // Modify the title to reflect the user's search query
        const searchCriteria = Object.entries(searchParams)
          .filter(([key, value]) => value) // Filter out empty values
          .map(([key, value]) => `${value}`) // Format search query for the title
          .join(", ");

        setResultTitle(newBooks.length > 0 ? `Your Search Result for ${searchCriteria}` : "No Search Result Found!");
      } else {
        setBooks([]);
        setResultTitle("No Search Result Found!");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch books. Please try again later.");
    }
    setLoading(false);
  }, [searchParams, currentPage, cache]);

  // Re-fetch books when searchParams or currentPage change
  useEffect(() => {
    const hasSearchParams = Object.values(searchParams).some((value) => value.trim() !== "");
    if (hasSearchParams) {
      fetchBooks();
    }
  }, [searchParams, currentPage, fetchBooks]);

  // Handle "Next" button
  const nextPage = () => {
    if (currentPage * booksPerPage < totalBooks) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle "Previous" button
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        searchParams,
        setSearchParams,
        resultTitle,
        setResultTitle,
        currentPage,
        totalBooks,
        nextPage,
        prevPage,
        error,
        setError
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use global context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
