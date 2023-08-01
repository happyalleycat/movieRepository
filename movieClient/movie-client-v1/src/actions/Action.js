import api from "../api/axiosConfig";

const Actions = {
  genericGet: async function (url, ...functions) {
    await api.get(url).then((resp) => {
      functions.forEach((fn) => {
        fn(resp);
      });
    });
  },
  getMovieData: async (movieId, setMovie, setReviews) => {
    await Actions.genericGet(`/api/v1/movies/${movieId}`, (resp) => {
      setMovie(resp.data);
      setReviews(resp.data.reviews);
    });
  },
  getMovies: async (setMovies) => {
    await Actions.genericGet("/api/v1/movies", (resp) => {
      setMovies(resp.data);
    });
  },
};

export default Actions;
