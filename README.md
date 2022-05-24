# React Query project

Documentation: https://react-query.tanstack.com/overview

## Query

```ts
const {status, data, error} = useQuery<ResponseType, ErrorType>(["queryKey"], fetchData);
```

* React Query uses the **query key** to cache the query data. A key can be a single string, an array of strings or a
  nested object (as long as it's serializable and unique to the query data). This means you can use the same queries
  throughout your app, and have a shared cache! This may remove the need of having a global state or using redux in some
  cases.
* When using **TypeScript**, provide the return type of the fetch function, and the type of errors to expect from it.

### Status

The **status** can be any of the following values:

* `success`the query has received a response with no errors and is ready to display its data.
* `loading` there is no cached data to display, and the query is currently fetching.
* `error` the query attempt resulted in an error.
* `idle` this only happens if a query is initialized with `enabled: false` and no initial data is available

For each of these statuses, derived booleans are provided:

```ts
const {
    isSuccess,
    isLoading,
    isError,
    isIdle,
    status,
    data,
    error
} = useQuery<EpisodeResponse, Error>(["episodes"], fetchEpisodes);
```

## Other functionality

* **Dependent queries** (use the `enabled` option to tell a query when it is ready to run)

```ts
 const {isIdle, data: projects} = useQuery(
    ['projects', userId],
    getProjectsByUser,
    {
        // The query will not execute until the userId exists
        enabled: !!userId,
    }
)
```

* **Parallel queries** (no extra effort: use any number of `useQuery` or `useInfiniteQuery` hooks side-by-side!)
* Provide **initial data** or **placeholder data** for when the query is in the loading state
* **Prefetch** data to the cache, if you alreading know the user is going to be needing it later