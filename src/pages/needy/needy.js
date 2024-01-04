import Paper from '@mui/material/Paper';
import React, { useEffect ,useState} from 'react'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Divider from '@mui/material/Divider'
import Person from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import AlertDialogSlide from '../../component/alert';
import Needy_requests from './needy_requests';
import Typography from '@mui/material/Typography';

export default function NeedyDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: '100%',
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
    }, [id])
  return (
    <div style={{ height: 520, width: '100%' }}>
    {loading ? (
<p>Loading...</p>
) : error ? (
<p>Error: {error}</p>
) : (
<>
    <Box sx={{ flexGrow: 1 }} style={{  width: '100%', direction: 'rtl' }}>
      <Grid container spacing={2} style={{ height: '100%' }}>
        
        <Grid item xs={6} md={5} style={{ height: '100%' }}>
          <Item>
          <Person fontSize="large" color="secondary" />
                 <Typography variant="h5" component="div">{data.first_name+ ' '+ data.last_name}</Typography>
                  <Typography>{data.identity_number}</Typography>
                  <Typography>{data.mail}</Typography>
                  <Typography>{data.phone}</Typography>
                  <Typography>{data.last_time_updated}</Typography>
                  <Divider></Divider>
                 <div>
                  <Typography>{"עיר"+" "+data.cityAndneedy.name}</Typography>
                  <Typography>{"שכונה"+" "+data.neighborhood}</Typography>
                  <Typography>{"רחוב"+" "+data.street}</Typography>
                  <div style={{ height: '60px' }}>{data.description}</div>
                 </div>
                 <AlertDialogSlide 
                 title={"הגדרת מתנדברת כלא פעילה"}
                 buttonContent={"העברה לארכיון"} 
                 alertContent={"פעולה זאת תעביר את המתנדבת לארכיון והיא תוגדר כלא פעילה, האם את בטוחה בפעולה זו?"} 
                 id={id}
                 ></AlertDialogSlide>
                 <Button>ערוך שינויים</Button>
          </Item>
        </Grid>
        <Grid item xs={6} md={7} style={{ height: '100%' }}>
       <Paper>
       <Needy_requests id={id}></Needy_requests>
       </Paper>
        </Grid>
      </Grid>
    </Box>
    </>)}
    </div>
  
  );
}