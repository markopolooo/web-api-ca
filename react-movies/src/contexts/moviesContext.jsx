import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./authContext";
import { addToFavourites, getFavourites, removeFromFavourites } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);
  const authContext = useContext(AuthContext);
const isAuthenticated = authContext ? authContext.isAuthenticated : false;

  useEffect(() => {
    if (isAuthenticated && localStorage.getItem("userId")) {
      getFavourites(localStorage.getItem("userId")).then(data => {
        if (Array.isArray(data)) {
          setFavorites(data.map(f => f.movieId));
        }
      });
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, localStorage.getItem("userId")]);

  const addToFavorites = async (movie) => {
    if (!favorites.includes(movie.id)) {
      await addToFavourites(movie.id, localStorage.getItem("userId"));
      setFavorites([...favorites, movie.id]);
    }
  };

  const removeFromFavorites = async (movie) => {
    await removeFromFavourites(localStorage.getItem("userId"), movie.id);
    setFavorites(favorites.filter(mId => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      setMustWatch([...mustWatch, movie.id]);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider; 