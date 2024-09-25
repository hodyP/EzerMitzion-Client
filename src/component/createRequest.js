import * as React from 'react';
import { Button, Box, FormControl, InputLabel, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function CreateRequest(props) {
    const value=props.values||{};
    const [type, setType] = React.useState(value.type||"");
    const [types,setTypes]=React.useState([]);
    const [time,setTime]=React.useState(value.time||"");
    const [day,setDay]=React.useState(value.day||"");
    
    
    React.useEffect(
      
        () => {
            const fetchTypes = async () => {
              try {
                const response = await fetch('http://localhost:3600/api/type_of_volunteer');
                if (!response.ok) {
                  throw new Error('Failed to fetch types');
                }
                const typesData = await response.json();
                setTypes(typesData);
              } catch (error) {
                console.error('Error fetching types:', error);
              }
            };      
            fetchTypes();
          }, []
    )

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
    const times = [{name:"בוקר",id:1},{name:"צהרים",id:2},{name:"ערב",id:3}];

    return (
        <div>      
        <Dialog open={props.open} onClose={props.onClose} maxWidth={false} 
        PaperProps={{component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);                       
              console.log({ day, time, type });
              props.success();
              props.createRequestfunc(day, time, type,value.id);
              props.onClose();
            },
    sx: {  display: 'flex',
      flexDirection: 'column', // מסדר את הילדים אחד מתחת לשני
      alignItems: 'center',    // ממרכז אופקית
      justifyContent: 'center',width: '400px', maxHeight: '90vh' }, 
  }} >
          <DialogTitle>הוסף בקשה למשפחה</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 ,width: '100%',}} >
              {/* בחירת יום */}
              <FormControl fullWidth variant="standard">
                <InputLabel >בחר יום</InputLabel>
                <Select sx={{ minWidth: '300px' }} value={day} onChange={(e) => setDay(e.target.value)} label="בחר יום">
                  {days.map((dayOption) => (
                    <MenuItem key={dayOption} value={dayOption}>
                      {dayOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
               
              <FormControl fullWidth variant="standard">
                <InputLabel>בחר זמן ביום</InputLabel>
                <Select value={time} onChange={(e) => setTime(e.target.value)} label="בחר זמן ביום">
                  {times.map((timeOption) => (
                    <MenuItem key={timeOption} value={timeOption.id}>
                      {timeOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              {/* בחירת תחום התנדבות */}
              <FormControl fullWidth variant="standard">
                <InputLabel>תחום התנדבות</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)} label="תחום התנדבות">
                {types.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                        {type.name}
                        </MenuItem>
                        ))}             
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{console.log("אני בקונסול הכי חופר בעולם!")
              console.log("יום"+day+" זמן"+time+" סוג"+type+" ID"+value.id)
              props.onClose()}}>ביטול</Button>
            <Button type='submit'>
              אישור
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}