import React, { useState, useEffect } from 'react';
import { useRequest, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const ManualUsageExample = () => {
  const [ref, getJson] = useRequest(() =>
    axios.get<any>('https://api.chucknorris.io/jokes/random')
  );
  const [joke, setJoke] = useState('');

  const load = () =>
    getJson(json => {
      setJoke(json.value);
    });

  useEffect(() => load(), []);

  return (
    <div className='test-container'>
      <Fetcher refs={[ref]}>
        <span className='my-title'>Random joke loader</span>
        <div className='my-content'>
          <pre>
            <code>{joke}</code>
          </pre>
        </div>
        <div className='my-footer'>
          <a className='button is-primary' onClick={load}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default ManualUsageExample;
