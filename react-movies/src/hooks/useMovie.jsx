// Custom hook to fetch and manage a single movie's data
import { useEffect, useState } from "react";
import { getMovie } from '../api/tmdb-api'

const useMovie = id => {
  const [movie, setMovie] = useState(null);
  // Fetch movie details from TMDB when id changes
  useEffect(() => {
    getMovie(id).then(movie => {
      setMovie(movie);
    });
  }, [id]);
  return [movie, setMovie];
};

export default useMovie;
