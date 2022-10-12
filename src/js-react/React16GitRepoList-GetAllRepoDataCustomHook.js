import axios from "axios";
import { useEffect, useState } from "react";

const GET_URL =
  "https://api.github.com/search/repositories?q=apache+language:scala&sort=stars&order=desc";

export default function GetAllRepoDataCustomHook(currPageNum = 1) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [repos, setRepos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const MAX_RESULTS_PER_PAGE = 10;

  useEffect(() => {
    setIsLoading(true);
    setError('')

    const controller = new AbortController();

    const getConfig = {
      params: {
        per_page: MAX_RESULTS_PER_PAGE,
        page: currPageNum,
        signal: controller.signal
      }
    }

    axios.get(GET_URL, getConfig).then(response => {
      console.log(response.data.items)
      setRepos(response.data.items)

      const maxPageCount = Math.ceil(response.data.total_count / MAX_RESULTS_PER_PAGE);

      if (currPageNum >= maxPageCount) {
        setHasMore(false);
      }
    }).catch(error => {
      console.log(error)
      setError(`Error while retrieving data - \n ${error.response.data.message}`)
    }).finally(() => {
      setIsLoading(false);
    })

    return () => {
      // cancel in-flight request
      controller.abort();
    }
  }, [currPageNum]);

  return [repos, isLoading, error, hasMore];
}


