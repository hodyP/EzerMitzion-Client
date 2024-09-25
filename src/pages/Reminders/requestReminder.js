import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import NeedyReminder from './needy_reminder';
import { Phone } from '@mui/icons-material';
import ShibuzReminder from './shibuzReminder';

function RequestReminder() {
    const [shibuzRemindDate, setShibuzRemindDatee] = useState([]);

    useEffect(() => {
         fetchShibuz();
        }, []);

    const fetchShibuz = async () => {
        console.log("אני בקריאה לשרת")
        try {
            const response = await fetch('http://localhost:3600/api/needy_request');
            if (!response.ok) {
            throw new Error('Failed to fetch neediesData');
            }
            const shibuzData = await response.json();
            setShibuzRemindDatee(shibuzData);
        } catch (error) {
            console.error('Error fetching neediesData:', error);
        }
        };
     
    const onSibuz =async(id) =>{
        await makeShibuz(id);
        fetchShibuz();
    }

    const onCancel =async(id) =>{
        await cancelSibuz(id);
        fetchShibuz();
    }

    const makeShibuz = async (id) => {
        
        const data={
            start_date:new Date(),
            is_approved:true
        }
        try 
        {
            const res = await fetch(`http://localhost:3600/api/needy_request/${id}/shibuz`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        } catch (error) {
            console.error('An error occurred:', error); 
        }  
    };

    const cancelSibuz = async (id) => {
        try 
        {
            const res = await fetch(`http://localhost:3600/api/needy_request/${id}/shibuz`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        } catch (error) {
            console.error('An error occurred:', error);    
        }  
    };
     
    return (
      <>
        <Box >
        {shibuzRemindDate.length > 0?
        (<Box >
            {shibuzRemindDate.map((item) => (
                <ShibuzReminder key={item.id} data={item} onSibuz={onSibuz} onCancel={onCancel}/>
            ))}
          </Box>):

          (<div dir='rtl'>
            אין שיבצים שלא אושרו
          </div>
        )} 
          </Box>
        
        </>
      );
    }
    
    export default RequestReminder;