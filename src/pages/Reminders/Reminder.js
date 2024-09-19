import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import NeedyReminder from './needy_reminder';
import { Phone } from '@mui/icons-material';

function Reminder() {
    const [needyRemindDate, setNeedyRemindDate] = useState([]);

    useEffect(() => {
          fetchNeedy();
        }, []);

    const fetchNeedy = async () => {
        console.log("אני בקריאה לשרת")
        try {
            const response = await fetch('http://localhost:3600/api/needy/followUp');
            if (!response.ok) {
            throw new Error('Failed to fetch neediesData');
            }
            const neediesData = await response.json();
            setNeedyRemindDate(neediesData);
        } catch (error) {
            console.error('Error fetching neediesData:', error);
        }
        };
     
    const handleRemove =async(id) =>{
        await lastUpdateDate(id);
        fetchNeedy();
    }

    const lastUpdateDate = async (id) => {
        const today = new Date();
        try 
        {
            const res = await fetch('http://localhost:3600/api/needy/followUp', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        });

        } catch (error) {
            console.error('An error occurred:', error);
          
        }  
    };
       
     
    return (
        <>
        <Box >
        {needyRemindDate.length > 0?
        (<Box >
            
            <h2 dir='rtl'>צריך ליצור קשר:</h2>
            {needyRemindDate.map((item) => (
                <NeedyReminder key={item.id} needy={item} onRemove={handleRemove} />
            ))}
          </Box>):

          (<div dir='rtl'>
            הידד! כבר התקשרת לכל המשפחות
          </div>
        )} 
          </Box>
        </>
      );
    }
    
    export default Reminder;