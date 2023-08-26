package com.betulaltindis.movieService.Bean;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "watchlist")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Watchlist {   
    @Id
    private String userId;
    
    @DocumentReference
    private List<Movie> movies;
    
}
