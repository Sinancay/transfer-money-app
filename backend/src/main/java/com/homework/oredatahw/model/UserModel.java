package com.homework.oredatahw.model;

import lombok.*;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usermodel")
public class UserModel  {
    @Id
    @UuidGenerator
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String username;
    private String password;
    private String email;
    private LocalDateTime createdat;
    private LocalDateTime updatedat;

    public void setId(UUID id) {this.id = id;}
    public UUID getId() {return id;}
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public LocalDateTime getCreatedat() { return createdat; }
    public void setCreatedat(LocalDateTime createdat) { this.createdat = createdat; }
    public LocalDateTime getUpdatedat() { return updatedat; }
    public void setUpdatedat(LocalDateTime updatedat) { this.updatedat = updatedat; }


}

