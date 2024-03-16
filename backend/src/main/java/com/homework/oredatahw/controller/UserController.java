package com.homework.oredatahw.controller;

import com.homework.oredatahw.auth.JwtService;
import com.homework.oredatahw.model.UserLoginModel;
import com.homework.oredatahw.model.UserModel;
import com.homework.oredatahw.model.UserRegisterModel;
import com.homework.oredatahw.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @CrossOrigin
    @PostMapping("register")
    public void registerUser(@RequestBody UserRegisterModel userinfo){ userService.addUser(userinfo); }

    @CrossOrigin
    @PostMapping("/login")
    public String login(@RequestBody UserLoginModel authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
    @CrossOrigin()
    @PostMapping("checkValidToken/{username}")
    public boolean checkValidToken(@RequestHeader (name="Authorization") String token, @PathVariable String username){
        String tokenString = token.substring(7, token.length());
        return (jwtService.validateTokenExpired(tokenString, username));
    }
}
