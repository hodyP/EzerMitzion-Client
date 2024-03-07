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
const apiUrl = "http://localhost:3600";

export default function RequestCard(props) {
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
  const { name_time = "" } = needy_requestsAndpart_in_dayId;
  const { name } = needy_requestsAndtype_of_volunteer;
  const fullName = (props.ask === "needy") ? (`${first_name} ${last_name}`) : (`משפחת ${needy_requestsAndneedy.last_name}`);
  const type = name;
  const partInDay = name_time;
  const neighborhood = props?.needy ? props.needy.neighborhood : "";
  const city = props.needy?.cityAndneedy?.name || "";
  const cancleVolunteering = async () => {
    try {
      const res = await axios.patch(`${apiUrl}/api/needy_request/${id}`)
    }
    catch (ex) {
      console.log(ex);
    }
  }
  return (
    <Card sx={{ minWidth: 275, mb: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`${day} ${name_time}`}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">

          {(volunteerId) ? (<Link href={props.ask === "needy" ? `/volunteer/${volunteerId}` : `/needy/${needyId}`} color="primary">
            {fullName}
          </Link>) : (<Link href={props.ask === "needy" ? `/needy/${needyId}/shibuz/${id}/${city}/${neighborhood}/${type}/${day}/${partInDay}` : null} color="primary">

            לשיבוץ
          </Link>)}

        </Typography>
        <Typography variant="body2">
          {`תאריך התחלה ${start_date}`}
        </Typography>
        {end_date && (
          <Typography variant="body2"> 
            {`תאריך סיום ${end_date}`}
          </Typography>
        )}
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
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
          ((!volunteerId) ?
            (<AlertDialogSlide
              title={"מחיקת בקשה"}
              buttonContent={"מחיקת בקשה"}
              alertContent={"?האם ברצונך למחוק את הבקשה"}
              id={id}
            ></AlertDialogSlide>
            )
            : null)
        }
        {/* <Button size="small" >Learn More</Button> */}
      </CardActions>
    </Card>
  );
}