import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {Toolbar} from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser,UserContextProvider } from "../../context/userContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {


  const navigate = useNavigate();
  const { login } = useUser();
  const [err, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const userDetails={
      firstName: data.get('firstName'),
      lastName:data.get('lastName'),
      password: data.get('password'),
    };
    try {
      await login(userDetails);
      navigate("/Alphone");
    } catch (error) {
      setError(error.response.data?.message);
      console.log(err);     
    }
  };

  return (
    //<ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <AppBar
        position="fixed"
       
      >
        <Toolbar dir="rtl" backgroundColor="#f0e9ff">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
           // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            עזר מציון
          </Typography>
        </Toolbar>
      </AppBar>
      <br></br><br></br>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'red' }}>
            <LockOutlinedIcon sx={{backgroundcolor:"#1A2027"}}/>
          </Avatar>
          <Typography component="h1" variant="h5">
            הזדהות
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {err !== null && <Alert severity="error">{err}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="שם"
              name="firstName"
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="משפחה"
              name="lastName"
              autoComplete="lastName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="זכור אותי"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             אישור
            </Button>
            <Grid container>
             
              <Grid item>           
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
   // </ThemeProvider>
    
  );
}
