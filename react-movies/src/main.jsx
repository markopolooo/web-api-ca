import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import MustWatchPage from "./pages/mustWatchPage";
import PersonDetailsPage from "./pages/personDetailsPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ActorsPage from "./pages/actorsPage";
  
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#c084fc",
    },
    secondary: {
      main: "#818cf8",
    },
    background: {
      default: "#0f0c29",
      paper: "#1a1a2e",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
    },
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
           <SiteHeader />
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
            <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
            <Route path="/movies/mustwatch" element={<MustWatchPage />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/person/:id" element={<PersonDetailsPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
                    <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                    

          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ThemeProvider>
  );
};



const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
