import * as React from 'react';
import { useContext,useState } from 'react';
import { UserContext } from '../context/userContext'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { List, Link } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Register from '../pages/register/register';
import SignIn from "../pages/login/SignIn";
import Logout from "../pages/login/SignOut";
import Alphone from "../pages/Alphone/Alphone";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CreateVolunteer from "../component/createVolunteer";
import CreateNeedy from "../component/createFamily";
import VolunteerDetails from "../pages/volunteer/volunteerDetails";
import NeedyDetails from "../pages/needy/needy";
import Shibuz from '../pages/shibuz/shibuz';
import Time from './time';
import Reminder from '../pages/Reminders/Reminder';
import IndexReminder from '../pages/Reminders/indexReminder';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { currentUser, login, logout, } = useContext(UserContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  
const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ backgroundColor:"#F4F6FA" ,minHeight: '100vh',display: 'flex',
      flexDirection: 'column',
        }}>
      <Toolbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh', 
          
        }}
      >
        <img
          src="/1200px-EzerMezion.svg.png"
          alt="logo"
          style={{
            width: 'auto',
            height: '100px',
          }}
        />       
      </Box >
      <Typography style={{ textAlign: 'center' ,fontWeight: 'bold' ,}} >{`${currentUser.first_name} ${currentUser.last_name}`}</Typography>

      <Time></Time>
      <Divider />
      <List dir="rtl" >
        {[{ text: 'אלפון', icon: <ContactPhoneIcon />, to: "/Alphone" },
        { text: 'אירועים זמניים', icon: <CalendarMonthIcon />, to: "/events" },
        { text: 'הוספת מנהל', icon: <PersonAddIcon />, to: "/register" },
        { text: 'עדכונים', icon: <NotificationsActiveIcon />, to: "/Updates" }
        ].map((obj, index) => (
          <ListItem  key={obj.text} disablePadding>
            <ListItemButton component={Link} to={obj.to}>
              <ListItemIcon>
                {obj.icon}
              </ListItemIcon>
              <ListItemText style={{ textAlign: 'center' }} primary={obj.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
 <br></br>
     
     
      <List style={{ textAlign: 'center' ,fontWeight: 'bold' }} sx={{
        position: 'absolute',
        bottom: 3,
        width: '100%',       
        padding: '10px'
      }}>
        {["יציאה"].map((text, index) => (
          // <ListItem key={text} disablePadding>
          //   <ListItemButton component={Link} to="/logout">
          //     <ListItemIcon>
               // <LogoutIcon /> 
                  <Logout/>
          //     </ListItemIcon>
          //     <ListItemText primary={text} />
          //   </ListItemButton>
          // </ListItem> 
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    user?(
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mr: { sm: `${drawerWidth}px` },
            
        }}
      >
        <Toolbar dir="rtl" backgroundColor="#f0e9ff">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            עזר מציון
          </Typography>
        </Toolbar>
      </AppBar>
     
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        anchor='right'
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        anchor='right'
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
     
      <Box
        dir="ltr"
        component="main"
        sx={{         
          marginLeft: 0,
          marginRight: 50,
          marginTop: 6,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          // הוספת סגנון ישירות לאלמנט
          "& > div": {
            marginLeft: 0,
            marginRight: drawerWidth,
          },
          
        }}
      >

        <Routes>
          <Route path="/" element={<Alphone />} />
          {/* <Route path="/login" element={<SignIn />} /> */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Alphone" element={<Alphone />} />
          <Route path="/volunteer/add" element={<CreateVolunteer />} />
          <Route path="/needy/add" element={<CreateNeedy />} />
          <Route path="/volunteer/:id" element={<VolunteerDetails />} />
          <Route path="/needy/:id" element={<NeedyDetails />} />
          <Route path="/Updates" element={<IndexReminder />} />
          <Route path="/needy/:id/shibuz/:id/:city/:neighborhood/:type/:day/:partInDay" element={<Shibuz />}/>
        </Routes>
      </Box>
    </Box>
     ):(<Routes><Route path="/" element={<SignIn />} /></Routes>)
  );
}

ResponsiveDrawer.propTypes = {
 
  window: PropTypes.func,
};

export default ResponsiveDrawer;