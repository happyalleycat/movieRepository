package com.betulaltindis.movieService.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.betulaltindis.movieService.Bean.Movie;
import com.betulaltindis.movieService.Bean.Review;
import com.betulaltindis.movieService.Repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private ReviewRepository reviewRepository;

    public Review createReview(String reviewBody, String imdbId){
        Review review = reviewRepository.save( new Review(reviewBody));

        mongoTemplate.update(Movie.class)
            .matching(Criteria.where("imdbId").is(imdbId))
            .apply(new Update().push("reviews").value(review)).first();

        return review;
    }
    
}
