import React from 'react';
import { Box, Typography, Button, Chip,Divider, Avatar ,Grid} from '@mui/material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import Link from '@mui/material/Link';


const ShibuzReminder = (props) => {
    const requ=props.data;

  return (
    <>
    <Box 
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#f9f9f9',
        margin: "20px",
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '16px' 
        }}
      >
        <Box>
          <Chip label={requ.needy_requestsAndtype_of_volunteer.name} />
        </Box>
          <Link href={`/needy/${requ.needy_requestsAndneedy.id}`} sx={{ textAlign: 'right', fontSize: '14px', fontWeight: 'bold',color: '#3f51b5',textDecoration: 'underline'}}> 
           {requ.needy_requestsAndneedy.first_name} {requ.needy_requestsAndneedy.last_name}
           </Link>
      </Box>
     <Divider sx={{ marginBottom: '16px', backgroundColor: '#e0e0e0' }} />
     
{/* ********************************************התיבה הגדולה *************************************** */}
    
     <Box sx={{ display: 'flex', alignItems: 'center' ,direction: 'rtl'}}>
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
        border: '2px solid #A9A9A9', 
        bgcolor: '#f0f0f0',
          width: 40, 
          height: 40,
          marginLeft: 1
        }}
      >
        <EventAvailableOutlinedIcon sx={{ color: '#A9A9A9',   }}/>
        </Avatar>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2" color="textSecondary">
          יום בשבוע
        </Typography>
        <Typography variant="h8" fontWeight="bold">
          {requ.day}
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
          border: '2px solid #A9A9A9', 
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
         {requ.needy_requestsAndpart_in_dayId.name_time}
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
          border: '2px solid #A9A9A9', 
          bgcolor: '#f0f0f0',
          width: 40, 
          height: 40,
          marginLeft: 1
        }}
      >
        <PersonOutlineIcon sx={{ color: '#A9A9A9' }}/>
        </Avatar>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2" color="textSecondary">
         מתנדבת
        </Typography>
        <Typography variant="h8" fontWeight="bold">
         {requ.needy_requestsAndvolunteer.first_name} {requ.needy_requestsAndvolunteer.last_name}
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
          border: '2px solid #A9A9A9', 
          bgcolor: '#f0f0f0',
          width: 40, 
          height: 40,
          marginLeft: 1
        }}
      >
        <PhoneEnabledOutlinedIcon sx={{ color: '#A9A9A9' }}/>
        </Avatar>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2" color="textSecondary">
          פאלפון
        </Typography>
        <Typography variant="h8" fontWeight="bold">
          {requ.needy_requestsAndvolunteer.phone}
        </Typography>
      </Box>
     
    </Box>
    
  
    </Box>
      <Button style={{   }} variant="outlined" onClick={() =>props.onCancel(requ.id)} >
        בטל התאמה זו
      </Button>
       <Button style={{ marginLeft: '5px', }} variant="outlined" marginLeft="10" onClick={() =>props.onSibuz(requ.id)}>
        שבץ מתנדבת
      </Button>

    </Box>
    </>
  );
}

export default ShibuzReminder;
