// import './App.css';
import React from "react";
//import Login from './pages/login/Login';
//import InlaySearch from "./pages/inlay/InlaySearch";
//import PageContactsNeedy from './pages/contactsNeedy/pageContactsNeedy';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// import ConsumedList from "./pages/home/reminder";
// import VolunteerDetails from "./pages/volunteerDetails/VolunteerDetails";
import Register from './pages/register/register';
import SignIn from "./pages/login/SignIn";
import { UserContextProvider } from "./context/userContext";
import Logout from "./pages/login/SignOut";
import ResponsiveAppBar from "./component/navbar";
//import AddNewVolunteerForm from "./pages/volunteer/addNewVolunteer";
import Alphone from "./pages/Alphone/Alphone";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResponsiveDrawer from "./component/drawer";
import CreateVolunteer from "./component/createVolunteer";

const theme = createTheme({
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
    fontFamily: '"Handlee", cursive',
  },
});
function App() {
  return (
    <UserContextProvider>
    <Router>
    <ThemeProvider theme={theme}>
        {/* <ResponsiveAppBar/> */}
        <ResponsiveDrawer/>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/register" element={<Register/>} />
        {/* <Route path="/home" element={<ConsumedList/>} /> */}
        <Route path="/Alphone" element={<Alphone/>}/>
        {/* <Route path="/volunteer" element={<AddNewVolunteerForm/>} /> */}
        <Route path="/volunteer/add" element={<CreateVolunteer/>}/>
        {/* <Route path="/inlay" element={<InlaySearch/>} /> 
        <Route path="/needies" element={<PageContactsNeedy />} />
        <Route path="/id" element={<VolunteerDetails />} /> */}

      </Routes>
      </ThemeProvider>
    </Router>
    </UserContextProvider>
  );
}
export default App;