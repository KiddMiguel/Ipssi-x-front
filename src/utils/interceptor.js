import axios from "axios";
 
const myAxios = axios.create({
  baseURL: "", 
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
 
myAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("Request sent", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
 
export default myAxios;