

CREATE TABLE usermodel (
  ID UUID PRIMARY KEY NOT NULL,
  Username VARCHAR(250),
  Password VARCHAR(250),
  Email VARCHAR(250),
  CreatedAt timestamp,
  UpdatedAt timestamp
);

CREATE TABLE accountmodel ( 
  ID UUID PRIMARY KEY NOT NULL,
  Number VARCHAR(250),
  Name VARCHAR(250),
  UserId UUID NOT NULL,
  Balance numeric,
  CreatedAt timestamp,
  UpdatedAt timestamp
);


CREATE TABLE transactionmodel ( 
  ID bigint PRIMARY KEY NOT NULL,
  fromadress UUID NOT NULL,
  toadress UUID NOT NULL,
  Amount numeric,
  TransactionDate timestamp,
  Status VARCHAR(250)
);

ALTER TABLE accountmodel
ADD CONSTRAINT FK_UserId FOREIGN KEY (UserId)
REFERENCES usermodel (ID);

ALTER TABLE transactionmodel
ADD CONSTRAINT FK_FromId FOREIGN KEY (fromadress)
REFERENCES accountmodel (ID);

ALTER TABLE transactionmodel
ADD CONSTRAINT FK_ToId FOREIGN KEY (toadress)
REFERENCES accountmodel (ID);

