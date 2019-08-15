import React, { useState, useEffect } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const ListenerExample = () => {
  const fetcher = useFetcher({
    wrapperStyles: { display: 'none'}
  });
  const [json, setJson] = useState('No result yet');
  const [btnClass, setBtnClass] = useState('button is-primary');

  const loadData = () => {
    let request = () => axios.get('https://api.chucknorris.io/jokes/random');
    fetcher.fetch(request, data => {
      setJson(JSON.stringify(data, null, 2));
    });
  };

  useEffect(() => {
    fetcher.addListener('fetch-start', () => setBtnClass('button is-primary is-loading'));
    fetcher.addListener('all-fetch-end', () => setBtnClass('button is-primary'));
    loadData();
  }, []);

  return (
    <div className="test-container">
      <Fetcher fetcher={fetcher}>
        <span className="my-title">Random JSON loader</span>
        <div className="my-content">
          <pre>
            <code>{json}</code>
          </pre>
        </div>
        <div className="my-footer">
          <a className={btnClass} onClick={loadData}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default ListenerExample;
