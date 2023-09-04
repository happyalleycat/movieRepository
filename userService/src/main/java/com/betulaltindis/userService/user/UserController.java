package com.betulaltindis.userService.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public Boolean isUserExist(@PathVariable String id){
        return userService.isUserExist(Integer.parseInt(id));
    }
}
