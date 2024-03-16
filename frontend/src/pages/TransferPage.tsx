import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { AccountModel } from '../models/AccountModel';
import { ApiFunction } from '../helpers/ApiFunction';
import AuthContext from '../context/auth-context';
import moment from 'moment';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { Validation } from '../helpers/Validation';
import AlertPushNotification from '../helpers/AlertPushNotification';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="₺"
      />
    );
  },
);

function TransferPage() {
  const [fromAccount, setFormAccounts] = React.useState("");
  const [toAccount, setToAccounts] = React.useState("");
  const [ownerAccounts, setOwnerAccounts] = React.useState<AccountModel[]>([]);
  const [allAccounts, setAllAccounts] = React.useState<AccountModel[]>([]);
  const [amount, setAmount] = React.useState<any>("0");
  const [enable, setEnable] = React.useState(true);
  const [alertStatus, setAlertStatus] = React.useState({status: false, success: true, message: ""}); 
  const { loginComplete } = useContext(AuthContext); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   console.log(parseFloat(event.target.value).toFixed(2))
   setAmount(event.target.value);
  };

  useEffect(() => {
    var token = localStorage.getItem('token');
     var username = localStorage.getItem('username');
   if(token !== null && username !== null){
      loginComplete(token, username);
    }
        getFromAccounts();
        getAllAccounts();
  }, []);

  useEffect(() => {
    checkFields();
  }, [fromAccount, toAccount, amount]);

  async function getFromAccounts() {
      const response = await ApiFunction("accounts/accountByFilters", {accountName: "", accountNumber :""}, "post", false);
        if(response?.status === 200){
            var tempModel = response.data;
            tempModel.map(async (x: any) => {
                x.updatedat = x.updatedat && x.updatedat !== "" ? moment(x.updatedat).format('DD-MM-YYYY').toString() : x.updatedat;
                x.createdat = x.createdat && x.createdat !== "" ? moment(x.createdat).format('DD-MM-YYYY').toString() : x.createdat;
             });
          setOwnerAccounts(response.data);
      }
  }

    async function getAllAccounts() {
      const response = await ApiFunction("accounts/allAccounts", {}, "post", false);
        if(response?.status === 200){
            var tempModel = response.data;
            tempModel.map(async (x: any) => {
                x.updatedat = x.updatedat && x.updatedat !== "" ? moment(x.updatedat).format('DD-MM-YYYY').toString() : x.updatedat;
                x.createdat = x.createdat && x.createdat !== "" ? moment(x.createdat).format('DD-MM-YYYY').toString() : x.createdat;
             });
          setAllAccounts(response.data);
      }
  }

  async function handleChangeFrom(param: any) {
    if(param === toAccount){
      setAlertStatus({status: true, success: false, message: "Sender transfer account (FROM) and recived transfer account (TO) should be different"}); 
    }else{
      setFormAccounts(param);
    }
  };

  async function handleChangeTo(param: any) {
    setToAccounts(param);
  };

  async function checkFields() {
    if (await Validation(fromAccount, "nullString") && await Validation(toAccount, "nullString")) {
        setEnable(false);
    }
  }

  async function transferMoney() {
      const response = await ApiFunction("transactions/transfer", {fromadress: fromAccount, toadress: toAccount, amount: amount}, "post", false);
        if(response?.status === 200){
            setAlertStatus({status: true, success: true, message: "Transfer operation is complete please check teransaction status from transaction history page"}); 
      }else{
        setAlertStatus({status: true, success: false, message: "Transfer is not completed"}); 
      }
  }

  return (
    <div>
      <Grid container spacing={2} padding={8} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
        <Grid item xs={4}> 
        <h4><strong>Transaction Operation</strong></h4><br></br>
          <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select From Account</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={fromAccount}
                    label="Select From Account"
                    onChange={(event: any) => handleChangeFrom(event.target.value)}
                >
                    {ownerAccounts ? ownerAccounts.map((item: any) =>{
                        return  <MenuItem value={item.id}>{item.number} - {item.name}</MenuItem>
                    }): ""}
                   
                </Select>
                </FormControl>
          </Grid>
          <Grid item xs={8}> 
          </Grid>
          <Grid item xs={4}> 
           <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select To Account</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={toAccount}
                    label="Select To Account"
                    disabled={fromAccount === ""}
                    onChange={(event: any) => handleChangeTo(event.target.value)}
                >
                    {allAccounts ? allAccounts.map((item: any) =>{
                      if(item.id !== fromAccount){
                        return  <MenuItem value={item.id}>{item.number} - {item.name}</MenuItem>
                      }
                    }): ""}
                   
                </Select>
                </FormControl>
          </Grid>
          <Grid item xs={8}>  
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" spacing={2}><TextField label="Amount" value={amount} onChange={handleChange} name="numberformat" id="formatted-numberformat-input" InputProps={{ inputComponent: NumericFormatCustom as any, }} fullWidth variant="standard"/></Stack>  
          </Grid>
          <Grid item xs={8}>  
          </Grid>
          <Grid item xs={4}> 
              <Button variant="contained" color="success" disabled={enable} onClick={() => transferMoney()}>Transfer Money</Button> 
          </Grid>
          <Grid item xs={8}>  
          </Grid>
      </Grid>
      <AlertPushNotification
        data={alertStatus}
      />
    </div>
  )
}

export default TransferPage