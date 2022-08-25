import useBookSearchCustomHook from "./React15InfiniteScroll-2-customHook";
import { useState, useEffect, useRef, useCallback } from "react";

export default function InfiniteScroll() {
  const [query, setQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);

  const [books, isLoading, error, hasMore] = useBookSearchCustomHook(query, pageNum);

  const observer = useRef();

  // useCallback will only call when one of the dep is updated
  const lastBookElemCallback = useCallback(
    (node) => {
      if (isLoading) return;

      // disconnect observer
      if (observer.current) observer.current.disconnect();

      // create new observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum(prevPage => prevPage + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  )

  function handleSearchChange(e) {
    setQuery(e.target.value)
    setPageNum(1);
  }

  return (
    <div className="App">
      <input type="text" value={query} onChange={handleSearchChange}></input>

      {books.map((book, index) => {

        // If it is last book element, then attach intersection observer to that elem
        if (books.length === index + 1) {
          return <div ref={lastBookElemCallback} key={book}>{book} </div>
        }

        // Otherwise return normal div
        return <div key={book}>{book} </div>
      })};

      <div>{isLoading && "Loading ..."}</div>
      <div>{error && "Error pulling data..."} </div>
    </div>
  )
}