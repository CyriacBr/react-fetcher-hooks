import React, { useContext } from "react";
import { FetcherOptions, Fetcher } from "./Fetcher";
import { RefsContext } from "../contexts/refsContext";
import { useFetcherStatus } from "../hooks";

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

  if (onError && !error) return null;
  if (onLoaded && loading) return null;
  if (onLoading && !loading) return null;

  return (
    <Fetcher options={options} refs={refs}>
      {children}
    </Fetcher>
  );
};
