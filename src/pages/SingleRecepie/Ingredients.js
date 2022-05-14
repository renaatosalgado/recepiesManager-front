import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Sidebar(props) {
  const { archives } = props;

  return (
    <Grid item xs={12} md={4}>
      <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
        Ingredientes
      </Typography>
      {archives.map((archive) => (
        <Link
          display="block"
          variant="body1"
          href={archive.url}
          key={archive.title}
        >
          {archive.title}
        </Link>
      ))}
    </Grid>
  );
}

export default Sidebar;
