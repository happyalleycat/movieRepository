package com.betulaltindis.movieService.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.betulaltindis.movieService.Bean.Movie;

public interface MovieRepository extends MongoRepository<Movie, ObjectId>{

    Movie findByImdbId(String imdbId);
    Movie findByTitle(String title);
    
}
