import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { setMessage } = useAlert();
  const [recepies, setRecepies] = useState([]);
  const [hasRecepies, setHasRecepies] = useState(false);

  useEffect(() => {
    if (token) {
      authValidation(token);
    }

    async function loadPage() {
      const { data: recepies } = await api.listRecepies(token);
      console.log(recepies);
      setRecepies(recepies);

      if (recepies.length > 0) {
        setHasRecepies(true);
      }
    }
    loadPage();
  }, [token]);

  async function authValidation() {
    try {
      await api.validateToken(token);
    } catch (error) {
      localStorage.clear();
      navigate("/sign-in");
      setMessage({ type: "error", text: error.response.data });
      return;
    }
  }
  return (
    <>
      <Header />

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 1,
            pb: 1,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Suas receitas
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
            >
              Adicione novas receitas para sua lista pessoal. Em seguida
              selecione as receitas para as quais deseja gerar sua lista de
              compras específica!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/recepies/add-new");
                }}
              >
                Adicionar nova receita
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/recepies/choose");
                }}
              >
                Selecionar receitas para compra
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {hasRecepies ? (
              recepies.map((recepie) => (
                <Grid item key={recepie.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={recepie.picture}
                      alt="recepie-picture"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {recepie.name}
                      </Typography>
                      <Typography sx={{ mt: 1, fontSize: "14px" }}>
                        {recepie.servingPortion === 1
                          ? `Serve ${recepie.servingPortion} pessoa`
                          : `Serve ${recepie.servingPortion} pessoas`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => navigate(`/recepies/${recepie.id}`)}>Visualizar</Button>
                    </CardActions>
                  </Card>
                </Grid>
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
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
