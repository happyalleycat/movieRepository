import React from 'react'

const Urls = {
  register: `/api/v1/auth/register`,
  login: `/api/v1/auth/authenticate`,
  movies: "/api/v1/movies",
  movie: (movieId) => `${Urls.movies}/${movieId}`,
  getWatchlist: (userId) => `/api/v1/user/${userId}/watchlist`,
  deleteWatchlist: (userId, imdbId) => `/api/v1/user/${userId}/watchlist/${imdbId}`
}

export default Urls