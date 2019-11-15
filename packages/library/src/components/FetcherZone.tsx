import React, { useContext, useMemo } from "react";
import { FetcherOptions, Fetcher, makeFullOptions } from "./Fetcher";
import { RefsContext } from "../contexts/refsContext";
import { useFetcherStatus } from "../hooks";
import { Wrapper } from "./Wrapper";
import { FetcherFeedback } from "./FetcherFeedback";

export interface FetcherZoneProps {
  onLoading?: boolean;
  onLoaded?: boolean;
  onError?: boolean;
  options?: FetcherOptions;
}

export const FetcherZone: React.FC<FetcherZoneProps> = ({
  children,
  onError,
  onLoaded,
  onLoading,
  options
}) => {
  const refs = useContext(RefsContext);
  const { loading, error } = useFetcherStatus(refs);

  const _options = useMemo(
    () =>
      makeFullOptions({
        handleError: onError,
        handleLoading: onLoading,
        ...(options || {})
      }),
    []
  );

  if ((onError && !error) || (onLoaded && loading) || (onLoading && !loading))
    return null;
  return <FetcherFeedback options={_options}>{children}</FetcherFeedback>;
};
