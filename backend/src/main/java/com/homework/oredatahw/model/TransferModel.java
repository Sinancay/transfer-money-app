package com.homework.oredatahw.model;

import java.math.BigDecimal;
import java.util.UUID;

public class TransferModel {
    private UUID fromadress;
    private UUID toadress;
    private BigDecimal amount;

    public UUID getFromadress() {
        return fromadress;
    }

    public void setFromadress(UUID fromadress) {
        this.fromadress = fromadress;
    }

    public UUID getToadress() {
        return toadress;
    }

    public void setToadress(UUID toadress) {
        this.toadress = toadress;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
