import React, { useEffect } from "react";
import { FetcherOptions } from "./Fetcher";
import { FetcherRef } from "../fetcherRef";
import { useProgress, useFetcherCallbacks } from "..";
import Progress from "./Progress";
import { useFetcherCallback } from "../hooks";

export interface ProgressDisplayProps {
  options: FetcherOptions;
  error: boolean;
  loading: boolean;
  refs: FetcherRef[];
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  options,
  error,
  loading,
  refs
}) => {
  const progress = useProgress({
    tickDelay: options.progress.tickDelay,
    valuePerTick: options.progress.valuePerTick
  });
  const progressColor = error
    ? options.progress.errorColor
    : options.progress.color;

  useFetcherCallback(refs)
    .on('start', () => progress.start())
    .on('end', () => progress.done());

  return progress.show && <Progress ref={progress.ref} color={progressColor} />;
};

export default ProgressDisplay;
