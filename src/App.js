import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import Alert from "./components/Alert";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SingleRecepie from "./pages/SingleRecepie";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#388e3c",
      },
      secondary: {
        main: "#1976d2",
      },
      background: { default: "#FAFAFA", paper: "#FAFAFA" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/home" element={<Home />} />
              <Route path="/recepies/:id" element={<SingleRecepie />} />
            </Routes>
          </BrowserRouter>
          <Alert />
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
