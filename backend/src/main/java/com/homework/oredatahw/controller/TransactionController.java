package com.homework.oredatahw.controller;

import com.homework.oredatahw.DBoperation.TransactionDBoperation;
import com.homework.oredatahw.model.AccountModel;
import com.homework.oredatahw.model.TransactionModel;
import com.homework.oredatahw.model.TransferModel;
import com.homework.oredatahw.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(allowedHeaders = {"GET", "POST"})
@RequestMapping("api/transactions")
public class TransactionController {

    @Autowired
    TransactionService service;
    @CrossOrigin
    @PostMapping("/transfer")
    public List<AccountModel> transferMoney(@RequestBody TransferModel transaction, @RequestHeader (name="Authorization") String token) {
        return service.transferMoney(transaction,  token.substring(7, token.length()));
    }
    @CrossOrigin
    @GetMapping("/account/{id}")
    public List<TransactionModel> getTransactionDetail(@PathVariable UUID id, @RequestHeader (name="Authorization") String token) {
        return service.getTransactionDetails(id, token.substring(7, token.length()));
    }

}
