import React, { useEffect, useState } from 'react';
import { useFetcher, Fetcher, FetcherOptions, useRequest } from 'use-fetcher-react';
import Axios from 'axios';

const options: FetcherOptions = {
  minDelay: 1200,
  dimBackground: false,
  hideLoader: true,
  placeholder: {
    show: true
  }
};

const PlaceholderExample2 = () => {
  const [page, setPage] = useState(0);
  const [ref, get, picsum] = useRequest((id: number) =>
    Axios.get<any>(`https://picsum.photos/id/${id}/info`)
  );

  useEffect(() => {
    get(80 + page);
  }, [page]);

  function nextPage() {
    setPage(page + 1);
  }

  function prevPage() {
    setPage(page - 1);
  }

  return (
    <div className='test-container'>
      <Fetcher refs={[ref]} options={options}>
        <span className='--p'>Picsum Loader</span>
        <br />
        <div className='--p picsum'>
          <img src={`https://picsum.photos/id/${picsum.id}/400/300`} alt='' />
        </div>
        <span className='--p picsum-name'>{`Picsum #${picsum.id}`}</span>
        <span className='--p picsum-author'>{picsum.author}</span>
        <div className='my-footer'>
          <button className='button is-primary' onClick={prevPage} disabled={page <= 0}>
            Previous
          </button>
          <button className='button is-primary' onClick={nextPage} disabled={page >= 5}>
            Next
          </button>
        </div>
      </Fetcher>
    </div>
  );
};

export default PlaceholderExample2;
