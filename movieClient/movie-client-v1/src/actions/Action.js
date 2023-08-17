import Services from "../api/axiosConfig";
import Urls from "../api/Urls";
import { AuthContext } from "../components/auth/AuthProvider";
import { useContext } from "react";

export const Actions = {
  genericGet: async function (url, service, ...functions) {
    await service.get(url).then((resp) => {
      functions.forEach((fn) => {
        fn(resp);
      });
    });
  },
  getMovieData: async (movieId, setMovie, setReviews) => {
    await Actions.genericGet(Urls.movie(movieId), Services.movieService, (resp) => {
      setMovie(resp.data);
      setReviews(resp.data.reviews);
    });
  },
  getMovies: async (setMovies) => {
    await Actions.genericGet(Urls.movies, Services.movieService, (resp) => {
      setMovies(resp.data);
    });
  }
};

export const useAuth = () => {return useContext(AuthContext)}
