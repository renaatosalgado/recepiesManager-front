import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";
import useAlert from "../hooks/useAlert";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

const styles = {
  container: {
    marginTop: "180px",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: { marginBottom: "30px" },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    marginBottom: "26px",
  },
  input: { marginBottom: "16px" },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

function SignUp() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
      console.log("aqui", formData)
    e.preventDefault();
    setMessage(null);

    if (
      !formData?.name ||
      !formData?.email ||
      !formData?.password ||
      !formData?.passwordConfirmation
    ) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    const { name, email, password, passwordConfirmation } = formData;

    if (password !== passwordConfirmation) {
      setMessage({ type: "error", text: "As senhas devem ser iguais!" });
      return;
    }

    try {
      await api.signUp({ name, email, password });
      setMessage({ type: "success", text: "Cadastro efetuado com sucesso!" });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        return;
      }
      setMessage({
        type: "error",
        text: "Erro, tente novamente em alguns segundos!",
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                sx={{ width: "100%" }}
                label="Nome completo"
                type="text"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                sx={{ width: "100%" }}
                label="Email"
                type="email"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                name="password"
                sx={{ width: "100%" }}
                label="Senha"
                onChange={handleInputChange}
                value={formData.password}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                sx={{ width: "100%" }}
                name="passwordConfirmation"
                label="Confirme sua senha"
                onChange={handleInputChange}
                value={formData.passwordConfirmation}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                <Typography>Já possui cadastro? Entre!</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
