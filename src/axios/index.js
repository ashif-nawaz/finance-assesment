import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default client;
