package com.homework.oredatahw.services;

import com.homework.oredatahw.DBoperation.AccountDBoperation;
import com.homework.oredatahw.auth.JwtService;
import com.homework.oredatahw.model.AccountCreateModel;
import com.homework.oredatahw.model.AccountFilterModel;
import com.homework.oredatahw.model.AccountModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountService {
    @Autowired
    AccountDBoperation dBoperation;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private JwtService jwtService;

    public AccountModel accountDetails(UUID id, String token) {
        UUID userid = UUID.fromString(jwtService.extractUserId(token));
        AccountModel temp = dBoperation.findById(id).orElseThrow();
        if(!temp.getUserid().equals(userid)){
            throw new IllegalArgumentException("Selected account not authorise this user");
        }else{
            return dBoperation.findById(id).orElseThrow();
        }
    }

    public List<AccountModel> getAllByUserid(UUID id) {
        return dBoperation.findAllByUserid(id);
    }

    public void createAccount(AccountCreateModel account, String token) {
        if(account.getBalance().equals(null) || account.getName().equals(null)){
            throw new IllegalArgumentException("Need require fields");
        }
        Random r = new Random();
        String numbers = Integer.toString(1000000000 + (int)(r.nextDouble() * 999999999));
        UUID userid = UUID.fromString(jwtService.extractUserId(token));
        AccountModel temp = new AccountModel();
        UUID uuid = UUID.randomUUID();
        temp.setId(uuid);
        temp.setBalance(account.getBalance());
        temp.setNumber("TR"+ numbers);
        temp.setUserid(userid);
        temp.setName(account.getName());
        temp.setCreatedat(LocalDateTime.now());
        temp.setUpdatedat(LocalDateTime.now());
        dBoperation.save(temp);
    }

    public void updateAccount(AccountModel account, UUID id, String token) {
        if(account.getBalance().equals(null) ||  account.getName().equals(null) || id.equals(null)){
            throw new IllegalArgumentException("Need require fields");
        }
        UUID userid = UUID.fromString(jwtService.extractUserId(token));
        AccountModel temp = dBoperation.getOne(id);

        if(!temp.getUserid().equals(userid)){
            throw new IllegalArgumentException("Selected account not authorise this user");
        }

        temp.setBalance(account.getBalance());
        temp.setName(account.getName());
        temp.setUpdatedat(LocalDateTime.now());
        dBoperation.save(temp);
    }

    public void deleteAccount(UUID id, String token) {
        UUID userid = UUID.fromString(jwtService.extractUserId(token));
        AccountModel temp = dBoperation.findById(id).orElseThrow();
        if(!temp.getUserid().equals(userid)){
            throw new IllegalArgumentException("Selected account not authorise this user");
        }else{
            transactionService.deleteAccountTransactions(id);
            dBoperation.delete(temp);
        }
    }

    public List<AccountModel> accountByFilters(AccountFilterModel filter, String token) {
        UUID id = UUID.fromString(jwtService.extractUserId(token));
        if(filter.getAccountNumber() == "" && filter.getAccountName() == ""){
            return dBoperation.findAllByUserid(id);
        }else if(filter.getAccountNumber() != ""){
            return dBoperation.findByNumberAndUserid(filter.getAccountNumber(), id);
        }else {
            return dBoperation.findByNameAndUserid(filter.getAccountName(), id);
        }
    }

    public void updateAccountForToTransaction(AccountModel account, UUID id) {  // I have added this method because whitout authorise update account
        if(account.getBalance().equals(null) ||  account.getName().equals(null) || id.equals(null)){
            throw new IllegalArgumentException("Need require fields");
        }
        AccountModel temp = dBoperation.getOne(id);

        temp.setBalance(account.getBalance());
        temp.setName(account.getName());
        temp.setUpdatedat(LocalDateTime.now());
        dBoperation.save(temp);
    }

    public AccountModel accountDetailsForToTransaction(UUID id) { // I have added this method because whitout authorise call account
        AccountModel temp = dBoperation.findById(id).orElseThrow();
            return dBoperation.findById(id).orElseThrow();
    }

    public List<AccountModel> getAllAccounts(){
        List<AccountModel> temp = dBoperation.findAll();
        return temp;
    }
}
