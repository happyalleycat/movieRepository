import React from 'react'

const Urls = {
  movies: "/api/v1/movies",
  movie: (movieId) => `${Urls.movies}/${movieId}`,
  register: "/api/v1/auth/register",
  login: "/api/v1/auth/authenticate"
}

export default Urls