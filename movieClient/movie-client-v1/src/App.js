import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import { Actions } from "./actions/Action";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import { RequireAuth, IsLoggedIn } from "./components/auth/AuthActions";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    Actions.getMovies(setMovies);
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                movie={movie}
                setMovie={setMovie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
