import moment from "moment";
export class AccountModel
 {
    id: string;
    number: string;
    name: string;
    userid: string;
    balance: string;
    createdat: Date;
    updatedat: Date;
 
    constructor(id: string, number: string, name: string, 
        userid: string, balance: string, createdat: Date, updatedat: Date) {
      this.id = id;
      this.number = number;
      this.name = name;
      this.userid = userid;
      this.balance = balance;
      this.createdat = createdat;
      this.updatedat = updatedat;
    }
}

export interface Column {
    id: 'id' | 'number' | 'name' | 'balance' | 'createdat' | 'updatedat';
    label: string;
    minWidth?: number;
    align?: 'left';  
    format?: (value: number) => string;
  }
  export function GetColumns()  {
    var columns: Column[] = [
        { id: 'id', label: 'ID', minWidth: 80 },
        { id: 'number', label: 'Account Number', minWidth: 80 },
        { id: 'name', label: 'Account Name', minWidth: 80 },
        { id: 'balance', label: 'Account Balance', minWidth: 80 },
        {
          id: 'createdat',
          label: 'Created Date',
          minWidth: 80,
          align: 'left',
          format: (value: number) => moment(value).format("DD/MM/YYYY"),
        },
        {
          id: 'updatedat',
          label: 'Updated Date',
          minWidth: 80,
          align: 'left',
          format: (value: number) => moment(value).format("DD/MM/YYYY"),
        }
      ];
      return columns;
  }
 