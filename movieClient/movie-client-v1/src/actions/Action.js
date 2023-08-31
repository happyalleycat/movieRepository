import Services from "../api/axiosConfig";
import Urls from "../api/Urls";

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
  },
  getWatchlist: async (userId, setWatchlist) => {
    await Actions.genericGet(Urls.getWatchlist(userId), Services.movieService, (resp) => {
      setWatchlist(resp.data);
    });
  }
};
