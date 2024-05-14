import { cache } from "react";
import { QueryClient } from "react-query";

const getQueryClient = cache(() => new QueryClient()) as () => QueryClient;
export default getQueryClient;
