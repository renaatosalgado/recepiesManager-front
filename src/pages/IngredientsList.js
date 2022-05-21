import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import IngredientContext from "../contexts/IngredientsContext";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import { Container, Grid, List, ListItem, Typography } from "@mui/material";

export default function IngredientsList() {
  const [ingredientList, setIngredientList] = useContext(IngredientContext);
  const [recepies, setRecepies] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function listAll() {
      const { data: allIngredients } = await api.listAllIngredients(
        token,
        ingredientList
      );
      setRecepies(allIngredients);
    }
    listAll();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Grid
          container
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Lista de compras
            </Typography>
            <List>
              {recepies.map((recepie) =>
                recepie.map((ingredient) => (
                  <ListItem key={ingredient.id}>
                    <Typography>
                      {`${ingredient.ingredient.name} - ${ingredient.quantity} ${ingredient.measure.name} `}
                    </Typography>
                  </ListItem>
                ))
              )}
            </List>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
