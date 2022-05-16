import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

function RecepieCover({ recepie }) {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "gray.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${recepie.picture})`,
      }}
    >
      {
        <img
          style={{ display: "none" }}
          src={recepie.picture}
          alt={recepie.name}
        />
      }

      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {recepie.name}
            </Typography>
            <Typography component="h2" variant="h6" color="inherit">
              {recepie.servingPortion === 1
                ? `Serve ${recepie.servingPortion} pessoa`
                : `Serve ${recepie.servingPortion} pessoas`}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default RecepieCover;
