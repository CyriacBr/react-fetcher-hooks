import React, { useState, useEffect, useMemo } from 'react';
import { useRequest, Fetcher, useFetcher } from 'react-fetcher-hooks';
import axios from 'axios';

const BasicExample = () => {
  const [ref, getJson, json] = useRequest(
    () => axios.get<any>('https://api.chucknorris.io/jokes/random'),
    true
  );

  return (
    <div className='test-container'>
      <Fetcher refs={[ref]}>
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
