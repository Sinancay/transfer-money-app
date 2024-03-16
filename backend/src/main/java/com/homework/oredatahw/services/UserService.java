package com.homework.oredatahw.services;

import com.homework.oredatahw.DBoperation.UserDBoperation;
import com.homework.oredatahw.auth.JwtService;
import com.homework.oredatahw.auth.UserInfoDetails;
import com.homework.oredatahw.dbo.UserRequest;
import com.homework.oredatahw.dbo.UserResponse;
import com.homework.oredatahw.model.UserModel;
import com.homework.oredatahw.model.UserRegisterModel;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
        @Autowired
        UserDBoperation dBoperation;
        @Autowired
        private PasswordEncoder encoder;

        public UUID returnUserId (String userName){
            return dBoperation.findByUsername(userName).orElseThrow().getId();
        }

        public void addUser(UserRegisterModel userinfo) {
            if(userinfo.getEmail().equals(null) || userinfo.getUsername().equals(null) || userinfo.getPassword().equals(null)){
                throw new IllegalArgumentException("Need require fields");
            }
            if(dBoperation.findByUsername(userinfo.getUsername()).isPresent()){
                throw new IllegalArgumentException("Same Username already exsist");
            }
            UserModel temp = new UserModel();
            UUID uuid = UUID.randomUUID();
            temp.setId(uuid);
            temp.setUsername(userinfo.getUsername());
            temp.setPassword(encoder.encode(userinfo.getPassword()));
            temp.setEmail(userinfo.getEmail());
            temp.setCreatedat(LocalDateTime.now());
            temp.setUpdatedat(LocalDateTime.now());
            dBoperation.save(temp);
        }

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            Optional<UserModel> userDetail = dBoperation.findByUsername(username);
            return userDetail.map(UserInfoDetails::new)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
        }
}
