import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AlertDialogSlide from '../../component/alert';
import axios from 'axios';
import { Chip,Divider,Avatar } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Face3Icon from '@mui/icons-material/Face3';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreateRequest from '../../component/createRequest';
const apiUrl = "http://localhost:3600";

export default function RequestCard(props) {
  const [open, setOpen] = React.useState(false);

  const {
    id,
    needy_requestsAndvolunteer = {},
    day = "",
    needy_requestsAndpart_in_dayId = {},
    needy_requestsAndtype_of_volunteer = {},
    volunteerId,
    needyId,
    end_date,
    start_date,
    is_approved,
    needy_requestsAndneedy = {} } = props.needyRequest || {};
  const { first_name = "", last_name = "" } = needy_requestsAndvolunteer || needy_requestsAndneedy;
  const { name_time = "" ,part_in_dayId=id} = needy_requestsAndpart_in_dayId;
  const { name } = needy_requestsAndtype_of_volunteer;
  const fullName = (props.ask === "needy") ? (`${first_name} ${last_name}`) : (`משפחת ${needy_requestsAndneedy.last_name}`);
  const type = name;
  const partInDay = name_time;
  const neighborhood = props?.needy ? props.needy.neighborhood : "";
  const city = props.needy?.cityAndneedy?.name || "";
  
  const cancleVolunteering = async () => {
    try {
      const res = await axios.patch(`${apiUrl}/api/needy_request/${id}`)
      props.success();
    }
    catch (ex) {
      console.log(ex);
    }
  }

  const deleeVolunteering = async () => {
    try {
      const res = await axios.delete(`${apiUrl}/api/needy_request/${id}`)
      props.success();
    }
    catch (ex) {
      console.log(ex);
    }
  }
  const updateVolunteering = async () => {
    try {
      const res = await axios.patch(`${apiUrl}/api/needy_request/${id}`)
    }
    catch (ex) {
      console.log(ex);
    }
  }

  const makeShibuz = async (id) => {
    const updateData={
        start_date:new Date(),
        is_approved:true
    }
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
    props.success();
    } catch (error) {
        console.error('An error occurred:', error); 
    }  
};
const handleClickOpen = () => {
  console.log(props.needyRequest);
  setOpen(true);
};

