import { useMemo, useEffect } from 'react';
import { FetcherRef } from '..';

export function useFetcher() {
  const ref = useMemo(() => new FetcherRef(), []);

  useEffect(() => {
    return () => {
      ref.cancel();
    }
  });
  return ref;
}
