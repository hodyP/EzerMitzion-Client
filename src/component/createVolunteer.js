import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export default function CreateVolunteer() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    neighborhood: '',
    street: '',
    identityNumber: '',
    dateOfBirth: '',
  });

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    //console.log(formData);
  };

  const handleCityChange = (event) => {
    handleFieldChange('city', event.target.value);
  };

  const handleTextChange = (field) => (event) => {
    handleFieldChange(field, event.target.value);
  };
  const handleAddClick = () => {
    const data={first_name:formData.firstName,last_name:formData.lastName,phone:formData.phone,
      mail:formData.email,cityId:formData.city,neighborhood:formData.neighborhood,
    street:formData.street,identity_number:formData.identityNumber,date_of_birth:formData.dateOfBirth};
    // TODO: Make an HTTP request to your server endpoint with formData
    fetch('https://localhost:3600/api/volunteer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log('Server response:', data);
      })
      .catch((error) => {
        // Handle errors
        console.log( error);
      });
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Volunteer Card</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="First Name"
            variant="outlined"
            value={formData.firstName}
            onChange={handleTextChange('firstName')}
          />
        </Grid>
        <Grid item xs={6}>
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
            <MenuItem  value="1">Jerusalem</MenuItem>
            <MenuItem  value="2">bnei-Brak</MenuItem>
            <MenuItem  value="3">city 3</MenuItem>
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
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dateOfBirth}
            onChange={handleTextChange('dateOfBirth')}
          />
        </Grid>
      </Grid>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleAddClick}>Add</Button>
        <Button variant="outlined">Cancel</Button>
      </Stack>
    </Box>
  );
}