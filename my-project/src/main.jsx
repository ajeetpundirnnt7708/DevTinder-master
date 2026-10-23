import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";
import { BASE_URL, TOKEN_KEY } from "./utils/constant";
import appstore from "./utils/Appstore";
import { removeUser } from "./utils/userSlice";

// One place to configure every API call. Components can now use relative
// paths such as axios.get("/profile/view").
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    const isAuthAttempt = url.includes("/login") || url.includes("/signup");

    if (status === 401 && !isAuthAttempt) {
      localStorage.removeItem(TOKEN_KEY);
      appstore.dispatch(removeUser());
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