const handleClose = () => {
  props.success();
  setOpen(false);
};
  return (
    <Card sx={{ minWidth: 200, mb: 1,height:230 }}>
      <CardContent>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '16px' 
        }}
      >
      <Typography variant="body2">
      {start_date && (
          `תאריך התחלה ${start_date}`)}
        </Typography>
        {end_date && (
          <Typography variant="body2"> 
            {`תאריך סיום ${end_date}`}
          </Typography>
        )}
        <Box sx={{display: 'flex',}}>
          <Box sx={{ml:1}}>
            <Chip  label={name} />
          </Box>  
          <Box>
            {volunteerId? (
        is_approved? (
          <Chip label="שובץ" sx={{ backgroundColor: '#d0f0c0', color: '#006400'}} ></Chip>
        ) :  (
          <Chip label="בהמתנה" sx={{ backgroundColor: '#ffcc80', color: '#e65100'}} > </Chip>
        ) 
      ) : (
        <Chip label="לא שובץ" sx={{ backgroundColor: '#ff9999', color: '#b22222'}} ></Chip>
      )}   
          </Box>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: '#e0e0e0' }} />
        <Box sx={{ display: 'flex', alignItems: 'center' ,direction: 'rtl'}}>
        <Box 
     sx={{       
        height: 20, 
        textAlign: 'center', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1
      }}>
        <Avatar 
        sx={{ 
          border: '1px solid #A9A9A9', 
          bgcolor: '#f0f0f0',
          width: 40, 
          height: 40,
          marginLeft: 1
        }}
      >
        <CalendarMonthIcon sx={{ color: '#A9A9A9' }}/>
        </Avatar>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2" color="textSecondary">
          יום בשבוע
        </Typography>
        <Typography variant="h8" fontWeight="bold">
         {day}
        </Typography>
      </Box>
    </Box>
   
    <Divider orientation="vertical" flexItem sx={{ bgcolor: '#e0e0e0' }} />
    <Box 
     sx={{ 
       
        height: 100, 
        textAlign: 'center', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1
      }}>
        <Avatar 
        sx={{ 
          border: '1px solid #A9A9A9', 
          bgcolor: '#f0f0f0',
          width: 40, 
          height: 40,
          marginLeft: 1
        }}
      >
        <AccessTimeOutlinedIcon sx={{ color: '#A9A9A9' }}/>
        </Avatar>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2" color="textSecondary">
           זמן
        </Typography>
        <Typography variant="h8" fontWeight="bold">
         {name_time}
        </Typography>
      </Box> 
    </Box>
    <Divider orientation="vertical" flexItem sx={{ bgcolor: '#e0e0e0' }} />
    <Box 
     sx={{ 
        height: 100, 
        textAlign: 'center', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1
      }}>
        <Avatar 
        sx={{ 
          border: '1px solid #A9A9A9', 
          bgcolor: '#f0f0f0',
          width: 40, 
          height: 40,
          marginLeft: 1
        }}
      >
        <PersonOutlineIcon sx={{ color: '#A9A9A9' }}/>
        </Avatar>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2" color="textSecondary">
           מתנדבת
        </Typography>
        <Typography variant="h8" fontWeight="bold">
        {(volunteerId) ? (is_approved?(<Link href={props.ask === "needy" ? `/volunteer/${volunteerId}` : `/needy/${needyId}`} >
            {fullName}
          </Link>):
          (<Link href={props.ask === "needy" ? `/volunteer/${volunteerId}` : `/needy/${needyId}`} 
         
          >
        {fullName}
            </Link>)) : 
          (<Link href={props.ask === "needy" ? `/needy/${needyId}/shibuz/${id}/${city}/${neighborhood}/${type}/${day}/${partInDay}` : null} >
            לשיבוץ
            </Link>)}

        </Typography>
      </Box>   
    </Box>
    </Box>     
      </CardContent>
      <CardActions dir="ltr">
        {(volunteerId && is_approved && !end_date) ?
          (<AlertDialogSlide
            title={"ביטול התנדבות"}
            buttonContent={"ביטול התנדבות"}
            alertContent={"האם את בטוחה שברצונך לבטל התנדבות, פעולה זו תבטל את ההתנדבות גם מהמתנדבת"}
            id={id}
            fetchfunc={cancleVolunteering}
          ></AlertDialogSlide>) :
          ((!volunteerId&&!is_approved) ?
            (<><AlertDialogSlide
              title={"מחיקת בקשה"}
              buttonContent={"מחיקת בקשה"}
              alertContent={"?האם ברצונך למחוק את הבקשה"}
              id={id}
              fetchfunc={deleeVolunteering}
            ></AlertDialogSlide>
            <Button sx={{backgroundColor: '#e5e6ff',
          border: 'none', 
          color: '#000000',          
          '&:hover': {
            backgroundColor: '#c5c4ff', 
          }}} onClick={handleClickOpen}>עידכון בקשה</Button></>
            ):(volunteerId&&!is_approved)?
            (<Button sx={{backgroundColor: '#e5e6ff',
              border: 'none', 
              color: '#000000',          
              '&:hover': {
                backgroundColor: '#c5c4ff', 
              }}} onClick={()=>makeShibuz(id)}>אישור שיבוץ</Button>)
            : null)
        }       
      </CardActions>
      <CreateRequest values={{id:props.needyRequest.id,day:day,
      type:props.needyRequest.type_of_volunteerId,
      time:props.needyRequest.part_in_dayId}} 
      createRequestfunc={props.createRequestfunc} 
      open={open} 
      onClose={handleClose}
       success={props.success}></CreateRequest>
    </Card>

  );
}