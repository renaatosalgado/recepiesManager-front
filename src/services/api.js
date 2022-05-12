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

const api = {
  signUp,
  signIn,
  validateToken,
};

export default api;
