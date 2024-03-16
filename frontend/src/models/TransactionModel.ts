import moment from "moment";
export class AccountModel
 {
    id: string;
    from: string;
    to: string;
    amount: string;
    transactiondate: Date;
    status: string;
 
    constructor(id: string, from: string, to: string, 
        amount: string, status: string, transactiondate: Date) {
      this.id = id;
      this.from = from;
      this.to = to;
      this.amount = amount;
      this.status = status;
      this.transactiondate = transactiondate;
    }
}

export interface Column {
    id: 'id' | 'from' | 'to' | 'amount' | 'status' | 'transactiondate';
    label: string;
    minWidth?: number;
    align?: 'left';  
    format?: (value: number) => string;
  }
  export function GetColumns()  {
    var columns: Column[] = [
        { id: 'id', label: 'ID', minWidth: 80 },
        { id: 'from', label: 'From Account ID', minWidth: 80 },
        { id: 'to', label: 'To Account ID', minWidth: 80 },
        { id: 'amount', label: 'Amount', minWidth: 80 },
        { id: 'status', label: 'Transaction Status', minWidth: 80 },
        {
          id: 'transactiondate',
          label: 'Transaction Date',
          minWidth: 80,
          align: 'left',
          format: (value: number) => moment(value).format("DD/MM/YYYY"),
        }
      ];
      return columns;
  }
 