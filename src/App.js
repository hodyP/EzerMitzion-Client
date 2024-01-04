// import './App.css';
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

const theme = createTheme({
  direction:"rtl",
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
  }
});
function App() {
  return (
    <UserContextProvider>
    <Router>
    <ThemeProvider theme={theme}>
        <ResponsiveAppBar/>
        {/* <ResponsiveDrawer/> */}
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/Alphone" element={<Alphone/>}/>
        <Route path="/volunteer/add" element={<CreateVolunteer/>}/>
        <Route path="/needy/add" element={<CreateNeedy/>}/>
        <Route path="/volunteer/:id" element={<VolunteerDetails/>}></Route>
        <Route path="/needy/:id" element={<NeedyDetails ></NeedyDetails>}></Route>
        

      </Routes>
      </ThemeProvider>
    </Router>
    </UserContextProvider>
  );
}
export default App;