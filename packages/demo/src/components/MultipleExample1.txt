import React, { useState, useEffect } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const MultipleExample1 = () => {
  const fetcher = useFetcher();
  const [jsons, setJsons] = useState<string[]>([]);

  const loadData = () => {
    setJsons([]);
    let request = () => axios.get('https://api.chucknorris.io/jokes/random');
    fetcher
    .fetch(request, data => {
      const json = JSON.stringify(data, null, 2);
      setJsons(prev => [json, ...prev]);
    })
    .fetch(request, data => {
      const json = JSON.stringify(data, null, 2);
      setJsons(prev => [json, ...prev]);
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
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {jsons.map((json,i) => (
              <pre key={i}>
                <code>{json}</code>
              </pre>
            ))}
          </div>
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

export default MultipleExample1;
