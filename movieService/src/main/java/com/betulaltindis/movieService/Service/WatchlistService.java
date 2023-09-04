package com.betulaltindis.movieService.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.betulaltindis.movieService.Bean.Movie;
import com.betulaltindis.movieService.Bean.Watchlist;
import com.betulaltindis.movieService.Repository.WatchlistRepository;

@Service
public class WatchlistService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    WatchlistRepository watchlistRepository;

    @Autowired
    private MovieService movieService;

    @Autowired
    private UserServiceProxy proxy;

    public Watchlist addToWatchlist(String userId, String imdbId) {
        checkUser(userId);
        Movie movie = movieService.getMovieByImdbId(imdbId);
        Watchlist wl = mongoTemplate.findById(userId, Watchlist.class);
        if (wl == null) {
            wl = new Watchlist();
            wl.setUserId(userId);
            List<Movie> movies = new ArrayList<Movie>();
            movies.add(movie);
            wl.setMovies(movies);
        } else {
            List<Movie> movies = wl.getMovies();
            if (!movies.contains(movie)) {
                movies.add(movie);
                wl.setMovies(movies);
            }
        }
        watchlistRepository.save(wl);
        return wl;
    }

    public Watchlist getWatchlist(String userId) {
        checkUser(userId);
        return mongoTemplate.findById(userId, Watchlist.class);
    }

    public Watchlist removeFromWatchlist(String userId, String imdbId) {
        checkUser(userId);
        Movie movie = movieService.getMovieByImdbId(imdbId);
        Watchlist wl = mongoTemplate.findById(userId, Watchlist.class);
        if (wl == null) {
            wl = new Watchlist();
            wl.setUserId(userId);
            List<Movie> movies = new ArrayList<Movie>();
            movies.add(movie);
            wl.setMovies(movies);
        } else {
            List<Movie> movies = wl.getMovies();
            if (movies.contains(movie)) {
                movies.remove(movie);
                wl.setMovies(movies);
            }
        }
        watchlistRepository.save(wl);
        return wl;
    }

    private void checkUser(String userId){
        if(!proxy.isUserExist(userId))
            new Exception("User id doesn't exist!");
    }
}
