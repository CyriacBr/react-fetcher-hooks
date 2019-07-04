import React, { useEffect, useState } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

const MinimalExample = () => {
  const fetcher = useFetcher();
  const [title, setTitle] = useState('No todo title');
  useEffect(() => {
    let request = axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    fetcher.fetch(request, data => {
      setTitle(`A todo title: ${data.title}`);
    });
  }, []);

  return (
    <div className="test-container">
      <Fetcher fetcher={fetcher}>
        <span>{title}</span>
      </Fetcher>
    </div>
  );
};

export default MinimalExample;
