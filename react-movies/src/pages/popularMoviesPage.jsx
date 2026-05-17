import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const PopularMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopularMovies,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Popular Movies"
      movies={data}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default PopularMoviesPage;