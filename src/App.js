import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import Alert from "./components/Alert";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import IngredientContext from "./contexts/IngredientsContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SingleRecepie from "./pages/SingleRecepie";
import AddNewRecepie from "./pages/AddNewRecepie";
import SelectRecepies from "./pages/SelectRecepies";
import IngredientsList from "./pages/IngredientsList";

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

  const [ingredientList, setIngredientList] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <AuthProvider>
          <IngredientContext.Provider value={[ingredientList, setIngredientList]}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/recepies/single/:recepieId"
                  element={<SingleRecepie />}
                />
                <Route path="/recepies/add-new" element={<AddNewRecepie />} />
                <Route path="/recepies/choose" element={<SelectRecepies />} />
                <Route
                  path="/ingredients/list-all"
                  element={<IngredientsList />}
                />
              </Routes>
            </BrowserRouter>
          </IngredientContext.Provider>
          <Alert />
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
