import React, { useContext, useEffect } from 'react'
import {Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Modal, Box } from '@mui/material';

import DataGridComponent from '../components/DataGridComponent';
import { GetColumns, AccountModel } from '../models/AccountModel';
import {ApiFunction} from '../helpers/ApiFunction';
import { Validation } from '../helpers/Validation';
import AlertPushNotification from '../helpers/AlertPushNotification';
import AuthContext from '../context/auth-context';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Stack from '@mui/material/Stack';
import moment from 'moment';


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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function AccountPage() {
  const [rowData, setRowData] = React.useState<[]>([]);
  const [columns, setColumnsData] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false); 
  const [fieldStatus, setFieldStatus] = React.useState(false); 
  const [alertStatus, setAlertStatus] = React.useState({status: false, success: true, message: ""}); 
  const [dialogStatus, setDialogStatus] = React.useState("");
  const [paramModel, setParamModel] = React.useState<any>(); 
  const { loginComplete } = useContext(AuthContext); 
  const [formAccountName, setFormAccountName] = React.useState("");
  const [formAccountBalance, setFormAccountBalance] = React.useState("0");

  let [formSearchName, setFormSearchName] = React.useState("");
  let [formSearchNumber, setFormSearchNumber] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   console.log(parseFloat(event.target.value).toFixed(2))
   setFormAccountBalance(event.target.value);
  };
  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const dialogBody = [{
    title: "create",
    dialogTitles: "Create Account",
    value:   <div><TextField autoFocus margin="dense" error={fieldStatus} id="name" label="Account Name" type="text" fullWidth variant="standard" value={formAccountName} onChange={(event: any) => setFormAccountName(event.target.value)} /> <Stack direction="row" spacing={2}><TextField label="Account Balance" value={formAccountBalance} onChange={handleChange} name="numberformat" id="formatted-numberformat-input" InputProps={{ inputComponent: NumericFormatCustom as any, }} fullWidth variant="standard"/></Stack> </div>
  },
  {
    title: "update",
    dialogTitles: "Update Account",
    value:  <div><TextField autoFocus margin="dense" error={fieldStatus} id="name" label="Account Name" type="text" fullWidth variant="standard" value={formAccountName} onChange={(event: any) => setFormAccountName(event.target.value)} /> <Stack direction="row" spacing={2}><TextField label="Account Balance" value={formAccountBalance} onChange={handleChange} name="numberformat" id="formatted-numberformat-input" InputProps={{ inputComponent: NumericFormatCustom as any, }} fullWidth variant="standard"/></Stack></div>
  },
  {
    title: "delete",
    dialogTitles: "Delete Account",
    value:  <h4>ARE YOU SURE FOR DELETE ACCOUNT ?</h4>
  }];  




  const handleOpen = (status: string, param: any) => {
    setDialogStatus(status);
    if(status === "update" || status === "delete"){
        setParamModel(param);
        setFormAccountBalance(param.balance);
        setFormAccountName(param.name);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setFormAccountBalance("0");
    setFormAccountName("");
    setOpen(false);
  }

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
      const response = await ApiFunction("accounts/accountByFilters", {accountName: formSearchName, accountNumber :formSearchNumber}, "post", false);
        if(response?.status === 200){
            var tempModel = response.data;
            tempModel.map(async (x: any) => {
                x.updatedat = x.updatedat && x.updatedat !== "" ? moment(x.updatedat).format('DD-MM-YYYY').toString() : x.updatedat;
                x.createdat = x.createdat && x.createdat !== "" ? moment(x.createdat).format('DD-MM-YYYY').toString() : x.createdat;
             });
          setRowData(response.data);
      }
  }

    async function getAccountDetails(params: any) {
      const response = await ApiFunction(`accounts/viewAccountDetails/${params}`, {}, "get", false);
        if(response?.status === 200){
           var tempModel = response.data;    
           tempModel.updatedat = tempModel.updatedat && tempModel.updatedat !== "" ? moment(tempModel.updatedat).format('DD-MM-YYYY').toString() : tempModel.updatedat;
           tempModel.createdat = tempModel.createdat && tempModel.createdat !== "" ? moment(tempModel.createdat).format('DD-MM-YYYY').toString() : tempModel.createdat;
          setOpenModal(true);
          setParamModel(tempModel);
      }
  }

  async function createAccount() {
        var response = await ApiFunction("accounts",{ name: formAccountName, balance: formAccountBalance }, "post", false);
        response?.status === 200 ? setAlertStatus({status: true, success: true, message: "Account Successfully Create"}) : setAlertStatus({status: true, success: false, message: "Account Create Error"})
        getAccounts();
        setFormAccountBalance("0");
        setFormAccountName("");
        setOpen(false);
  }

  async function updateAccount(model: AccountModel ) {
    if(model.name !== "" && model.id.toString() !== ""){
        var response = await ApiFunction(`accounts/${model.id}`, model , "put", false);
        response?.status === 200 ? setAlertStatus({status: true, success: true, message: "Account Successfully Update"}) : setAlertStatus({status: true, success: false, message: "Account Update Error"})
        getAccounts();
        setFormAccountBalance("0");
        setFormAccountName("");
        setOpen(false);
    }   
  }

  async function deleteAccount(model: AccountModel ) {
    if(model.id.toString() !== ""){
        var response = await ApiFunction(`accounts/${model.id}`,  model, "delete", false);
        response?.status === 200 ? setAlertStatus({status: true, success: true, message: "Account Successfully Delete"}) : setAlertStatus({status: true, success: false, message: "Account Not Delete"})
        getAccounts();
        setFormAccountBalance("0");
        setFormAccountName("");
        setOpen(false);
    }   
  }


