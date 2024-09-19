import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Reminder from './Reminder';
import RequestReminder from './requestReminder';
import { Divider } from '@mui/material';
function IndexReminder() {
   
    return (
        <>
        <Box  display="flex" justifyContent="space-between"  flexDirection="row-reverse" sx={{ width: '100%' }}>
            <Box flex={1} 
            padding="10px" 
            maxHeight="100vh"
            overflow="auto">
                <Reminder></Reminder>
            </Box>
            <Box
             flex={1} 
             backgroundColor="#f1edff" 
             minHeight= '100vh'  
             padding="10px"
             maxHeight="100vh"
             overflow="auto">
                <h2 dir='rtl'>  מחכות לשיבוץ:</h2>
           <RequestReminder></RequestReminder>
            </Box>
        </Box>
  
        </>
      );
    }
    
    export default IndexReminder;