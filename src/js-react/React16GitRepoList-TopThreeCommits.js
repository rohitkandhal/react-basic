import axios from "axios";
import { useState, useEffect } from "react";

export default function GetTopThreeCommitters(contributors_url, showAlert) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [contributors, setContributors] = useState([]);

  const MAX_RESULTS_PER_PAGE = 3;

  useEffect(() => {
    setContributors([]);
    if (contributors_url.length > 0) {
      setIsLoading(true);
      setError('')

      const controller = new AbortController();

      const getConfig = {
        params: {
          per_page: MAX_RESULTS_PER_PAGE,
          page: 1,
          signal: controller.signal
        }
      }

      axios.get(contributors_url, getConfig).then(response => {
        console.log(response.data)
        setContributors(response.data)
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
    }

  }, [contributors_url]);

  useEffect(() => {

    function getAlertMessage() {
      const result = `Here are the top committers for \n` +
        `Repository: ${contributors_url} \n\n` +
        contributors.map(contributor => `Name - ${contributor.login}, Contributions - ${contributor.contributions}`).join('\n');

      return result;
    }

    if (contributors.length > 0) {
      alert(getAlertMessage())
    }

  }, [contributors, showAlert])


  return [contributors, isLoading, error];
}

