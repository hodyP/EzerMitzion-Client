import { useContext, useState, React } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import {Box} from "@mui/material";

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Dialog,
} from "@mui/material";

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmission = () => {
    handleLogout();
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen}sx={{width:"100%",'&:hover': {
            backgroundColor: '#d4d4d4', // צבע הרקע במצב hover
          }}}>
        <Box sx={{display:"flex",color:"black",fontSize:"27",gap:3}}>
          יציאה   <MdLogout style={{ fontSize: 27 }} />
        </Box>
        
        
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmission} autoFocus>
            logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Logout;