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

const post1 = { name: "eai" };
const post2 = { name: "ea2" };
const post3 = { name: "ea3" };

const posts = [post1, post2, post3];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
};

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
      console.log(singleRecepie.ingredientsRecepies);
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
