import React, { useEffect, useState } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const MinimalExample: React.FC = () => {
  const fetcher = useFetcher();
  const [title, setTitle] = useState('No todo title');

  const load = () => {
    let randomId = Math.round(Math.random() * 100) + 1;
    let request = () => axios.get(`https://jsonplaceholder.typicode.com/todos/${randomId}`);
    fetcher.fetch(request, data => {
      setTitle(data.title);
    });
  };

  useEffect(() => load(), []);

  return (
    <div className="test-container">
      <Fetcher fetcher={fetcher}>
        <span><b>A random todo title: </b>{title}</span>
        <a onClick={load}>Refresh</a>
      </Fetcher>
    </div>
  );
};

export default MinimalExample;
