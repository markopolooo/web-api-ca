import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const PersonDetailsPage = () => {
  const { id } = useParams();

  const { data: person, isPending, isError, error } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPersonDetails,
  });

    if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
<>
<PageTemplate
        title={`${person.name} Details`}
        movies={[]}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />

    <Box sx={{
      maxWidth: "800px",
      margin: "40px auto",
      padding: "40px",
      background: "linear-gradient(145deg, #1a1a2e, #16213e)",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <Box sx={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
        <Avatar
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w300/${person.profile_path}`
              : null
          }
          sx={{ width: 200, height: 200, borderRadius: "12px" }}
          variant="rounded"
        />

            <Box>
          <Typography variant="h3" sx={{ color: "#c084fc", fontWeight: 800, mb: 1 }}>
            {person.name}
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)", mb: 2 }}>
            {person.known_for_department}
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}>
            <strong style={{ color: "#c084fc" }}>Born:</strong> {person.birthday} {person.place_of_birth ? `— ${person.place_of_birth}` : ""}
          </Typography>
          {person.deathday && (
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}>
              <strong style={{ color: "#c084fc" }}>Died:</strong> {person.deathday}
            </Typography>
          )}
        </Box>
      </Box>

          {person.biography && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ color: "#c084fc", fontWeight: 700, mb: 2 }}>
            Biography
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
            {person.biography}
          </Typography>
        </Box>
      )}
    </Box>
    </>
  );
};

export default PersonDetailsPage;