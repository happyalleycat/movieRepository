package com.betulaltindis.movieService.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.betulaltindis.movieService.Bean.Review;
import com.betulaltindis.movieService.Service.ReviewService;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "*") 
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody") , payload.get("imdbId")), HttpStatus.CREATED);
    }


    // @GetMapping("/{id}")
    // public ResponseEntity<List<Review>> getReviewsofMovie(@PathVariable String id){
    //     return new ResponseEntity<List<Review>>(reviewService.getReviewsofMovie(id), HttpStatus.OK);
    // }
    
    
}
