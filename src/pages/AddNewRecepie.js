import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddNewRecepie() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [ingredientFields, setIngredientFields] = useState([
    { quantity: "", measure: "", ingredient: "" },
  ]);
  const [formData, setFormData] = useState({
    servingPortion: "",
    method: "",
    name: "",
    picture: "",
  });
  const servingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function handleIngredientInputChange(index, e) {
    let data = [...ingredientFields];
    data[index][e.target.name] = e.target.value;

    setIngredientFields(data);
  }

  function addIngredientField() {
    let newIngredientField = { quantity: "", measure: "", ingredient: "" };

    setIngredientFields([...ingredientFields, newIngredientField]);
  }

  function removeIngredientField(index) {
    let data = [...ingredientFields];
    data.splice(index, 1);
    setIngredientFields(data);
  }

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      ingredientFields.length === 0 ||
      !formData?.method ||
      !formData?.name ||
      !formData?.servingPortion ||
      !formData?.picture
    ) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    try {
      await api.addRecepie(token, {
        ingredients: ingredientFields,
        info: formData,
      });
      setMessage({ type: "success", text: "Receita cadastrada com sucesso!" });
      navigate("/home")
    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        //navigate("/recepies/add-new");
        return;
      }
      setMessage({
        type: "error",
        text: "Erro, tente novamente em alguns segundos!",
      });
      //navigate("/recepies/add-new");
    }
  }

  return (
    <>
      <Header />

      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Crie uma nova receita
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            {ingredientFields.map((input, index) => {
              return (
                <Grid
                  key={index}
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Grid item xs={1.5}>
                    <TextField
                      helperText="ex.: '1/4' ou '2'"
                      fullWidth
                      label="Quantidade"
                      name="quantity"
                      type="text"
                      onChange={(e) => handleIngredientInputChange(index, e)}
                      value={input.quantity}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      helperText="ex.: 'xícara' ou 'pitada'"
                      fullWidth
                      label="Medida"
                      name="measure"
                      type="text"
                      onChange={(e) => handleIngredientInputChange(index, e)}
                      value={input.measure}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      helperText="ex.: batata-doce"
                      fullWidth
                      label="Ingrediente"
                      name="ingredient"
                      type="text"
                      onChange={(e) => handleIngredientInputChange(index, e)}
                      value={input.ingredient}
                    />
                  </Grid>

                  <Grid item xs={0.25} sx={{ mb: 3, cursor: "pointer" }}>
                    <Button onClick={() => removeIngredientField(index)}>
                      <DeleteForeverIcon color="error" fontSize="small" />
                    </Button>
                  </Grid>
                </Grid>
              );
            })}

            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={addIngredientField}
                >
                  Adicionar ingrediente...
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="center"
              direction="column"
              sx={{ mt: 4 }}
            >
              <Grid item xs={3} sx={{ mt: 1 }}>
                <TextField
                  helperText="ex.: 5"
                  fullWidth
                  select
                  label="Serve quantas pessoas?"
                  name="servingPortion"
                  onChange={handleFormChange}
                  value={formData.servingPortion}
                  type="number"
                >
                  {servingOptions.map((option, index) => {
                    return (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>

              <Grid item xs={3} sx={{ mt: 2 }}>
                <TextField
                  helperText="ex.: cortar a cebola em cubos..."
                  fullWidth
                  multiline
                  maxRows={5}
                  minRows={2}
                  label="Modo de preparo"
                  name="method"
                  onChange={handleFormChange}
                  value={formData.method}
                  type="text"
                />
              </Grid>

              <Grid item xs={3} sx={{ mt: 3 }}>
                <TextField
                  helperText="ex.: Bolo de cenoura"
                  fullWidth
                  label="Nome da receita"
                  name="name"
                  onChange={handleFormChange}
                  value={formData.name}
                  type="text"
                />
              </Grid>

              <Grid item xs={3} sx={{ mt: 3 }}>
                <TextField
                  helperText="ex.: qualquer link de imagem!"
                  fullWidth
                  label="Imagem da receita"
                  name="picture"
                  onChange={handleFormChange}
                  value={formData.picture}
                  type="text"
                />
              </Grid>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Criar receita!
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
