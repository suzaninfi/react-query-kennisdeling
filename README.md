# React Query kennisdeling project

Practice project to learn React Query. Shows three way to use the `useQuery` hook to fetch and cache data, by fetching
episodes from the [Rick and Morty API](https://rickandmortyapi.com/) and displaying them.

You can find the app live on https://suzaninfi.github.io/react-query-project

## Install

```bash
npm install
```

### Run

```bash
npm start
```

## Pages

### Without

The code in [`WithoutPage.tsx`](/src/pages/WithoutPage.tsx) shows how fetching data is usually done **without** React
Query.

### With

The [`WithPage.tsx`](/src/pages/WithPage.tsx) shows how you can use `useQuery` to fetch and cache data of one single
endpoint.

### Paginated

To see how you can handle paginated data with React Query, take a look
at [`PaginatedPage.tsx`](/src/pages/PaginatedPage.tsx)  .

### Infinite

It's also possible to make an infinite scroll with React Query. The [`InfinitePage.tsx`](/src/pages/InfinitePage.tsx)
shows you how. 