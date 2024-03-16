package com.homework.oredatahw.services;

import com.homework.oredatahw.DBoperation.TransactionDBoperation;
import com.homework.oredatahw.auth.JwtService;
import com.homework.oredatahw.model.AccountModel;
import com.homework.oredatahw.model.TransactionModel;
import com.homework.oredatahw.model.TransferModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    @Autowired
    TransactionDBoperation dBoperation;
    @Autowired
    AccountService accountService;
    @Autowired
    private JwtService jwtService;

    @Async
    public List<AccountModel> transferMoney(TransferModel transaction, String token) {
            UUID userid = UUID.fromString(jwtService.extractUserId(token));
            if(!validateFields(transaction, token)) { return accountService.getAllByUserid(userid); }
            TransactionModel temp = new TransactionModel();
            long x = 1234567L;
            long y = 23456789L;
            Random r = new Random();
            long number = x + ((long) (r.nextDouble() * (y - x))); // for transaction id generated
            try {
                if(!(accountService.accountDetails(transaction.getFromadress(), token).getBalance().compareTo(transaction.getAmount()) == 1)){ // From balance higher than amount validation
                    throw new IllegalArgumentException("Account balance lower than amount");
                }
                AccountModel fromModel = accountService.accountDetails(transaction.getFromadress(), token);
                AccountModel toModel = accountService.accountDetailsForToTransaction(transaction.getToadress());
                fromModel.setBalance(fromModel.getBalance().subtract(transaction.getAmount()));
                accountService.updateAccount(fromModel, fromModel.getId(), token);
                toModel.setBalance(toModel.getBalance().add(transaction.getAmount()));
                accountService.updateAccountForToTransaction(toModel, toModel.getId());
            } catch (Exception e) {
                temp.setId(number);
                temp.setAmount(transaction.getAmount());
                temp.setFrom(transaction.getFromadress());
                temp.setTo(transaction.getToadress());
                temp.setStatus(TransactionModel.Status.FAILED);
                temp.setTransactiondate(LocalDateTime.now());
                dBoperation.save(temp);
                return accountService.getAllByUserid(userid);
            }


            temp.setId(number);
            temp.setAmount(transaction.getAmount());
            temp.setFrom(transaction.getFromadress());
            temp.setTo(transaction.getToadress());
            temp.setStatus(TransactionModel.Status.SUCCESS);
            temp.setTransactiondate(LocalDateTime.now());
            dBoperation.save(temp);
            return accountService.getAllByUserid(userid);

    }

    public boolean validateFields (TransferModel transaction, String token){
        if(transaction.getFromadress().equals(null) || accountService.accountDetails(transaction.getFromadress(), token).equals(null) || // null or valid account UUID
                transaction.getToadress().equals(null) || accountService.accountDetailsForToTransaction(transaction.getToadress()).equals(null) || // null or valid account UUID
                transaction.getAmount().equals(null) || (transaction.getFromadress().equals(transaction.getToadress()))){ // same account check
            throw new IllegalArgumentException("Need require fields or same account ");
        }
        return true;
    }

    public List<TransactionModel> getTransactionDetails(UUID id, String token){
        UUID userid = UUID.fromString(jwtService.extractUserId(token));
        AccountModel temp = accountService.accountDetails(id, token);
        if(!temp.getUserid().equals(userid)){
            throw new IllegalArgumentException("Selected account is not authorise"); //from account validation authorise
        }else{
            List<TransactionModel> fromTransactions = dBoperation.findAllByFromadress(id);
            List<TransactionModel> toTransactions = dBoperation.findAllByToadress(id);
            for (int i = 0; i < toTransactions.size(); i++) {
                fromTransactions.add(toTransactions.get(i));
            }
            return fromTransactions;
        }
    }

    public void deleteAccountTransactions (UUID accountid){
        List<TransactionModel> fromTransactions = dBoperation.findAllByFromadress(accountid);
        List<TransactionModel> toTransactions = dBoperation.findAllByToadress(accountid);
        for (int i = 0; i < toTransactions.size(); i++) {
            fromTransactions.add(toTransactions.get(i));
        }
        for (int i = 0; i < fromTransactions.size(); i++) {
            dBoperation.deleteById(fromTransactions.get(i).getId());
        }
    }

}
