import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function Main({ recepie }) {
  return (
    <Grid item xs={12} md={8} sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Modo de preparo
      </Typography>

      <Divider />

      <Typography sx={{ mt: 1 }}>{recepie.method}</Typography>
    </Grid>
  );
}

export default Main;
