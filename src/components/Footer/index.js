import React from "react";
import { Box, Typography } from "@mui/material";
import Copyright from "../Copyright";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Recepies Manager
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Free creation to help people cook and buy their ingredients.
      </Typography>
      <Copyright />
    </Box>
  );
}