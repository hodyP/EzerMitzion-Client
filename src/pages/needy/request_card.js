import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


export default function RequestCard(props) {
  const needyRequest=props.needyRequest;
  return (
    <Card sx={{ minWidth: 275 ,mb:1}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         {`${needyRequest.day} ${needyRequest.needy_requestsAndpart_in_dayId.name_time}`}
        </Typography>
        <Typography variant="h5" component="div">
          {needyRequest.needy_requestsAndtype_of_volunteer.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
         
          {(needyRequest.volunteerId)?(<Link href={`/volunteer/${needyRequest.volunteerId}`} color="primary">{`${needyRequest.needy_requestsAndvolunteer.first_name} ${needyRequest.needy_requestsAndvolunteer.last_name}`}</Link>):("לא שובץ")}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions dir="ltr">
        <Button size="small" >Learn More</Button>
      </CardActions>
    </Card>
  );
}