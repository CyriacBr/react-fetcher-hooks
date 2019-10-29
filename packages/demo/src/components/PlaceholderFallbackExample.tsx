import React, { useEffect } from 'react';
import { useFetcher, Fetcher, FetcherOptions } from 'react-fetcher-hooks';

const options: FetcherOptions = {
  dimBackground: false,
  hideLoader: true,
  placeholder: {
    show: true
  }
};

const PlaceholderFallbackExample = () => {
  const ref = useFetcher();
  useEffect(() => {
    ref.setLoading(true);
  }, []);

  return (
    <div className='test-container'>
      <Fetcher refs={[ref]} options={options}
      Fallback={() => (
        <div className='--p'>
          I'm being loaded
        </div>
      )}>
        My Content
      </Fetcher>
    </div>
  );
};

export default PlaceholderFallbackExample;
