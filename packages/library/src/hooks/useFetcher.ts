import { useMemo } from 'react';
import { FetcherRef } from '..';

export function useFetcher() {
  return useMemo(() => new FetcherRef(), []);
}
