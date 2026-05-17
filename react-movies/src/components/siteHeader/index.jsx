import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MovieIcon from "@mui/icons-material/Movie";
import Badge from "@mui/material/Badge";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";

//const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
  boxShadow: "0 4px 20px rgba(100, 60, 255, 0.4)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
});

const NavButton = styled(Button)({
  color: "#fff",
  fontSize: "0.8rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  borderRadius: "20px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255,255,255,0.1)",
    boxShadow: "0 0 12px rgba(150, 100, 255, 0.6)",
    color: "#c084fc",
  },
});
const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const { favorites, mustWatch } = useContext(MoviesContext);

 const menuOptions = [
  { label: "Home", path: "/" },
  { label: "Favorites", path: "/movies/favorites", badge: favorites.length },
  { label: "Must Watch", path: "/movies/mustwatch", badge: mustWatch.length },
  { label: "Upcoming", path: "/movies/upcoming" },
  { label: "Popular", path: "/movies/popular" },
  { label: "Top Rated", path: "/movies/top-rated" },
  { label: "Now Playing", path: "/movies/now-playing" },
  { label: "Actors", path: "/actors" },
];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <StyledAppBar position="sticky" >
        <Toolbar>
            <MovieIcon sx={{ mr: 1, fontSize: "5rem", color: "#c084fc" }} />
          <Link to="/homePage.jsx" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h4" sx={{ flexGrow: 1,
  fontWeight: 800,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  background: "linear-gradient(90deg, #c084fc, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent", }}>
            TMDB Client
          </Typography>
          </Link>
          <Typography variant="h6" sx={{flexGrow: 1,
  color: "rgba(255,255,255,0.45)",
  letterSpacing: "0.05em",
  fontStyle: "italic",}}>
            All you ever wanted to know about Movies!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <NavButton
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    <Badge
      badgeContent={opt.badge}
      color="error"
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#c084fc",
          color: "#fff",
        }
      }}
    >
                    {opt.label}
                    </Badge>
                  </NavButton>
                ))}
              </>
            )}
        </Toolbar>
      </StyledAppBar>
    {/* <Offset /> */}
    </>
  );
};

export default SiteHeader;
