import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const MustWatchPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const mustWatchQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });

  const isPending = mustWatchQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = mustWatchQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default MustWatchPage;