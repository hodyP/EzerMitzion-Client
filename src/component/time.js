import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

function Time() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []); 

  const date = currentDate.toISOString().split('T')[0];
  const currentHour = currentDate.getHours().toString().padStart(2, '0');
  const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
  const currentTimeString = `${currentHour}:${currentMinutes}`;

  return (
    <>
      <Typography style={{ textAlign: 'center', color: 'gray' }}>{`${date} ${currentTimeString}`}</Typography>
    </>
  );
}

export default Time;
