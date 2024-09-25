import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AlertDialogSlide from '../../component/alert';
import axios from 'axios';
import { Chip,Divider,Avatar ,Dialog} from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddTimerVolunteer from './addTimerVolunteer';

function TimerVolunteer(props) {
  const data=props.data;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    console.log("אני בסגירה")
      setOpen(false);
    props.success();
};

  return (
    <Card sx={{ minWidth: 200, mb: 1,height:230 }}>
      <CardContent>
      <Box dir="ltr"
        sx={{          
          marginBottom: '16px' 
        }}
      > 
        <Chip label="לא שובץ" sx={{ backgroundColor: '#ff9999', color: '#b22222'}} ></Chip>      
        </Box>
        <Divider sx={{ backgroundColor: '#e0e0e0' }} />
        <Box sx={{ display: 'flex', alignItems: 'center' ,direction: 'rtl'}}>
        <Box 
        sx={{       
        height: 20, 
        textAlign: 'center', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1
      }}>
        <Avatar 
        sx={{ 
          border: '1px solid #A9A9A9', 
          bgcolor: '#f0f0f0',
          width: 40, 
          height: 40,
          marginLeft: 1
        }}
      >
        <CalendarMonthIcon sx={{ color: '#A9A9A9' }}/>
        </Avatar>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2" color="textSecondary">
          יום בשבוע
        </Typography>
        <Typography variant="h8" fontWeight="bold">
         {data.day}
        </Typography>
      </Box>
    </Box>
   
    <Divider orientation="vertical" flexItem sx={{ bgcolor: '#e0e0e0' }} />
    <Box 
     sx={{ 
       
        height: 100, 
        textAlign: 'center', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1
      }}>
        <Avatar 
        sx={{ 
          border: '1px solid #A9A9A9', 
          bgcolor: '#f0f0f0',
          width: 40, 
          height: 40,
          marginLeft: 1
        }}
      >
        <AccessTimeOutlinedIcon sx={{ color: '#A9A9A9' }}/>
        </Avatar>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2" color="textSecondary">
           זמן
        </Typography>
        <Typography variant="h8" fontWeight="bold">
         {data.volunteer_timerAndpartInDay.name_time}
        </Typography>
      </Box> 
    </Box>
    <Divider orientation="vertical" flexItem sx={{ bgcolor: '#e0e0e0' }} />
    <Box sx={{ flex: '1 ', maxWidth: '33%', visibility: 'hidden' }}>
                {/* זהו האלמנט השלישי הנסתר כדי לשמור על הפריסה */}
            </Box>
            
    </Box>     
      </CardContent>
      <CardActions dir="ltr">
            <AlertDialogSlide
              title={"מחיקת בקשה"}
              buttonContent={"מחיקת בקשה"}
              alertContent={"?האם ברצונך למחוק את הבקשה"}
              id={data.id}
              //fetchfunc={deleeVolunteering}
            ></AlertDialogSlide>
            <Button sx={{backgroundColor: '#e5e6ff',
          border: 'none', 
          color: '#000000',          
          '&:hover': {
            backgroundColor: '#c5c4ff', 
          }}} onClick={handleClickOpen}
          >עידכון בקשה</Button>
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
          <AddTimerVolunteer 
          success={props.success} open={open} 
          value={{idVolunteer:data.volunteerId,day:data.day,time:data.partInDayId,timerId:data.id}}
          onClose={handleClose}>
          </AddTimerVolunteer>
      </Dialog>
    </Card>
  );
}

export default TimerVolunteer;
