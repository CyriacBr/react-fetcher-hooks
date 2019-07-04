export default `import React, { Component, useState, useEffect } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const BasicExample = () => {
  const fetcher = useFetcher();
  const [json, setJson] = useState('No JSON yet');

  const loadData = () => {
    let responsePromise = axios.get('https://api.chucknorris.io/jokes/random');
    fetcher.fetch(responsePromise, data => {
      setJson(JSON.stringify(data));
    });
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="test-container">
      <Fetcher fetcher={fetcher}>
        <span className="my-title">Random JSON loader</span>
        <div className="my-content">
          {json}
        </div>
        <div className="my-footer">
          <a className="button is-primary" onClick={loadData}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default BasicExample;
`;