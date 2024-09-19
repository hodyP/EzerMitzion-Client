import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Divider from '@mui/material/Divider'
import Person from '@mui/icons-material/Person';
import { Button, Typography } from '@mui/material';
import AlertDialogSlide from '../../component/alert';
import Volunteer_shibuz from './volunteer_shibuz';
import Dialog from '@mui/material/Dialog';
import CreateVolunteer from '../../component/createVolunteer';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';
import Needy_requests from '../needy/needy_requests';
import {Chip} from '@mui/material';

export default function VolunteerDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [openVolunteer, setOpenVolunteer] = React.useState(false);
  const [key, setKey] = React.useState(0); 

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '460px',
  }));
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3600/api/volunteer/${id}`);
          response.data.transformedVolunteer.date_of_birth=calculateYearsSince(response.data.transformedVolunteer.date_of_birth);
          setData(response.data.transformedVolunteer);
          setLoading(false);
          setError(null);
          console.log(response.data.transformedVolunteer);

        } catch (err) {

          setError(err.response?.data?.message);
          setLoading(false);
        }
      };
      fetchData();
      console.log(data);
    }, [id,key])
  const fetchfunc = async () => {
    try {
      const response = await axios.put(`http://localhost:3600/api/volunteer/unactive/${id}`);
      console.log(response.data);
    } catch (ex) {
      console.log(ex)
    }
  }
  const handleClose = () => {
    setOpenVolunteer(false);
    console.log("tbh hear")
  };

  const edited=()=>{
    setOpenVolunteer(true);
    console.log(data);
  }

  function calculateYearsSince(dateString) {
    const today = new Date();
    const inputDate = new Date(dateString); 
  
    let years = today.getFullYear() - inputDate.getFullYear();
    const monthDifference = today.getMonth() - inputDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < inputDate.getDate())) {
      years--;
    }
    return years;
  }

  function success(){
    setKey(prevKey => prevKey + 1)
  }

  return (
    <div key={key} style={{ height: 520, width: '100%' }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>         
<Box sx={{ width: '100%', direction: 'rtl', flexGrow: 1 ,}}>
            <Grid container  style={{ height: '100%' }}>
            <Grid item xs={12} sm={4.5} >
            <Box sx={{ p: 7, height: '100vh '  }}>
            <Grid   container  alignItems="center"   direction="rtl">
            <Grid item > 
            <Avatar 
        sx={{ 
          border: '1px solid black', 
          bgcolor: 'transparent',
          width: 50, 
          height: 50,
          marginLeft: 3
        }}
      >     
            <PersonIcon sx={{ fontSize: 40,color:"black" }} />
            </Avatar>
            <span>מתנדבת</span>
        </Grid>
        <Grid item>
          <Typography variant="h5" fontWeight="bold">
          {data.first_name + ' ' + data.last_name}
          </Typography>
          
            {data.volunteer_details.map((a) => {
              console.log(a);
              return(
              <Chip sx={{m:1,backgroundColor: 'lightgray',  
                color: 'black',               
                border: 'none',  }}label={a.name} color="primary" variant="outlined" />)
            })}
          
        
        </Grid>      
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }} alignItems="center" marginBottom={3}>
        <Grid item>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
        sx={{ 
          border: '2px solid #A9A9A9', 
          bgcolor: '#f0f0f0',
          width: 35, 
          height: 35,
          marginLeft: 1
        }}
      >     
            <PhoneIcon sx={{  color:"#A9A9A9"}} /> 
          </Avatar>{data.phone}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
        sx={{ 
          border: '2px solid #A9A9A9', 
          bgcolor: '#f0f0f0',
          width: 35, 
          height: 35,
          marginLeft: 1
        }}
      >     
            <EmailIcon sx={{ color:"#A9A9A9"}} /> 
            </Avatar>{data.mail}
          </Typography>
        </Grid>
      </Grid>
      
      <Divider></Divider>
              
      <Grid container spacing={2} sx={{ mt: 2 }}>
        
        <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary"> עיר</Typography>
            <Typography variant="body1" fontWeight="bold">{data.city}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary"> שכונה</Typography>
            <Typography variant="body1" fontWeight="bold">{data.neighborhood}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary"> רחוב </Typography>
            <Typography variant="body1" fontWeight="bold">{data.street}</Typography>
        </Grid>
       
        <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">  גיל</Typography>
            <Typography variant="body1" fontWeight="bold">{data.date_of_birth}</Typography>
        </Grid>
       
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, width: '100%'}}  >
          <AlertDialogSlide
            title={"הגדרת מתנדברת כלא פעילה"}
            buttonContent={"העברה לארכיון"}
            alertContent={"פעולה זאת תעביר את המתנדבת לארכיון והיא תוגדר כלא פעילה, האם את בטוחה בפעולה זו?"}
            id={id}
          ></AlertDialogSlide>
          <Button sx={{m:3}} onClick={edited} variant="outlined">ערוך </Button>
          </Box>
      </Box>
      </Grid>
      <Grid item xs={12} sm={7.5} style={{ height: '100vh ' ,p:3,backgroundColor: '#F4F6FA'}} >            
             {/* <Needy_requests  createRequestfunc={createRequestfunc} id={id} ask={"needy"} needy={data}></Needy_requests>  */}
        </Grid>
        </Grid>
          </Box>
          <Dialog key="dialog1" open={openVolunteer} onClose={handleClose} >
          <CreateVolunteer onClose={handleClose} success={success} existingData={data} edited={true}></CreateVolunteer > </Dialog>
        </>)}
    </div>
  );
}