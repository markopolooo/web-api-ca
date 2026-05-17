import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery({
  queryKey: ["upcoming"],
  queryFn: getUpcomingMovies,
});

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={data}
      action={(movie) => <AddToWatchListIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;