package com.betulaltindis.movieService.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.betulaltindis.movieService.Bean.Movie;
import com.betulaltindis.movieService.Repository.MovieRepository;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> allMovies(){
        return movieRepository.findAll();
    }

    // public Movie getMovieById(ObjectId id) {
    //     return movieRepository.findById(id).get();
    // }

    public Movie getMovieByImdbId(String imdbId) {
        return movieRepository.findByImdbId(imdbId);
    }

    public Movie getMovieByTitle(String title) {
        return movieRepository.findByTitle(title);
    }
    
}
