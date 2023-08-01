package com.betulaltindis.movieService.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.betulaltindis.movieService.Bean.Review;

public interface ReviewRepository extends MongoRepository<Review, ObjectId> {
    
}
