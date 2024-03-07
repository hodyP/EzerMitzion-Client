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


export default function VolunteerDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
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
    }, [id])
  const fetchfunc = async () => {
    try {
      const response = await axios.put(`http://localhost:3600/api/volunteer/unactive/${id}`);
      console.log(response.data);
    } catch (ex) {
      console.log(ex)
    }
  }
  return (
    <div style={{ height: 520, width: '100%' }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }} style={{ height: '100%' }}>
            <Grid container spacing={2} style={{ height: '100%' }}>
              <Grid item xs={6} md={7} style={{ height: '100%' }}>
                <Item>
                  <Volunteer_shibuz id={id} needy={data}></Volunteer_shibuz>
                </Item>
              </Grid>
              <Grid item xs={6} md={5} style={{ height: '100%' }}>
                <Item>
                  <Person fontSize="large" color="secondary" />
                  <Typography>{data.first_name + ' ' + data.last_name}</Typography>
                  <Typography>{data.identity_number}</Typography>
                  <Typography>{data.mail}</Typography>
                  <Typography>{data.phone}</Typography>
                  <Divider></Divider>
                  <div>
                    <Typography>{"עיר" + " " + data.city}</Typography>
                    <Typography>{"שכונה" + " " + data.neighborhood}</Typography>
                    <Typography>{"רחוב" + " " + data.street}</Typography>
                  </div>
                  <AlertDialogSlide
                    title={"הגדרת מתנדברת כלא פעילה"}
                    buttonContent={"העברה לארכיון"}
                    alertContent={"פעולה זאת תעביר את המתנדבת לארכיון והיא תוגדר כלא פעילה, האם את בטוחה בפעולה זו?"}
                    id={id}
                    fetchfunc={fetchfunc}
                  ></AlertDialogSlide>
                  <Button>ערוך שינויים</Button>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </>)}
    </div>

  );
}