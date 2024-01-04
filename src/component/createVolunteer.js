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
import MultipleSelectChip from "./addTypeOfVolunteer"
import { Typography } from '@mui/material';
export default function CreateVolunteer() {
  const navigate = useNavigate();
  const initialFormData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    neighborhood: '',
    street: '',
    identityNumber: '',
    age: '',
  };

  const [formData, setFormData] = React.useState(initialFormData);
  const [isFormModified, setIsFormModified] = React.useState(false);
  const [err, setError] = React.useState(null);
  const [datatype, setDatatype] = React.useState([]);
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
  const handleAddType = (selectedObjects) => {
    setDatatype(selectedObjects);
  }
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

  const handleCityChange = (event) => {
    handleFieldChange('city', event.target.value);
  };

  const handleTextChange = (field) => (event) => {
    handleFieldChange(field, event.target.value);
  };
  function calculateDOBFromAge(ageString) {
    // Parse age string to get the age as a number
    const age = parseInt(ageString, 10);

    // Get the current date
    const currentDate = new Date();

    // Calculate the birth year
    const birthYear = currentDate.getFullYear() - age;

    // Create a new Date object with the calculated birth year
    const dateOfBirth = new Date(birthYear, 0, 1); // Assuming January 1 for simplicity

    return dateOfBirth.toISOString().split('T')[0];
  }
  const addVolunteerTypes = (id) => {
    datatype.forEach(async (t) => {
      console.log(t);
      const newType = { volunteerId: id, type_of_volunteerId: t }
      try {
        const res = await fetch('http://localhost:3600/api/volunteer_details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newType),
        });
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.message);
          console.error('Server error:', errorData);
          return;
        }
        const responseData = await res.json();
        console.log('Server response:', responseData);

        setError(null);
        setIsFormModified(false); // Reset form modification state
        navigate('/Alphone');
        return responseData;
      } catch (error) {
        setError('An unexpected error occurred.');
        console.error('Error:', error);
      }
    }
    )
  }
  const addVolunteer = async () => {
    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      mail: formData.email,
      cityId: formData.city,
      neighborhood: formData.neighborhood,
      street: formData.street,
      identity_number: formData.identityNumber,
      date_of_birth: calculateDOBFromAge(formData.age),
    };

    // if (Object.values(formData).some((value) => value === '')) {
    //   setError('Please fill out all fields.');
    //   return;
    // }
    console.log(datatype);
    try {
      const response = await fetch('http://localhost:3600/api/volunteer', {
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
      return responseData;
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Error:', error);
    }
  }
  const handleAddClick = async () => {
    try {
      const volunteer = addVolunteer();
      if (volunteer) {
        addVolunteerTypes(volunteer.id);
        navigate("/Alphone");
      }
    }
    catch (error) {
      console.error('Error adding volunteerDetails:', error);
    }
  };
  return (
    <Box
    dir="rtl" 
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
      <Typography variant="h4">הוספת מתנדבת</Typography>
      {(err !== null) && <Alert severity="error">{err}</Alert>}
      {isFormModified && <Button variant="text" onClick={cleanData}>Clean all fields</Button>}
      <MultipleSelectChip onDataTypeChange={handleAddType}></MultipleSelectChip>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="שם פרטי"
            variant="outlined"
            value={formData.firstName}
            onChange={handleTextChange('firstName')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="שם משפחה"
            variant="outlined"
            value={formData.lastName}
            onChange={handleTextChange('lastName')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="טלפון"
            variant="outlined"
            value={formData.phone}
            onChange={handleTextChange('phone')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            label="מייל"
            variant="outlined"
            value={formData.email}
            onChange={handleTextChange('email')}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="city-label">עיר</InputLabel>
          <Select
            labelId="city-label"
            id="city"
            label="עיר"
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
          <TextField
            id="outlined-required"
            label="שכונה"
            variant="outlined"
            value={formData.neighborhood}
            onChange={handleTextChange('neighborhood')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="רחוב"
            variant="outlined"
            value={formData.street}
            onChange={handleTextChange('street')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="תעודת זהות"
            variant="outlined"
            value={formData.identityNumber}
            onChange={handleTextChange('identityNumber')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label="גיל"
            type='number'
            value={formData.age}
            onChange={handleTextChange('age')}
          />
        </Grid>
      </Grid>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" type="submit">הוספה</Button>
        <Button variant="outlined" onClick={() => { navigate('../Alphone') }}>ביטול</Button>
      </Stack>
    </Box>
  );
}