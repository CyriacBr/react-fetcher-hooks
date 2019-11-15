import React, { useLayoutEffect, useMemo, useState } from "react";
import { LoadingDisplay } from "./LoadingDisplay";
import { ErrorDisplay } from "./ErrorDisplay";
import { FetcherRef } from "../fetcherRef";
import { Wrapper } from "./Wrapper";
import { Placeholder } from "./Placeholder";
import { useFetcherStatus, FetcherOptions } from "..";
import { useFetcherCallbacks } from "../hooks";
import { RefsContext } from "../contexts/refsContext";

export interface FetcherFeedbackProps {
  options?: FetcherOptions;
}

const FetcherFeedback: React.FC<FetcherFeedbackProps> = ({
  options,
  children
}) => {
  return (
    <>
      <Wrapper options={options} />
      {options.placeholder.show ? (
        <Placeholder
          children={children}
          options={options.placeholder}
          initialLoading={options.initialLoading}
        />
      ) : (
        children
      )}
    </>
  );
};

export { FetcherFeedback };
