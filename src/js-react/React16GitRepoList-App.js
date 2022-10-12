import { useState } from 'react';
import '../styles/GithubRepoStyles.css';
import GetAllRepoDataCustomHook from './React16GitRepoList-GetAllRepoDataCustomHook';
import GetTopThreeCommitters from './React16GitRepoList-TopThreeCommits';

export default function GithubRepoList() {
  const [currPageNum, setCurrPageNum] = useState(1);
  const [contributorsUrl, setContributorsUrl] = useState('');

  // Bind custom hook to fetch data
  const [repos, isLoading, error, hasMore] = GetAllRepoDataCustomHook(currPageNum);
  GetTopThreeCommitters(contributorsUrl);


  function onNextBtnClick() {
    setCurrPageNum(prev => prev + 1)
  }

  function onPrevBtnClick() {
    setCurrPageNum(prev => prev - 1);
  }

  function onDetailsBtnClick(contributorsUrl) {
    setContributorsUrl(contributorsUrl);
  }
  return (
    <div className='github-app'>
      <h2>Github Repository List</h2>

      <h3>Current Page: {currPageNum}</h3>

      <button onClick={onPrevBtnClick} disabled={currPageNum === 1}>Previous</button>
      <button onClick={onNextBtnClick} disabled={!hasMore}>Next</button>
      {isLoading && <h2 className='info'>Fetching data from server</h2>}
      {!isLoading && <table className='github-repo-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Link</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>

          {repos.length > 0 && repos.map((repo, index) => {
            const currRowNum = (currPageNum - 1) * 10 + index + 1;
            return (
              <tr key={currRowNum}>
                <td>{currRowNum}</td>
                <td>{repo.name}</td>
                <td>{repo.owner.login}</td>
                <td>{repo.stargazers_count}</td>
                <td><a target="_blank" href={repo.html_url}>
                  {repo.full_name}
                </a></td>
                <td><button onClick={() => onDetailsBtnClick(repo.contributors_url)}>Details</button></td>
              </tr>
            )
          })}

        </tbody>

      </table>
      }

      {error.length > 0 && <h3 className='error'>{error}</h3>}
    </div>

  )
}