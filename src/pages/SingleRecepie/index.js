import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../../components/Header";
import RecepieCover from "./RecepieCover";
import Method from "./Method";
import Ingredients from "./Ingredients";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function SingleRecepie() {
  const params = useParams();
  const { recepieId } = params;
  const { token } = useAuth();
  const [recepie, setRecepie] = useState({});
  const [ingredients, setIngredients] = useState([]);

  scrollTo(0, 0);

  useEffect(() => {
    async function getSingleRecepie() {
      const { data: singleRecepie } = await api.findSingleRecepie(
        token,
        recepieId
      );
      setRecepie(singleRecepie);
      setIngredients(singleRecepie.ingredientsRecepies);
      console.log({ing: singleRecepie.ingredientsRecepies});
    }

    getSingleRecepie();
  }, []);

  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <main>
          <RecepieCover recepie={recepie} />

          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Ingredients ingredients={ingredients} />

            <Method recepie={recepie} />
          </Grid>
        </main>
      </Container>

      <Footer />
    </>
  );
}
