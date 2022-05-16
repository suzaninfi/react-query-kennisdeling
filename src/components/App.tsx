import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Page } from "./Page";
import { InfiniteEpisodesPage } from "../pages/InfiniteEpisodesPage";
import { PaginatedEpisodesPage } from "../pages/PaginatedEpisodesPage";

const queryClient = new QueryClient({
  // global options for all queries
  defaultOptions: {
    queries: {
      // default: refetch every time window gets focussed
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter basename={"/"}>
        <Page>
          <Routes>
            <Route path={"/"} />
            <Route path={"/paginated"} element={<PaginatedEpisodesPage />} />
            <Route path={"/infinite"} element={<InfiniteEpisodesPage />} />
          </Routes>
        </Page>
        <ReactQueryDevtools initialIsOpen={false} />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
