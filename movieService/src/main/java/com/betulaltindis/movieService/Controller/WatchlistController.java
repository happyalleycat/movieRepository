package com.betulaltindis.movieService.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.betulaltindis.movieService.Bean.Watchlist;
import com.betulaltindis.movieService.Service.WatchlistService;

@RestController
@CrossOrigin(origins = "*") 
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @PostMapping("/api/v1/user/{userId}/watchlist")
    public ResponseEntity<Watchlist> addToWatchlist(@PathVariable String userId, @RequestBody Map<String, String> payload){
        System.out.println("userId: " + userId +" imdbId: "+payload.get("imdbId"));
        Watchlist wl =watchlistService.addToWatchlist(userId , payload.get("imdbId"));
        if(wl ==null)
            return new ResponseEntity<Watchlist>(wl, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Watchlist>(wl, HttpStatus.OK);
    }

    
}
