import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

myAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request sent", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

myAxios.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      console.log("Token received:", response.data.token);
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default myAxios;
