import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieRecommendations, getMovieCast } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const MoviePage = (props) => {
  const { id } = useParams();
    const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

   const { data: recommendations } = useQuery({
    queryKey: ['recommendations', { id: id }],
    queryFn: getMovieRecommendations,
  });

  const { data: cast } = useQuery({
  queryKey: ['cast', { id: id }],
  queryFn: getMovieCast,
});

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} cast={cast} />
          </PageTemplate>
          {recommendations && recommendations.length > 0 && (
            <Grid container sx={{ padding: '20px' }}>
              <Grid size={12}>
                <Typography variant="h4" component="h3">
                  Recommended Movies
                </Typography>
              </Grid>
              <MovieList
                movies={recommendations}
                action={() => <></>}
              />
            </Grid>
          )}
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
