import React, { useState, useEffect } from 'react';
import { Box,Button,MenuItem,Select,InputLabel,FormControl,Typography } from '@mui/material';
import axios from 'axios';

function AddTimerVolunteer(props) {
    const value=props.value||{};
    const daysOptions = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']
    const timeOptions = [
        { id: 1, label: 'בוקר' },
        { id: 2, label: 'צהריים' },
        { id: 3, label: 'ערב' }
    ];
    const [selectedDay, setSelectedDay] = useState(value.day || '');
    const [selectedTime, setSelectedTime] = useState(value.time || '');

    axios.defaults.baseURL = 'http://localhost:3600/api';
    const handleSave = async() => {
        
        if(value.timerId){
            try {
                const req = await axios.put(`/volunteer_timer/${value.timerId}`, {
                    day: selectedDay,                 
                    partInDayId:selectedTime,
                    volunteerId:value.idVolunteer
                });
                console.log(req.data);
                props.success();
              } catch (err) {
                console.error(err);               
              }     
        }else{
            try {
                const req = await axios.post('/volunteer_timer', {
                  day: selectedDay,                 
                  partInDayId:selectedTime,
                  volunteerId:value.idVolunteer
                });
                console.log(req.data);
                props.success();
                
              } catch (err) {
                console.error(err);        
              }     props.onClose();
        }
    };
  return (
    <Box sx={{ display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',    
        justifyContent: 'center',
        p:3,
        width:"400px"}}>
      <Typography variant="h5"> זמני התנדבות </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 2 ,width: '100%',justifyContent: 'center',}} >
        <FormControl fullWidth variant="standard">
    <InputLabel >בחר יום</InputLabel>
    <Select  
         value={selectedDay} 
         onChange={(e) => setSelectedDay(e.target.value)} 
         label="בחר יום " 
    >
        {daysOptions.map((day) => (
            <MenuItem key={day} value={day}>
                {day}
            </MenuItem>
        ))}
    </Select>
</FormControl>

{/* בחירת זמן */}
<FormControl fullWidth variant="standard">
    <InputLabel >בחר זמן</InputLabel>
    <Select value={selectedTime} 
    onChange={(e) => setSelectedTime(e.target.value)} 
    label="בחר זמן "     
    >
        {timeOptions.map((time) => (
            <MenuItem key={time.id} value={time.id}>
                {time.label}
            </MenuItem>
        ))}
        </Select>
        </FormControl>
        <Box sx={{display: 'flex',justifyContent: 'center',}}>
        <Button variant="text" onClick={handleSave}>
             אישור
        </Button>
        <Button variant="text" onClick={()=>{console.log(value.day+"huuuuuuuuuuuuo")
            props.onClose()}}>
            ביטול 
        </Button>
        </Box>
        </Box>
    </Box>
  );
}

export default AddTimerVolunteer;
