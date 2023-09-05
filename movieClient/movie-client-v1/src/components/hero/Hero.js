import React, { useState, useEffect} from "react";
import './Hero.css'
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@mui/material'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faCirclePlus, faCirclePlay} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { useAuth, isLoggedIn} from "../auth/AuthActions";
import Services from "../../api/axiosConfig";
import Urls from "../../api/Urls";
import { Actions } from "../../actions/Action";


const Hero = ({movies}) => {
    const  navigate = useNavigate();
    const [wlState, setWlState] = useState([false]);
    const [wlMovies, setWlMovies] = useState([]);
    const {auth} = useAuth();
    const userId =auth?.userId;
    const loginResult = isLoggedIn();
    
    useEffect(() => {
        if(userId){
            Actions.getWatchlist(userId, resp => setWlMovies(resp?.movies));
        } 
    }, []);

    useEffect(() => {
        setWlState(movies.map(m => wlMovies.some(x => (x.title === m.title))));
        console.log(wlState);

    }, [wlMovies]);

    const handleClick = async (i, imdbId) => {
        try {
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

    const reviews = (movieId) => {
        navigate(`/Reviews/${movieId}`);
    }

    return (
        <div className="movie-carousel-container">
            <Carousel onClick={() => setAutoplay(!autoPlay)}>
                { 
                    movies.map( (movie, i) =>{
                        return(
                            <Paper key={movie.imdbId}>
                                <div className = 'movie-card-container'>
                                    <div className = 'movie-card' style={{"--img": `url(${movie.backdrops[0]})`}}>
                                        <div className = 'movie-detail'>
                                            <div className="movie-poster">
                                                <button id={"icon-"+i+"-plus"} hidden={wlState[i] || !loginResult} className="watchlist-button add" onClick={()=>handleClick(i, movie.imdbId)}>
                                                        <FontAwesomeIcon icon={faCirclePlus}/>  
                                                </button>
                                                <button id={"icon-"+i+"-check"} hidden={!wlState[i] || !loginResult}  className="watchlist-button remove" onClick={()=>handleClick(i, movie.imdbId)}>
                                                        <FontAwesomeIcon icon={faCircleCheck}/>  
                                                </button>
                                                <img src={movie.poster} alt=""/>
                                            </div>
                                            <div className="movie-title">
                                                <h4>{movie.title}</h4>
                                            </div>
                                           <div className="movie-buttons-container">
                                                <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                    <div className="play-button-icon-container">
                                                        <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay}/>
                                                    </div>
                                                </Link>
                                                <div className="movie-review-button-container">
                                                    <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                                </div>  
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    }) 
                }
            </Carousel>
        </div>
    )
}

export default Hero