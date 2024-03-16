package com.homework.oredatahw.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transactionmodel")
public class TransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private UUID fromadress;
    private UUID toadress;
    private BigDecimal amount;
    private LocalDateTime transactiondate;
    @Enumerated(EnumType.STRING)
    private Status status;
    public enum Status { SUCCESS, FAILED; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public UUID getFrom() { return fromadress; }
    public void setFrom(UUID from) { this.fromadress = from; }
    public UUID getTo() { return toadress; }
    public void setTo(UUID to) { this.toadress = to; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public LocalDateTime getTransactiondate() { return transactiondate; }
    public void setTransactiondate(LocalDateTime transactiondate) { this.transactiondate = transactiondate; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
