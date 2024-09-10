import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function NeedyReminder(props) {
   
    const needy=props.needy;

    const tmpp=(Id)=>{
        const abj={id:Id};
        props.onRemove(abj);
    }
    return (
        <>
        <Box  dir="rtl" 
        sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.paper',
            p:1,
            justifyContent: 'space-between',   
            '& svg': {
              m: 1,
            },
            '& hr': {
              mx: 2,
            },
            margin:1,
    
      }}>
        
          <Link href={`/needy/${needy.id}`} sx={{color:"#10005b"}}>משפחת {needy.last_name  }  </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <span>{needy.phone}   </span>
          <Divider orientation="vertical" variant="middle" flexItem />
          <span>הפעם האחרונה <br></br>{needy.last_time_updated} </span>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Button variant="contained" sx={{backgroundColor:"#10005b"}} onClick={() =>tmpp(needy.id )}>יצרתי קשר</Button>
          
          </Box>
        </>
      );
    }
    
    export default NeedyReminder;