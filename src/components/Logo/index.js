import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Logo() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Permanent Marker",
            textAlign: "center",
            height: "3em",
            fontSize: "3em",
            mt: 3,
          }}
        >
          Recepies Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
