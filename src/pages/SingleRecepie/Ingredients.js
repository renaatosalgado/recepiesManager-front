import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

function Sidebar({ ingredients }) {
  return (
    <Grid item xs={12} md={4}>
      <Grid display="flex" alignItems="center">
        <ShoppingBasketIcon sx={{ color: "#388e3c" }} />
        <Typography variant="h6" gutterBottom sx={{ mt: 1, ml: 1 }}>
          Ingredientes
        </Typography>
      </Grid>

      {ingredients.map((ingredient) => (
        <Typography display="block" variant="body1" key={ingredient.id}>
          - {ingredient.quantity} {ingredient.measure.name}
          {" de "}
          {ingredient.ingredient.name}
        </Typography>
      ))}
    </Grid>
  );
}

export default Sidebar;
