import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Page } from "./components/Page";
import { InfinitePage } from "./pages/InfinitePage";
import { PaginatedPage } from "./pages/PaginatedPage";
import { WithoutPage } from "./pages/WithoutPage";
import { WithPage } from "./pages/WithPage";

const queryClient = new QueryClient({
  // global options for all queries
  defaultOptions: {
    queries: {
      // default: refetch every time window gets focussed
      refetchOnWindowFocus: true,
      retry: 3,
      staleTime: 1000 * 10, // 10 seconds
      cacheTime: 1000 * 7, // 7 seconds
      keepPreviousData: true,
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
            <Route path={"/without"} element={<WithoutPage />} />
            <Route path={"/with"} element={<WithPage />} />
            <Route path={"/paginated"} element={<PaginatedPage />} />
            <Route path={"/infinite"} element={<InfinitePage />} />
          </Routes>
        </Page>
        <ReactQueryDevtools initialIsOpen={false} />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