async function checkIsValidAndHttpOperation(){
  if (await Validation(formAccountName, "nullString") && await Validation(formAccountBalance, "nullString")) {
    if(dialogStatus === "create"){
        createAccount();
    }else if(dialogStatus === "update"){
        paramModel.name = formAccountName 
        paramModel.balance = formAccountBalance;
        paramModel.updatedat = "";
        paramModel.createdat = "";
         updateAccount(paramModel);
    }else if(dialogStatus === "delete"){
        deleteAccount(paramModel);
    }
  }else{
    setFieldStatus(true);
  }
}

function resetFilters() {
    formSearchName = "";
    formSearchNumber = "";
    setFormSearchName("");
    setFormSearchNumber("");
    getAccounts();
}



  return (
    <div style={{ padding: 65 }}>
      <h4><strong>Account Management</strong></h4><br></br>
      <h5><strong>Filter Panel</strong></h5><Divider /><br></br>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
        <Grid item xs={4}> 
                <TextField id="outlined-basic" label="Account Name" value={formSearchName} disabled={formSearchNumber !== ""} onChange={(event: any) => setFormSearchName(event.target.value)} variant="outlined" />
          </Grid>
          <Grid item xs={4}> 
                <TextField id="outlined-basic" label="Account Number" variant="outlined" disabled={formSearchName !== ""} value={formSearchNumber} onChange={(event: any) => setFormSearchNumber(event.target.value)}/>
          </Grid>
          <Grid item xs={2}> 
                <Button variant="contained" style={{ color: "white" }} disabled={formSearchName === "" && formSearchNumber === ""} onClick={() => getAccounts()}>Filter Account</Button>
          </Grid>
          <Grid item xs={2}>   <Button variant="contained" style={{ color: "white" }} disabled={formSearchName !== "" && formSearchNumber !== ""} onClick={() => resetFilters()}>Filter Reset</Button>
          </Grid>
      </Grid><br></br><Divider /><br></br>
     <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
          <Grid item xs={6}> 
                <Button variant="contained" style={{ color: "white" }} onClick={()=>handleOpen("create", null)}>Create Account</Button>
          </Grid>
          <Grid item xs={6}>
              
          </Grid>
          <Grid item xs={12} >
              <DataGridComponent DataColumn={columns} DataRows={rowData} UpdateFunction={(param: any) => handleOpen("update", param)} DeleteFunction={(param: any) => handleOpen("delete", param)} CustomComponent={(param: any) => getAccountDetails(param.id)} />
          </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogBody.length > 0 && dialogStatus !== "" ? dialogBody.filter((i:any) => i.title === dialogStatus)[0].dialogTitles : ""}</DialogTitle>
        <DialogContent style={{ minWidth: 500 }}>
            {dialogBody.length > 0 && dialogStatus !== "" ? dialogBody.filter((i:any) => i.title === dialogStatus)[0].value : ""}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" style={{ color: "white" }} onClick={checkIsValidAndHttpOperation} >Save</Button>
          <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Account Details</h2>
            <h5><strong>Account Name :</strong> {paramModel ? paramModel.name : ""}</h5>
            <h5><strong>Account Number :</strong> {paramModel ? paramModel.number : ""}</h5>
            <h5><strong>Account Balance :</strong> {paramModel ? paramModel.balance : ""}</h5>
            <Button variant="contained" color="error" onClick={handleCloseModal}>Cancel</Button>
          </Box>
        </Modal>
      <AlertPushNotification
        data={alertStatus}
      />
    </div>
  )
}

export default AccountPage
