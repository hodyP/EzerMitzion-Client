import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CircularProgress from '@mui/material/CircularProgress';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';

import axios from 'axios';
import { Divider, LinearProgress } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';

export default function NestedList() {
  const [open, setOpen] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { id, city, neighborhood, type, day, partInDay } = useParams();
  console.log({ id, city, neighborhood, type, day, partInDay } )
  const hamtanafunc=async(item)=>{
    try {
      const requestId = id;   
      const response = await axios.put(`http://localhost:3600/api/needy_request/${requestId}/shibuz`, {
        id: requestId,     
        volunteerId:item.id,    
        start_date: new Date().toISOString().split('T')[0],
        is_approved: false
      });
  
      // Check if the request was successful
      if (response.ok) {
        Navigate(`/needy/${id}`);
        console.log('Server update successful');
        // Handle success, if needed
      } else {
        console.error('Failed to update on the server');
        // Handle failure, show an error message, etc.
      }
  
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error('Error updating on the server:', error);
    }
  }
const shibuzfunc=async(item)=>{
  try {
    const requestId = id;
   console.log( {id: requestId,     
    volunteerId:item.id,    
    start_date: new Date().toISOString().split('T')[0],
    is_approved: true})
    const response = await axios.put(`http://localhost:3600/api/needy_request/${requestId}/shibuz`, {
      id: requestId,     
      volunteerId:item.id,    
      start_date: new Date().toISOString().split('T')[0],
      is_approved: true
    });

    // Check if the request was successful
    if (response.ok) {
      Navigate(`/needy/${id}`);
      console.log('Server update successful');
      // Handle success, if needed
    } else {
      console.error('Failed to update on the server');
      // Handle failure, show an error message, etc.
    }

  } catch (error) {
    // Handle errors, such as network issues or server errors
    console.error('Error updating on the server:', error);
  }
}

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3600/api/needy/${id}/shibuz/${id}/${city}/${neighborhood}/${type}/${day}/${partInDay}`)
        setData(response.data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message);
        setLoading(false);
      }
    };
    fetchData();

  }
    , [id])
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{ height: 400, width: '100%', direction: 'rtl' }}>
      {loading ? (
        <LinearProgress color="primary" variant="indeterminate" />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <List
            dir='rtl'
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                התוצאות הרלוונטיות
              </ListSubheader>
            }
          >

            {
              data.map((item, index) => (
                <div key={index} style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
                        <div>{item.first_name}</div>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <div>{item.last_name}</div>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <div>{item.city}</div>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <div>{item.neighborhood}</div>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <div>{item.phone}</div>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <div>{item.mail}</div>
                        <Divider orientation="vertical" variant="middle" flexItem /> 
                        <Button  variant="contained" onClick={()=>{hamtanafunc(item)}}>המתנה</Button>
                        <Button variant="contained" onClick={()=>{shibuzfunc(item)}}>שבץ</Button>
                        
                      </div>
                    } />

                  </ListItemButton>
                  {index < data.length - 1 && <Divider />}
                </div>

              ))
            }
          </List>
        </>)}
    </div>
  );
}