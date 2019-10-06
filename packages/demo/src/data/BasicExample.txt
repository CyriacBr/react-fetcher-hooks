import React, { useState, useEffect } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const BasicExample = () => {
  const fetcher = useFetcher();
  const [json, setJson] = useState('No result yet');

  const loadData = () => {
    let request = () => axios.get('https://api.chucknorris.io/jokes/random');
    fetcher.fetch(request, data => {
      setJson(JSON.stringify(data, null, 2));
    });
  };
  useEffect(() => {
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
          <a className="button is-primary" onClick={loadData}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default BasicExample;
