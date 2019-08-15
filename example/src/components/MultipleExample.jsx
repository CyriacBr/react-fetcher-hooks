import React, { useState, useEffect } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const MultipleExample = () => {
  const fetcher = useFetcher();
  const [jsonA, setJsonA] = useState('No JSON yet');
  const [jsonB, setJsonB] = useState('No JSON yet');

  const loadJsonA = () => {
    let responsePromise = axios.get('https://api.chucknorris.io/jokes/random');
    fetcher.fetch(responsePromise, data => {
      setJsonA(JSON.stringify(data, null, 2));
    });
  };

  const loadJsonB = () => {
    let responsePromise = axios.get('https://api.chucknorris.io/jokes/random');
    fetcher.fetch(responsePromise, data => {
      setJsonB(JSON.stringify(data, null, 2));
    });
  };

  const loadAll = () => {
    loadJsonA();
    loadJsonB();
  }

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="test-container">
      <Fetcher fetcher={fetcher}>
        <span className="my-title">Random JSONs loader</span>
        <div className="my-content">
          <pre>
            <code>{jsonA}</code>
          </pre>
        </div>
        <div className="my-content">
          <pre>
            <code>{jsonB}</code>
          </pre>
        </div>
        <div className="my-footer">
          <a className="button is-primary" onClick={loadAll}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default MultipleExample;
