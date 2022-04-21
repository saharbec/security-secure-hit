import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import config from '../config';

export default function Nav() {
  const history = useHistory();

  const [authStatus, setAuthStatus] = useState(false);
  const [flag, setFlag] = useState(false);

  const getHeaders = useCallback(() => {
    return {
      'x-access-token': localStorage.getItem('token'),
    };
  }, []);

  useEffect(() => {
    if (getHeaders()['x-access-token']) {
      Axios.get(config.serverUrl + '/authentication_status', {
        headers: getHeaders(),
      })
        .then((response) => {
          setAuthStatus(true);
        })
        .catch((error) => {
          setAuthStatus(false);
        });
    } else {
      setAuthStatus(false);
    }
  }, [flag, getHeaders]);

  const navArray = [
    {
      title: 'register',
      function: () => {
        setFlag(!flag);
        history.push('/register');
      },
      authenticationRequired: false,
    },

    {
      title: 'Change Password',
      function: () => {
        setFlag(!flag);
        history.push('/changepass');
      },
      authenticationRequired: true,
    },
    {
      title: 'Login',
      function: () => {
        setFlag(!flag);
        history.push('/Login');
      },
      authenticationRequired: false,
    },

    {
      title: 'Dashboard',
      function: () => {
        setFlag(!flag);
        history.push('/dashboard');
      },
      authenticationRequired: true,
    },

    {
      title: 'Forgot Password',
      function: () => {
        setFlag(!flag);
        history.push('/forgotpass');
      },
      authenticationRequired: false,
    },

    {
      title: 'Log out',
      function: () => {
        setFlag(!flag);
        localStorage.removeItem('token');
        history.push('/Login');
      },
      authenticationRequired: true,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {navArray.map((item) => {
            return (
              item.authenticationRequired === authStatus && (
                <Typography key={item.title} m={2} t={3} variant="h6" component="div">
                  <Button onClick={item.function} color="inherit">
                    {item.title}
                  </Button>
                </Typography>
              )
            );
          })}
          <Typography sx={{ ml: 'auto', fontWeight: 'bold' }}>Secured</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
