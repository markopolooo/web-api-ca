import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularActors } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router";
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

const ActorsPage = () => {
  const { data: actors, isPending, isError, error } = useQuery({
    queryKey: ["popularActors"],
    queryFn: getPopularActors,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
<>
     <PageTemplate
      title="Actors"
      movies={[]}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />


    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{
          color: "#c084fc",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Popular Actors
      </Typography>
      <Grid container spacing={3}>
        {actors.map((actor) => (
          <Grid key={actor.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Link to={`/person/${actor.id}`} style={{ textDecoration: "none" }}>
              <StyledCard>
                <CardMedia
                  sx={{ height: 350 }}
                  image={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                    {actor.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                    {actor.known_for_department}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.3)", mt: 1 }}>
                    Known for: {actor.known_for.slice(0, 2).map(m => m.title || m.name).join(", ")}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default ActorsPage;