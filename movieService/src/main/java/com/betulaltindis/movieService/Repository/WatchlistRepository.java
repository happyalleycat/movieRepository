package com.betulaltindis.movieService.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.betulaltindis.movieService.Bean.Watchlist;

public interface WatchlistRepository extends MongoRepository<Watchlist, String>  {
    
}
