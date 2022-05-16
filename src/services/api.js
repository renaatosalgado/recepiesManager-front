/* eslint-disable no-undef */
import axios from "axios";

const BASE_URL = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function signUp(body) {
  return BASE_URL.post("/users/sign-up", body);
}

function signIn(body) {
  return BASE_URL.post("/auth/sign-in", body);
}

function validateToken(token) {
  const config = getConfig(token);
  return BASE_URL.get("/auth/validate", config);
}

function listRecepies(token) {
  const config = getConfig(token);
  return BASE_URL.get("/recepies", config);
}

function logout(token) {
  const config = getConfig(token);
  return BASE_URL.delete("/auth/logout", config);
}

function findSingleRecepie(token, recepieId) {
  const config = getConfig(token);
  return BASE_URL.get(`/recepies/${recepieId}`, config);
}

const api = {
  signUp,
  signIn,
  validateToken,
  listRecepies,
  logout,
  findSingleRecepie,
};

export default api;
