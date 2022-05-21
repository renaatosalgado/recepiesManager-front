import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Zoom,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

export default function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { token, signOut } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.logout(token);
      signOut();
      navigate("/sign-in");
    } catch (error) {
      signOut();
      navigate("/sign-in");
    }
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleHome}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", width: 56, height: 56 }}
            >
              <RestaurantMenuIcon fontSize="large" />
            </Avatar>
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Permanent Marker" }}
          >
            Recepies Manager
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              id="account-btn"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" />

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
