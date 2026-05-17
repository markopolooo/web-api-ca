import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const HomePage = (props) => {
const [page, setPage] = useState(1);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover', { page }],
    queryFn: getMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

     return (
      <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Pagination
        count={10}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#c084fc",
            borderColor: "#c084fc",
          },
        }}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  </>
  );

};
export default HomePage;
