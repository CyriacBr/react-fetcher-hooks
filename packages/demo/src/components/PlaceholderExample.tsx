import React, { useEffect } from 'react';
import { useFetcher, Fetcher, FetcherOptions } from 'react-fetcher-hooks';

const options: FetcherOptions = {
  dimBackground: false,
  hideLoader: true,
  placeholder: {
    show: true
  }
};

const PlaceholderExample = () => {
  const ref = useFetcher();
  useEffect(() => {
    ref.setLoading(true);
  }, []);

  return (
    <div className='test-container'>
      <Fetcher refs={[ref]} options={options}>
        <span className='--p'>Placeholder Example</span>
        <br />
        <span className='--p'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum accumsan
          lorem, id tristique erat. Ut elementum dui lobortis ex eleifend eleifend. Curabitur
          scelerisque odio ac tellus volutpat, nec tempor justo tristique. Vivamus tincidunt sem nec
          ornare tempor. Maecenas at tellus ac arcu convallis pulvinar. Cras cursus, massa ut varius
          laoreet, sem dui faucibus nulla, in imperdiet lacus nulla vitae ante.
        </span>
      </Fetcher>
    </div>
  );
};

export default PlaceholderExample;
