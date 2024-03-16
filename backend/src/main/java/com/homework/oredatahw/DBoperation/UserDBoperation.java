package com.homework.oredatahw.DBoperation;

import com.homework.oredatahw.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserDBoperation extends JpaRepository <UserModel, UUID> {
    Optional<UserModel> findByUsername(String username);
}
