import React, { useState, useEffect } from 'react';
import { useRequest, Fetcher, FetcherOptions } from 'react-fetcher-hooks';
import axios from 'axios';

const options: FetcherOptions = {
  progress: {
    show: true
  }
};

const BasicExample = () => {
  const [ref, getJson, json] = useRequest(
    () => axios.get<any>('https://api.chucknorris.io/jokes/random'),
    true
  );

  return (
    <div className='test-container'>
      <Fetcher refs={[ref]} options={options}>
        <span className='my-title'>Random JSON loader</span>
        <div className='my-content'>
          <pre>
            <code>{JSON.stringify(json, null, 2)}</code>
          </pre>
        </div>
        <div className='my-footer'>
          <a className='button is-primary' onClick={getJson}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default BasicExample;
