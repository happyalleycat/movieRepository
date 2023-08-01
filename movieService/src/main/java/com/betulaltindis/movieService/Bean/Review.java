package com.betulaltindis.movieService.Bean;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    private ObjectId id;
    private String body;

    // @DocumentReference
    // @ReadOnlyProperty
    // private Movie movie;

    public Review(String body) {
        this.body = body;
    }
    
}
