package com.betulaltindis.movieService.Service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="user-service")
public interface UserServiceProxy {

    @GetMapping("/api/v1/user/{id}")
    public Boolean isUserExist(@PathVariable String id);
    
}
