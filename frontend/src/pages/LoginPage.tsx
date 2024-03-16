import React, { useEffect, useContext } from 'react';
import { Box, Button, FormControl, Grid, Paper, Tab, TextField, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab/';
import {  styled } from '@mui/material/styles';
import { ApiFunction } from '../helpers/ApiFunction';
import { Validation } from '../helpers/Validation';
import { LoginModel } from '../models/LoginModel';
import AlertPushNotification from '../helpers/AlertPushNotification';
import { RegisterModel } from '../models/RegisterModel';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth-context';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: 150
}));
function LoginPage() {
   const [tabValue, setTabValue] = React.useState('1');
  const [username, setUserNameValue] = React.useState("");
  const [password, setPasswordValue] = React.useState("");
  const [email, setEmailValue] = React.useState("");
  const [validFields, setValidationlValue] = React.useState(false);
  const [alertStatus, setAlertStatus] = React.useState({status: false, success: true, message: ""}); 
  const { loginComplete } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
        var userInfo = localStorage.getItem('token');
        if(userInfo !== null){
            navigate("/account");
          }
      },[]);

  async function login() {
      let temp = new LoginModel(username,  password );
      const response = await ApiFunction("users/login", temp, "post", true);
        if(response?.status === 200){
          setAlertStatus({status: true, success: true, message: "Successfuly Login"}); 
          setTimeout(function(){
            loginComplete(response.data, username);
            navigate("/account");
          }, 2000);
      }else{
        setAlertStatus({status: true, success: false, message: "Login is not sucessful"}); 
      }
  }

  async function register() {
      let temp = new RegisterModel(username,  password, email );
      const response = await ApiFunction("users/register", temp, "post", true);
        if(response?.status === 200){
          setAlertStatus({status: true, success: true, message: "User Successfuly Created"}); 
          setTimeout(function(){
             window.location.reload();
          }, 2000);
      }else{
        setAlertStatus({status: true, success: false, message: "Username Already Exsist"}); 
      }
  }


  async function httpAction() {
      if(tabValue === '1'){
        if (await Validation(username, "nullString") && await Validation(password, "nullString")) {
            setValidationlValue(false);
            await login();
        }else {
            setValidationlValue(true);
        }
      }else if(tabValue === '2'){
        if (await Validation(username, "nullString") && await Validation(password, "nullString") && await Validation(email, "nullString")) {
          setValidationlValue(false);
          await register();
        }else {
          setValidationlValue(true);
        }
      }
    }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setUserNameValue("");
    setPasswordValue("");
    setEmailValue("");
    setTabValue(newValue);
  };

  return (
    <div className="App">
      <Grid container spacing={2} padding={8}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} style={{ display: 'flex', justifyContent: "center" }}>
             <Item key="elevation" elevation={12} style={{ padding: 15 }}>
                <Typography variant="h5">Oredata HomeTask</Typography><br></br>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="User Login" value="1" />
                        <Tab label="User Register" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <FormControl fullWidth>
                        <TextField id="my-input" label="User Name" variant="outlined" error={validFields} aria-describedby="my-helper-text" type='text' value={username} onChange={(event: any) => setUserNameValue(event.target.value)} /><br></br>
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField id="my-input" label="Password" type="password" variant="outlined" error={validFields} aria-describedby="my-helper-text" value={password} onChange={(event: any) => setPasswordValue(event.target.value)} /><br></br>
                      </FormControl>
                      <Button variant="contained" color="primary" style={{ color: 'white' }} onClick={httpAction}>Login</Button>
                    </TabPanel>
                    <TabPanel value="2">
                      <FormControl fullWidth>
                        <TextField id="my-input" label="User Name" variant="outlined" error={validFields} aria-describedby="my-helper-text" type='text' value={username} onChange={(event: any) => setUserNameValue(event.target.value)} /><br></br>
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField id="my-input" label="Password" type="password" variant="outlined" error={validFields} aria-describedby="my-helper-text" value={password} onChange={(event: any) => setPasswordValue(event.target.value)} /><br></br>
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField id="my-input" label="E-mail" variant="outlined" error={validFields} aria-describedby="my-helper-text" type='text' value={email} onChange={(event: any) => setEmailValue(event.target.value)} /><br></br>
                      </FormControl>
                      <Button variant="contained" color="success" onClick={httpAction}>Register</Button>
                    </TabPanel>
                  </TabContext>
                </Box><br></br>
                <Typography color="error" display={!validFields ? 'none' : 'block'}>Please Fill Required Fields</Typography>
                </Item>
          </Grid>
          <Grid item xs={4}></Grid>
      </Grid>
      <AlertPushNotification
        data={alertStatus}
      />
    </div>
  );
}

export default LoginPage