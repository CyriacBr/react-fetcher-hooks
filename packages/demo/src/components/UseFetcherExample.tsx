import React, { useState, useEffect } from 'react';
import { Fetcher, useFetcher } from 'react-fetcher-hooks';
import axios from 'axios';

const UseFetcherExample = () => {
  const [json, setJson] = useState();
  const ref = useFetcher();

  function getJson() {
    ref.fetch(() => axios.get<any>('https://api.chucknorris.io/jokes/random'), data => {
      setJson(data);
    });
  }

  useEffect(() => getJson(), []);

  return (
    <div className='test-container'>
      <Fetcher refs={[ref]}>
        <span className='my-title'>Random JSON loader</span>
        <div className='my-content'>
          <pre>
            <code>{JSON.stringify(json, null, 2)}</code>
          </pre>
        </div>
        <div className='my-footer'>
          <a className='button is-primary' onClick={getJson}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default UseFetcherExample;
