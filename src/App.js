import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Register from './pages/register/register';
import SignIn from "./pages/login/SignIn";
import { UserContextProvider } from "./context/userContext";
import Logout from "./pages/login/SignOut";
import ResponsiveAppBar from "./component/navbar";
import Alphone from "./pages/Alphone/Alphone";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResponsiveDrawer from "./component/drawer";
import CreateVolunteer from "./component/createVolunteer";
import CreateNeedy from "./component/createFamily";
import VolunteerDetails from "./pages/volunteer/volunteerDetails";
import NeedyDetails from "./pages/needy/needy";
import CssBaseline from '@mui/material/CssBaseline';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
      width: 12px;
      background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-track {
      background: #e0e0e0;
  }

  ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 10px;
      border: 2px solid #f1f1f1;
  }

  ::-webkit-scrollbar-thumb:hover {
      background: #555;
  }

  body {
      scrollbar-width: thin;
      scrollbar-color: #888 #e0e0e0;
  }
`;

const theme = createTheme({
  direction:"ltr",
  fontFamily:"Abraham",
  palette: {
    primary: {
      main: "#FF0909",
      // main: '#d4a8a8',
    },
    secondary: {
      main: "#FF0909",
    },
  },
  typography: {
    fontFamily: "'Rubik Light'",
  },
  
});

function App() {
  return (
    <UserContextProvider>
    <Router>
    <GlobalStyle />
  <ThemeProvider theme={theme}>
    <ResponsiveDrawer>
    </ResponsiveDrawer>
  </ThemeProvider>
</Router>
  </UserContextProvider>
  );
}
export default App;
