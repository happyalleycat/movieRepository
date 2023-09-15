package com.betulaltindis.movieService.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.betulaltindis.movieService.Bean.Watchlist;
import com.betulaltindis.movieService.Service.WatchlistService;

@RestController
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @PutMapping("/api/v1/user/{userId}/watchlist")
    public ResponseEntity<Watchlist> addToWatchlist(@PathVariable String userId, @RequestBody Map<String, String> payload){
        Watchlist wl =watchlistService.addToWatchlist(userId , payload.get("imdbId"));
        if(wl ==null)
            return new ResponseEntity<Watchlist>(wl, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Watchlist>(wl, HttpStatus.OK);
    }

    @DeleteMapping("/api/v1/user/{userId}/watchlist/{imdbId}")
    public ResponseEntity<Watchlist> removeFromWatchlist(@PathVariable String userId, @PathVariable String imdbId){
        Watchlist wl =watchlistService.removeFromWatchlist(userId , imdbId);
        if(wl ==null)
            return new ResponseEntity<Watchlist>(wl, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Watchlist>(wl, HttpStatus.OK);
    }

    @GetMapping("/api/v1/user/{userId}/watchlist")
    public ResponseEntity<Watchlist> getWatchlist(@PathVariable String userId){
        Watchlist wl =watchlistService.getWatchlist(userId);
        if(wl ==null)
            return new ResponseEntity<Watchlist>(wl, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Watchlist>(wl, HttpStatus.OK);
    }

    
}
