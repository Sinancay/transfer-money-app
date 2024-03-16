import React, { useContext, useEffect } from 'react'
import {Grid, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import DataGridComponent from '../components/DataGridComponent';
import AuthContext from '../context/auth-context';
import { GetColumns, AccountModel } from '../models/TransactionModel';
import { ApiFunction } from '../helpers/ApiFunction';
import moment from 'moment';

function TransactionsPage() {
  const [rowData, setRowData] = React.useState<[]>([]);
  const [columns, setColumnsData] = React.useState<any>([]);
  const [selectedAccount, setSelectedAccount] = React.useState<any>([]);
  const [accounts, setAccounts] = React.useState<AccountModel[]>([]);
  const { loginComplete } = useContext(AuthContext); 

useEffect(() => {
    if(columns.length === 0){
      const temp =  GetColumns();
      setColumnsData(temp);
    }
    var token = localStorage.getItem('token');
     var username = localStorage.getItem('username');
   if(token !== null && username !== null){
      loginComplete(token, username);
    }
        getAccounts();
  }, []);
 
    async function getAccounts() {
      const response = await ApiFunction("accounts/accountByFilters", {accountName: "", accountNumber :""}, "post", false);
        if(response?.status === 200){
            var tempModel = response.data;
            tempModel.map(async (x: any) => {
                x.updatedat = x.updatedat && x.updatedat !== "" ? moment(x.updatedat).format('DD-MM-YYYY').toString() : x.updatedat;
                x.createdat = x.createdat && x.createdat !== "" ? moment(x.createdat).format('DD-MM-YYYY').toString() : x.createdat;
             });
          setAccounts(response.data);
      }
  }
  async function callAccountTransaction(params: any) {
    const response = await ApiFunction(`transactions/account/${params}`, {}, "get", false);
        if(response?.status === 200){
            var tempModel = response.data;
            tempModel.map(async (x: any) => {
                x.transactiondate = x.transactiondate && x.transactiondate !== "" ? moment(x.transactiondate).format('DD-MM-YYYY').toString() : x.transactiondate;
             });
          setRowData(response.data);
      }
  }

    async function handleChange(param: any) {
        setSelectedAccount(param);
        await callAccountTransaction(param);
    };


  return (
    <div>
        <Grid container spacing={2} padding={8} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
          <Grid item xs={3}> 
           <h4><strong>Transaction History</strong></h4><br></br>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Account</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedAccount}
                    label="Select Account"
                    onChange={(event: any) => handleChange(event.target.value)}
                >
                    {accounts ? accounts.map((item: any) =>{
                        return  <MenuItem value={item.id}>{item.number} - {item.name}</MenuItem>
                    }): ""}
                   
                </Select>
                </FormControl>
          </Grid>
          <Grid item xs={6}>
              
          </Grid>
          <Grid item xs={12} >
              <DataGridComponent DataColumn={columns} DataRows={rowData}  />
          </Grid>
      </Grid>
    </div>
  )
}

export default TransactionsPage