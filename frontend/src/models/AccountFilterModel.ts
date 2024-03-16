export class AccountModelModel
 {
    accountNumber: String = "";
    accountName: String = "";
 
    constructor(accountName: String, accountNumber: String) {
      this.accountName = accountName;
      this.accountNumber = accountNumber;
    }
}