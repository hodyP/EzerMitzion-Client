// import './App.css';
import React from "react";
import Login from './pages/login/Login';
import InlaySearch from "./pages/inlay/InlaySearch";
import PageContactsNeedy from './pages/contactsNeedy/pageContactsNeedy';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import ConsumedList from "./pages/home/reminder";
import VolunteerDetails from "./pages/volunteerDetails/VolunteerDetails";
import Register from './pages/register/register';

function App() {
  return (
    <Router>
      <nav className='main-nav'>   
        <NavLink to="/homes" activeclassname="selectedLink">דף הבית</NavLink>
        <NavLink to="/inlay">שיבוץ </NavLink>
        <NavLink to="/needies">אלפון משפחות </NavLink>
        <NavLink to="/id">פרטי משפחה  </NavLink>
       
        </nav>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<ConsumedList/>} />
        <Route path="/inlay" element={<InlaySearch/>} /> 
        <Route path="/needies" element={<PageContactsNeedy />} />
        <Route path="/id" element={<VolunteerDetails />} />
      </Routes>
    </Router>
  );
}
export default App;