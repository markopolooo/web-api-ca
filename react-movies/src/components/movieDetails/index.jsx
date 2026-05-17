import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Link } from "react-router";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, cast }) => {
const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />

<li>
    <Chip label="Production Countries" sx={{...chip}} color="primary" />
  </li>
  {movie.production_countries.map((c) => (
    <li key={c.name}>
      <Chip label={c.name} sx={{...chip}} />
    </li>
  ))}

      </Paper>
      <Accordion sx={{ background: "linear-gradient(145deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.08)", marginTop: 2 }}>
  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#c084fc" }} />}>
    <Typography sx={{ color: "#c084fc", fontWeight: 700, letterSpacing: "0.1em" }}>
      Cast
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <List>
      {cast && cast.slice(0, 10).map((member) => (
        <ListItem key={member.cast_id} component={Link} to={`/person/${member.id}`} sx={{ textDecoration: "none", "&:hover": { background: "rgba(192,132,252,0.1)", borderRadius: "8px" } }}>
          <ListItemAvatar>
            <Avatar
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${member.profile_path}`
                  : null
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography sx={{ color: "#fff" }}>{member.name}</Typography>}
            secondary={<Typography sx={{ color: "rgba(255,255,255,0.5)" }}>{member.character}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  </AccordionDetails>
</Accordion>
            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

        <NavigationIcon />
        Reviews
      </>
  );
};
export default MovieDetails ;
