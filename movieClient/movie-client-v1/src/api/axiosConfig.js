import axios from "axios";

const Services = {
  movieService: axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }),

  userService: axios.create({
    baseURL: "http://localhost:8081",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }),
};

export default Services;
