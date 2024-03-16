package com.homework.oredatahw.controller;

import com.homework.oredatahw.model.AccountCreateModel;
import com.homework.oredatahw.model.AccountFilterModel;
import com.homework.oredatahw.model.AccountModel;
import com.homework.oredatahw.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;


    @RestController
    @CrossOrigin(allowedHeaders = {"GET", "POST", "DELETE", "PUT"})
    @RequestMapping("api/accounts")
    public class AccountController {

        @Autowired
        AccountService service;
        @CrossOrigin
        @PostMapping
        public void createAccount(@RequestBody AccountCreateModel model, @RequestHeader (name="Authorization") String token) { service.createAccount(model, token.substring(7, token.length())); }
        @CrossOrigin
        @PostMapping("/accountByFilters")
        public List<AccountModel> accountByFilters(@RequestBody AccountFilterModel filters, @RequestHeader (name="Authorization") String token) { return service.accountByFilters(filters, token.substring(7, token.length())); }
        @CrossOrigin
        @PutMapping("/{id}")
        public void updateAccount(@RequestBody AccountModel model, @PathVariable UUID id, @RequestHeader (name="Authorization") String token) { service.updateAccount(model, id, token.substring(7, token.length())); }

        @DeleteMapping("/{id}")
        public void deleteAccount(@PathVariable UUID id, @RequestHeader (name="Authorization") String token) {
            service.deleteAccount(id, token.substring(7, token.length()));
        }
        @CrossOrigin
        @GetMapping("/viewAccountDetails/{id}")
        public AccountModel accountDetails(@PathVariable UUID id, @RequestHeader (name="Authorization") String token) { return service.accountDetails(id, token.substring(7, token.length())); }
        @CrossOrigin
        @PostMapping("/allAccounts")
        public List<AccountModel> allAccounts() { return service.getAllAccounts(); }

    }

