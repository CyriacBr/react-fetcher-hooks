import React, { useState, useEffect } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const MultipleExample2 = () => {
  const fetcher = useFetcher();
  const [jsons, setJsons] = useState<string[]>([]);

  const loadData = () => {
    setJsons([]);
    let request = () => [
      axios.get('https://api.chucknorris.io/jokes/random'),
      axios.get('https://api.chucknorris.io/jokes/random')
    ];
    fetcher.fetchMany<any[]>(request, data => {
      setJsons(data.map(json => JSON.stringify(json, null, 2)));
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

export default MultipleExample2;
