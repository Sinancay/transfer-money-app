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
@Table(name = "accountmodel")
public class AccountModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String number;
    private String name;
    private UUID userid;
    private BigDecimal balance;
    private LocalDateTime createdat;
    private LocalDateTime updatedat;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getNumber() { return number; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name;}
    public void setNumber(String number) { this.number = number; }
    public UUID getUserid() {  return userid; }
    public void setUserid(UUID userid) { this.userid = userid; }
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
    public LocalDateTime getCreatedat() { return createdat; }
    public void setCreatedat(LocalDateTime createdat) { this.createdat = createdat; }
    public LocalDateTime getUpdatedat() { return updatedat; }
    public void setUpdatedat(LocalDateTime updatedat) { this.updatedat = updatedat; }
}
