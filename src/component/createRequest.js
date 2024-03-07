import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function CreateRequest(props) {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("");
    const [types,setTypes]=React.useState([]);
    const [time,setTime]=React.useState("");
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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment >
            <Button variant="contained" size="small" onClick={handleClickOpen}>
                הוספת בקשה
            </Button>

            <Dialog dir='rtl'
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const day= formJson.day;
                        console.log({day,time,type});
                        props.createRequestfunc(day,time,type);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent dir='rtl'>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="day"
                        name="day"
                        label="יום בשבוע"
                        fullWidth
                        variant="standard"
                    />
                    <FormControl variant="standard" fullWidth required>
                        <InputLabel id="demo-simple-select-standard-label">זמן</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={time}
                            onChange={(e) => { setTime(e.target.value) }}
                            label="time"
                        >
                            
                                <MenuItem value={1}>
                                   בוקר
                                </MenuItem>
                                <MenuItem  value={2}>
                                    צהריים
                                </MenuItem>
                                <MenuItem value={3}>
                                   ערב
                                </MenuItem>
                            
                        </Select>
                    </FormControl>
                    
                    <FormControl variant="standard" fullWidth required>
                        <InputLabel id="demo-simple-select-standard-label">סוג התנדבות</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={type}
                            onChange={(e) => { setType(e.target.value) }}
                            label="סוג ההתנדבות"
                        >
                            {types.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ביטול</Button>
                    <Button type="submit">הוספה</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}