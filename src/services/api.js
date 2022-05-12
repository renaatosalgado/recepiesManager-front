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

const api = {
  signUp,
};

export default api;
