package com.homework.oredatahw.DBoperation;

import com.homework.oredatahw.model.AccountModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AccountDBoperation extends JpaRepository <AccountModel, UUID> {

    List<AccountModel> findByNumberAndUserid(String number, UUID id);

    List<AccountModel> findByNameAndUserid(String name, UUID id);

    List<AccountModel> findAllByUserid(UUID id);

}
