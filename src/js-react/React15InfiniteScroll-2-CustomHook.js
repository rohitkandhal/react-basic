import { useState, useEffect } from "react";
import axios, { Axios } from 'axios';

const getURL = "http://openlibrary.org/search.json";


// Custom hook to fetch books and store in states, eventually return states
export default function useBookSearchCustomHook(queryText, pageNum) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch new data everytime queryText or pageNum changes
  useEffect(() => {
    let cancelMethod;
    // Set flags
    setIsLoading(true);
    setError(false);

    // Fetch data using axios

    axios.get(getURL, {
      params: { q: queryText, page: pageNum },
      cancelToken: new Axios.cancelToken((c) => cancelMethod = c)
    }).then(res => {
      // Success
      console.log(res.data);
      setBooks(prevBooks => {
        // Make sure not to add duplicate books
        const newBooksTitleArray = res.data.docs.map(book => book.title);
        const newBooksSuperSet = [...prevBooks, ...newBooksTitleArray];
        const newBooksFilteredSet = new Set(newBooksSuperSet);
        return [...newBooksFilteredSet];
      });

      setHasMore(res.data.docs.length > 0);

    }).catch(err => {
      // Error
      console.log('Error', err);

      // Ignore in-flight request cancellation error
      if (axios.isCancel(err)) {
        return;
      }

      setError(true);
    }).finally(() => {
      setIsLoading(false);
    });

    return () => cancelMethod();
  }, [queryText, pageNum]);


  // Another hook to clear all books on when search query changes
  useEffect(() => {
    setBooks([])
  }, [queryText])

  // Finally return the stuff that we need in other components
  return { isLoading, error, books, hasMore }
}