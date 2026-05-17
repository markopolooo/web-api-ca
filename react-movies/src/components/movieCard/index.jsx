import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  background: "linear-gradient(145deg, #1a1a2e, #16213e)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 30px rgba(100, 60, 255, 0.4)",
  },
});

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const isFavorite = favorites.includes(movie.id);
  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };


  return (
    <StyledCard>
            <CardHeader
        avatar={
          isFavorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" sx={{ color: "#fff", fontWeight: 700 }}>
            {movie.title}{" "}
          </Typography>
        }
      />

      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{xs: 6}}>
            <Typography variant="h6" component="p" sx={{ color: "rgba(255,255,255,0.7)" }}>
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography variant="h6" component="p" sx={{ color: "rgba(255,255,255,0.7)" }}>
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
           <CardActions disableSpacing>
      
        {action(movie)}
      
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" sx={{
    borderColor: "#c084fc",
    color: "#c084fc",
    "&:hover": {
      borderColor: "#818cf8",
      background: "rgba(192,132,252,0.1)",
    },
  }}>
            More Info ...
          </Button>
        </Link>
        
      </CardActions>

    </StyledCard>
  );
}
