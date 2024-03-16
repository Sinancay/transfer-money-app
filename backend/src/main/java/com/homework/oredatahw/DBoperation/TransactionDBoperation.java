package com.homework.oredatahw.DBoperation;

import com.homework.oredatahw.model.TransactionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionDBoperation extends JpaRepository<TransactionModel, Long> {
    List<TransactionModel> findAllByFromadress(UUID id);
    List<TransactionModel> findAllByToadress(UUID id);
}
