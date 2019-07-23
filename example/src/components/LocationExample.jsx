import React, { useState, useEffect } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const LocationExample = () => {
  const fetcher = useFetcher();
  const [json, setJson] = useState('No JSON yet');

  const loadData = () => {
    let responsePromise = axios.get('https://api.chucknorris.io/jokes/random');
    fetcher.fetch(responsePromise, data => {
      setJson(JSON.stringify(data, null, 2));
    });
  };
  useEffect(() => {
    //loadData();
    fetcher.setLoading(true);
  }, []);

  return (
    <div className="test-container">
      <span className="my-title">Random JSON loader</span>
      <div className="my-content">
        <pre>
          <code>{json}</code>
        </pre>
      </div>
      <div className="my-footer" style={{width: 'fit-content'}}>
        <Fetcher fetcher={fetcher}>
          <a className="button is-primary" onClick={loadData}>
            Refresh
          </a>
        </Fetcher>
      </div>
    </div>
  );
};

export default LocationExample;
