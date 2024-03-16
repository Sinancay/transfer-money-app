import {  Snackbar } from '@mui/material';
import React, { useEffect } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Props {
  data: {
    status: boolean, 
    success: boolean, 
    message: string
    }
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertPushNotification({data}: Props) {
const [alertStatus, setAlertStatus] = React.useState({status: false, success: true, message: ""}); 

  useEffect(() => {
    setAlertStatus({status: data.status, success: data.success, message: data.message});
  },[data]);

  function handleCloseBar(){
   setAlertStatus({status: false, success: true, message: ""});
  }

  return (
    <div> 
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={alertStatus.status}
        onClose={() => handleCloseBar()}
        autoHideDuration={2000}
      >
       <Alert onClose={handleCloseBar} severity={ alertStatus.success ===  true ? 'success' : 'error'} sx={{ width: '100%' }}>
             {alertStatus.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AlertPushNotification;