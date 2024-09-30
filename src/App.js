import React from "react";
import { UserContextProvider } from "./context/userContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResponsiveDrawer from "./component/drawer";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import SignIn from "./pages/login/SignIn";
import Alphone from "./pages/Alphone/Alphone";

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

// const isAuthenticated = () => {
//   // בדוק אם יש ערך ב-localStorage שמצביע על חיבור המשתמש
//   return !!localStorage.getItem('userToken');
// };

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

function App() {
  return (
    <Router>
      <UserContextProvider>
    <GlobalStyle />
      <ThemeProvider theme={theme}>
    <ResponsiveDrawer>
    </ResponsiveDrawer>
  </ThemeProvider>
  </UserContextProvider> 
</Router>

  );
}
export default App;
