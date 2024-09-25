import React from 'react'
import NestedList from '../../component/list'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import DnsIcon from '@mui/icons-material/Dns';
import TodayIcon from '@mui/icons-material/Today';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useParams } from 'react-router-dom'; 

function Shibuz(props) {
  const {id,city,neighborhood,type,day,partInDay } = useParams();
  return (

    <div>
      <Box dir="rtl" sx={{ width: '1000px' ,p:3}}>
        <Grid container sx={{ color: 'text.primary' }}>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
             <LocationCityIcon /><Typography>{city}</Typography>
           
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <MapsHomeWorkIcon /><Typography>{neighborhood}</Typography>
            
          </Grid>    
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
           <DnsIcon /> <Typography>{type}</Typography>
            
          </Grid>  
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
             <TodayIcon /> <Typography>{day}</Typography>
          
          </Grid>  
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon /><Typography>{partInDay}</Typography>
            
          </Grid>  

        </Grid>
        <NestedList></NestedList>
      </Box>
    </div>
  )
}

export default Shibuz