export default `import React, { useEffect } from 'react';
import { useFetcher, Fetcher } from 'react-use-fetcher';
import axios from 'axios';

const FailButtonExample = () => {
  const fetcher = useFetcher({
    buttonComponent: ({ doRetry }) => (
      <a className="button is-danger" onClick={doRetry}>
        Retry
      </a>
    )
  });

  const loadData = () => {
    let responsePromise = axios.get('https://impossible.path/api');
    fetcher.fetch(responsePromise, data => {});
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="test-container">
      <Fetcher fetcher={fetcher}>
        <span className="my-title">Bugged component</span>
        <div className="my-content">This will always fail</div>
        <div className="my-footer">
          <a className="button is-primary" onClick={loadData}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default FailButtonExample;
`;
