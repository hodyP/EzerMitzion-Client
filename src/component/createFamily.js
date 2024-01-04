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
      component="form"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        handleAddClick(); // Call your logic here
      }}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Family Card</h1>
      {(err !== null) && <Alert severity="error">{err}</Alert>}
      {isFormModified && <Button variant="text" onClick={cleanData}>Clean all fields</Button>}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            id="outlined-required"
            label="First Name"
            variant="outlined"
            value={formData.firstName}
            onChange={handleTextChange('firstName')}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-required"
            label="Last Name"
            variant="outlined"
            value={formData.lastName}
            onChange={handleTextChange('lastName')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="Phone"
            variant="outlined"
            value={formData.phone}
            onChange={handleTextChange('phone')}
          />       
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="Phone_2"
            variant="outlined"
            value={formData.phone_2}
            onChange={handleTextChange('phone_2')}
          />       
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleTextChange('email')}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            id="city"
            label="City"
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
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="remaind_time-label">remaind_time</InputLabel>
          <Select
            labelId="remaind_time-label"
            id="remaind_time"
            label="Remaind_time"
            value={formData.remaind_time}
            onChange={handleRemind_timeChange}
            sx={{ width: '100%' }}
          >
            <MenuItem  value="יום">יום</MenuItem>
            <MenuItem  value="שבוע">שבוע</MenuItem>
            <MenuItem  value="חודש">חודש</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="Neighborhood"
            variant="outlined"
            value={formData.neighborhood}
            onChange={handleTextChange('neighborhood')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="Street"
            variant="outlined"
            value={formData.street}
            onChange={handleTextChange('street')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="Identity Number"
            variant="outlined"
            value={formData.identityNumber}
            onChange={handleTextChange('identityNumber')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="description"
            variant='outlined'
            value={formData.description}
            onChange={handleTextChange('description')}
          />
        </Grid>
      </Grid>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" type="submit">Add</Button>
        <Button variant="outlined" onClick={()=>{navigate('../Alphone')}}>Cancel</Button>
      </Stack>
    </Box>
  );
}