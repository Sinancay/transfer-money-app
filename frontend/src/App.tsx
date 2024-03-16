import React, { useEffect, useState } from 'react';
import { styled, useTheme, Theme, CSSObject, ThemeProvider, createTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthContext from './context/auth-context';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferPage from './pages/TransferPage';
import PaidIcon from '@mui/icons-material/Paid';
import AccountPage from './pages/AccountPage';
import TransactionsPage from './pages/TransactionsPage';
import HistoryIcon from '@mui/icons-material/History';

function App() {
  const [authStatus, setAuthStatus] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

    useEffect(() => {
        var userInfo = localStorage.getItem('userInfo');
        if(userInfo !== null){
          setAuthStatus(true);
          }
      },[]);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#23bcec',
      },
    },
  });


  const loginAuth = (token: string, username: string) => {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    setAuthStatus(true);
  };

  const logout = () => {
    localStorage.clear();
    setAuthStatus(true);
    navigate('/login');
    window.location.reload();
  }

  const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, loginComplete: loginAuth }}>
        
             <Box sx={{ display: 'flex' }}>
                 <CssBaseline />
                 <ThemeProvider theme={darkTheme}>
                  {authStatus ? <div>
                    <AppBar position="fixed" open={open}>
                    <Toolbar>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                          marginRight: 5,
                          ...(open && { display: 'none' }),
                        }}
                      >
                        <MenuIcon style={{ color: 'white' }} />
                      </IconButton>
                      <Typography variant="h6" color="white" noWrap component="div">
                        Oredata Homework
                      </Typography>
                    </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" style={{ backgroundColor: "#cf6e23 !important" }}  open={open}>
                    <DrawerHeader>
                      <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                      </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                         <ListItem key="Account" disablePadding sx={{ display: 'block' }}>
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                            }}
                            onClick={() => navigate('/account')}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <AccountBalanceIcon /> 
                            </ListItemIcon>
                            <ListItemText primary="Account Management" sx={{ opacity: open ? 1 : 0 }} />
                          </ListItemButton>
                        </ListItem>
                          <ListItem key="Transfer" disablePadding sx={{ display: 'block' }}>
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                            }}
                            onClick={() => navigate('/transfer')}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <PaidIcon /> 
                            </ListItemIcon>
                            <ListItemText primary="Transfer Page" sx={{ opacity: open ? 1 : 0 }} />
                          </ListItemButton>
                        </ListItem>
                         <ListItem key="Transactions" disablePadding sx={{ display: 'block' }}>
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                            }}
                            onClick={() =>  navigate('/transaction')}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <HistoryIcon /> 
                            </ListItemIcon>
                            <ListItemText primary="Transactions History" sx={{ opacity: open ? 1 : 0 }} />
                          </ListItemButton>
                        </ListItem>
                         <ListItem key="Logout" disablePadding sx={{ display: 'block' }}>
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                            }}
                            onClick={() => logout()}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <LogoutIcon /> 
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                          </ListItemButton>
                        </ListItem>

                    </List>
                    </Drawer>
                    </div>
                  : <div></div> }
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                      <Routes>
                          <Route path="/" element={<LoginPage />}></Route>
                          <Route path="/login" element={<LoginPage />}></Route>
                          <Route path="/account" element={<AccountPage />}></Route>
                          <Route path="/transfer" element={<TransferPage />}></Route>
                          <Route path="/transaction" element={<TransactionsPage />}></Route>
                      </Routes>
                  </Box>
                  </ThemeProvider>
              </Box>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
