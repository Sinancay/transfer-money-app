package com.homework.oredatahw.auth;

import com.homework.oredatahw.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtService {

    @Autowired
    UserService usrService;

    public static final String SECRET = "test";
    private static final String AUTHORITIES_KEY = "roles";
    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName);
    }

    private String createToken(Map<String, Object> claims, String userName) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + (1000*60*30));
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuer(usrService.returnUserId(userName).toString())
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token,  Claims::getSubject);
    }
    public String extractUserId(String token) {
        return extractClaim(token,  Claims::getIssuer);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Boolean validateTokenExpired(String token, String username) {
        final String usernametoken = extractUsername(token);
        return (!isTokenExpired(token) && usernametoken.equals(username));
    }

}
