import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { Typography ,FormControl} from '@mui/material';


export default function CreateNeedy() {
  const navigate = useNavigate();
  const initialFormData = {
    first_name:'',
    last_name:'',
    phone:'',
    phone_2:'',
    mail:'',
    cityId:'',
    neighborhood:'',
    street:'',
    remaind_time:'',
    description:'',
    last_time_updated:''
  };

  const [formData, setFormData] = React.useState(initialFormData);
  const [isFormModified, setIsFormModified] = React.useState(false);
  const [err, setError] = React.useState(null);
  const [cities, setCities] = React.useState([]);
  React.useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:3600/api/city');
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        const citiesData = await response.json();
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
  
    fetchCities();
  }, []);
  const cleanData = () => {
    setFormData(initialFormData);
    setIsFormModified(false);
  };
 
  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setIsFormModified(true);
  };
  
  const handleRemind_timeChange = (event) => {
    handleFieldChange('remaind_time', event.target.value);
  };
  const handleCityChange = (event) => {
    handleFieldChange('cityId', event.target.value);
  };

  const handleTextChange = (field) => (event) => {
    handleFieldChange(field, event.target.value);
  };
 
  const handleAddClick = async () => {
    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      phone_2: formData.phone_2?formData.phone_2:null,
      mail: formData.email,
      cityId: formData.cityId.toString(),
      neighborhood: formData.neighborhood,
      street: formData.street,
      remaind_time: formData.remaind_time, 
      description: formData.description?formData.description:null, 
      last_time_updated:new Date().toISOString().split('T')[0]
    };
  console.log(data);
  console.log(new Date().toLocaleDateString())
    // if (Object.values(formData).some((value) => value === '')) {
    //   setError('Please fill out all fields.');
    //   return;
    // }
  
    try {
      const response = await fetch('http://localhost:3600/api/needy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        console.error('Server error:', errorData);
        return;
      }
  
      const responseData = await response.json();
      console.log('Server response:', responseData);
      
      setError(null);
      setIsFormModified(false); // Reset form modification state
      navigate('/Alphone'); // Redirect to the desired page
      return responseData;
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Error:', error);
    }
  };
  return (
    
    <Box
    sx={{ width: '100%' }}
    dir="rtl"
      component="form"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        handleAddClick(); // Call your logic here
      }}
      // sx={{
      //   boxSizing: 'border-box',
      //   '& .MuiTextField-root': { m: 1, width: '100%' },
      //   width: '100%',
      //   '@media (min-width: 600px)': {
      //     width: '1000px',
      //   },
      // }}
      noValidate
      autoComplete="on"
    >
     
     <Typography>הוספת משפחה</Typography>
      {(err !== null) && <Alert severity="error">{err}</Alert>}
      {isFormModified && <Button variant="text" onClick={cleanData}>ניקוי כל השדות</Button>}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="שם פרטי*"
            variant="outlined"
            value={formData.firstName}
            onChange={handleTextChange('firstName')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-required"
            label="שם משפחה*"
            variant="outlined"
            value={formData.lastName}
            onChange={handleTextChange('lastName')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
          required
            id="outlined-required"
            label="טלפון*"
            variant="outlined"
            value={formData.phone}
            onChange={handleTextChange('phone')}
          />       
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="טלפון 2"
            variant="outlined"
            value={formData.phone_2}
            onChange={handleTextChange('phone_2')}
          />       
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            label="מייל"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleTextChange('email')}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
          <InputLabel id="city-label">עיר*</InputLabel>
          <Select
          required
            labelId="city-label"
            id="city"
            label="עיר*"
            value={formData.city}
            onChange={handleCityChange}
            sx={{ width: '100%' }}
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
          <InputLabel id="remaind_time-label">*תכיפות לתזכורת</InputLabel>
          <Select
          required
            labelId="remaind_time-label"
            id="remaind_time"
            label="*תכיפות לתזכורת"
            value={formData.remaind_time}
            onChange={handleRemind_timeChange}
            sx={{ width: '100%' }}
          >
            
            <MenuItem  value="יום">יום</MenuItem>
            <MenuItem  value="שבוע">שבוע</MenuItem>
            <MenuItem  value="חודש">חודש</MenuItem>
          </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
          required
            id="outlined-required"
            label="שכונה*"
            variant="outlined"
            value={formData.neighborhood}
            onChange={handleTextChange('neighborhood')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
          required
            id="outlined-required"
            label="רחוב*"
            variant="outlined"
            value={formData.street}
            onChange={handleTextChange('street')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="מספר ת.ז"
            variant="outlined"
            value={formData.identityNumber}
            onChange={handleTextChange('identityNumber')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="הערה"
            variant='outlined'
            value={formData.description}
            onChange={handleTextChange('description')}
          />
        </Grid>
      </Grid>
      <Stack spacing={6} direction="row">
        <Button variant="outlined" type="submit">הוספה</Button>
        <Button variant="outlined" onClick={()=>{navigate('../Alphone')}}>ביטול</Button>
      </Stack>
     
    </Box>
    
  );
}