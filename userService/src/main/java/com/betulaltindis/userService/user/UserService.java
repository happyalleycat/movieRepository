package com.betulaltindis.userService.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Boolean isUserExist(Integer id) {
        return userRepository.findById(id).isPresent();
    }
    
}
