import React from 'react';

const authContext = React.createContext({ status: false, loginComplete: (token: string, username: string) => {}, logoutFunc: () => {} });

export default authContext;
