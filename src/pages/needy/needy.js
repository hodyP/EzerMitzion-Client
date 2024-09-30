import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Person from '@mui/icons-material/Person';
import { Button, Typography, Divider, Box, Grid, Paper ,IconButton, Chip} from '@mui/material';
import AlertDialogSlide from '../../component/alert';
import Needy_requests from './needy_requests';
import Dialog from '@mui/material/Dialog';
import CreateNeedy from '../../component/createFamily';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';


export default function NeedyDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openNeedy, setOpenNeedy] = React.useState(false);
  const [key, setKey] = React.useState(0); 


  const { id } = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: "460px"
  }));
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3600/api/needy/${id}`);
          setData(response.data.needy);
          setLoading(false);
          setError(null);
          console.log(response.data.needy);
        } catch (err) {

          setError(err.response?.data?.message);
          setLoading(false);
        }
      };
      fetchData();
      console.log(data);
    }, [id,key])

    axios.defaults.baseURL = 'http://localhost:3600/api';
 
    const createRequestfunc = async (day, time, type,id=null) => {
      if(id)
      {
        try {
          const req = await axios.put(`/needy_request/${id}`, {
            day: day,
            type_of_volunteerId: type,
            part_in_dayId:time,
          });
          console.log(req.data);
        } catch (err) {
          console.error(err);
          setError(err.response?.data?.message);
        }     
        return;
      }
      console.log("הגעתי לפונקציה המעצבנת"+day+" "+time+" "+type+" "+id)
      try {
        const req = await axios.post('/needy_request', {
          day: day,
          type_of_volunteerId: type,
          part_in_dayId:time,
          needyId:data.id
        });
        console.log(req.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message);
      }     
    }

    const handleClose = () => {
      setOpenNeedy(false);
      console.log("tbh hear")
    };

    const edited=()=>{
      console.log(data);
      setOpenNeedy(true);
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
            <span>משפחה</span>
        </Grid>
        <Grid item>
          <Typography variant="h5" fontWeight="bold">
          {data.first_name + ' ' + data.last_name}
          </Typography>
          <Typography variant="body" color="textSecondary">
          {data.last_time_updated}
          </Typography><br></br>
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
            <Typography variant="body1" fontWeight="bold">{data.cityAndneedy.name}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary"> שכונה</Typography>
            <Typography variant="body1" fontWeight="bold">{data.neighborhood}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary"> רחוב </Typography>
            <Typography variant="body1" fontWeight="bold">{data.street}</Typography>
        </Grid>
        {data.phone_2?(
        <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary"> טלפון 2</Typography>
            <Typography variant="body1" fontWeight="bold">{data.phone_2}</Typography>
        </Grid>):<></>}
        {data.description?(
       <Box sx={{ mt: 2 ,  }}>
            <Typography variant="subtitle2" color="textSecondary" >הערות </Typography>
            <Typography variant="body2" xs={6} fullWidth
            sx={{border: "0.2px solid #A9A9A9",height:"50px",p:1, borderRadius: "4px",width:"250px"}}>
              {data.description}</Typography>
        </Box>):<></>}
            
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, width: '100%'}}  >
          <AlertDialogSlide variant="contained"
            title={"הגדרת משפחה כלא פעילה"}
            buttonContent={"העברה לארכיון"}
            alertContent={"פעולה זאת תעביר את המשפחה לארכיון והיא תוגדר כלא פעילה, האם את בטוחה בפעולה זו?"}
            id={id}
          ></AlertDialogSlide>
          <Button sx={{m:3,backgroundColor: '#e5e6ff',
          border: 'none', 
          color: '#000000',          
          '&:hover': {
            backgroundColor: '#c5c4ff', 
          }}} onClick={edited} >ערוך </Button>
          </Box>
      </Box>
      </Grid>
      <Grid item xs={12} sm={7.5} style={{ height: '100vh ' ,p:3,backgroundColor: '#F4F6FA'}} >            
            <Needy_requests  createRequestfunc={createRequestfunc} id={id} ask={"needy"} needy={data}></Needy_requests>
        </Grid>
        </Grid>
          </Box>
          <Dialog key="dialog1" open={openNeedy} onClose={handleClose} >
            <CreateNeedy onClose={handleClose} success={success} existingData={data} edited={true}></CreateNeedy > </Dialog>
        </>)}
    </div>
  );
}
