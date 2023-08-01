package com.betulaltindis.movieService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.betulaltindis.movieService.Bean.Movie;
import com.betulaltindis.movieService.Service.MovieService;

@RestController
@RequestMapping("/api/v1/movies")
@CrossOrigin(origins = "*") 
public class MovieController {


    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> allMovies(){
        return new ResponseEntity<List<Movie>>(movieService.allMovies(),HttpStatus.OK);
    }

    // @GetMapping("/id={id}")
    // public ResponseEntity<Movie> getMovieById(@PathVariable ObjectId id){
    //     return new ResponseEntity<Movie>(movieService.getMovieById(id), HttpStatus.OK);
    // }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieByImdbId(@PathVariable String id){
        return new ResponseEntity<Movie>(movieService.getMovieByImdbId(id), HttpStatus.OK);
    }

    @GetMapping("/title={title}")
    public ResponseEntity<Movie> getMovieByTitle(@PathVariable String title){
        return new ResponseEntity<Movie>(movieService.getMovieByTitle(title), HttpStatus.OK);
    }
    
}
