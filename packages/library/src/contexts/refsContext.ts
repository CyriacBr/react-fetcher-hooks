import { createContext } from "react";
import { FetcherRef } from "../fetcherRef";

export const RefsContext = createContext<FetcherRef[]>([]);
