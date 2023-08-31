import React from "react";
import { useState, useEffect, useCallback} from "react";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { faCircleCheck, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Urls from "../../api/Urls";
import Services from "../../api/axiosConfig";
import { Actions } from "../../actions/Action";
import "./Watchlist.css"
import { useAuth } from "../auth/AuthActions";

const Watchlist = () => {
  const [wlState, setWlState] = useState([]);
  const [movies, setMovies] = useState([]);
  const {auth} = useAuth();
  const userId =auth?.userId;
  
  useEffect(() => {
      if(userId){
        Actions.getWatchlist(userId, resp => setMovies(resp?.movies));
      }
  }, []);

  useEffect(() => {
      setWlState(movies.map(x => true));
  }, [movies]);

  const handleClick = async (i, imdbId) => {
    try {
      const userId =auth.userId;
      if(wlState[i]){
          const response = await Services.movieService.delete(
              Urls.deleteWatchlist(userId, imdbId),
              {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: false,
              });
      } else {
          const response = await Services.movieService.put(
              Urls.getWatchlist(userId), 
              { imdbId: imdbId },
              {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: false,
          });
      }
      
    } catch (error) {}
    
    wlState[i] = !wlState[i];
    setWlState(wlState);

    const plus = document.getElementById("icon-" + i + "-plus");
    const check = document.getElementById("icon-" + i + "-check");
    if (wlState[i]) {
      check.removeAttribute("hidden");
      plus.setAttribute("hidden", "hidden");
    } else {
      plus.removeAttribute("hidden");
      check.setAttribute("hidden", "hidden");
    }
};


  return (
    <div className="movie-container">
      <Grid container spacing={6} rowSpacing={4} justifyContent="flex-start"
      >
        {movies?.map((movie, i) => (
          <Grid item key={i}>
            <Paper key={movie.imdbId}>
              <div className="movie-poster" style={{ "--img": `url(${movie.poster})` }}>
                    <button id={"icon-" + i + "-check"} hidden={!wlState[i]}
                      className="watchlist-button remove" onClick={() => handleClick(i, movie.imdbId)} >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </button>
                    <button
                      id={"icon-" + i + "-plus"} hidden={wlState[i]}
                      className="watchlist-button add" onClick={() => handleClick(i, movie.imdbId)} >
                      <FontAwesomeIcon icon={faCirclePlus} />
                    </button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Watchlist;
