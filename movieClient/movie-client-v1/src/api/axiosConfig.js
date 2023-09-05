import axios from "axios";

const apiGatewayBaseUrl = 'http://localhost:8765';

const Services = {
  movieService: axios.create({
    baseURL: `${apiGatewayBaseUrl}/movie-service`,
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }),

  userService: axios.create({
    baseURL: `${apiGatewayBaseUrl}/user-service`,
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }),
};

export default Services;
