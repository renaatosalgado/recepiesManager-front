import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IngredientContext from "../contexts/IngredientsContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

export default function SelectRecepies() {
  const [recepies, setRecepies] = useState([]);
  const [hasRecepies, setHasRecepies] = useState(false);
  const { token } = useAuth();
  const [chosenRecepies, setChosenRecepies] = useState([]);
  const [ingredientList, setIngredientList] = useContext(IngredientContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPage() {
      const { data: recepies } = await api.listRecepies(token);
      setRecepies(recepies);

      if (recepies.length > 0) {
        setHasRecepies(true);
      }
    }
    loadPage();
  }, [token]);

  function handleCheckBox(e) {
    if (chosenRecepies.includes(Number(e.target.value))) {
      const data = [...chosenRecepies];
      const idx = chosenRecepies.indexOf(Number(e.target.value));
      data.splice(idx, 1);
      setChosenRecepies(data);
    } else {
      setChosenRecepies([...chosenRecepies, Number(e.target.value)]);
    }
    console.log({ chosenRecepies });
  }

  function handleShoppingList() {
    setIngredientList(chosenRecepies);
    navigate("/ingredients/list-all");
  }

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
              Selecione as receitas
            </Typography>
            <Typography
              variant="h7"
              align="center"
              color="text.secondary"
              paragraph
            >
              A lista de compras final terá todos os ingredientes necessários
              para cozinhar todas as receitas selecionadas nesta página!
            </Typography>
          </Grid>
          <Grid item>
            <FormGroup>
              {hasRecepies ? (
                recepies.map((recepie) => (
                  <FormControlLabel
                    key={recepie.id}
                    control={
                      <Checkbox value={recepie.id} onChange={handleCheckBox} />
                    }
                    label={recepie.name}
                    labelPlacement="end"
                  />
                ))
              ) : (
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Você ainda não cadastrou nenhuma receita! Utilize o botão de
                  adicionar nova receita para começar :)
                </Typography>
              )}
            </FormGroup>
          </Grid>
          <Button
            variant="contained"
            sx={{ mt: 6 }}
            onClick={handleShoppingList}
          >
            Gerar lista de compras
          </Button>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
