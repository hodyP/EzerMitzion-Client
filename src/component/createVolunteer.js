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
import { FormControl, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().required('שם פרטי הוא שדה חובה').min(2),
  lastName: Yup.string().required('שם משפחה הוא שדה חובה').min(2).max(10),
  phone: Yup.string().matches(/^\d{10}$/, 'מספר טלפון חייב להיות בן 10 ספרות').required('טלפון הוא שדה חובה'),
  email: Yup.string().email('כתובת מייל לא תקינה').required('מייל הוא שדה חובה'),
  city: Yup.string().required('עיר היא שדה חובה'),
  identityNumber: Yup.string().required('תעודת זהות היא שדה חובה').matches(/^\d{9}$/, 'תעודת זהות לא תקינה'),
  age: Yup.number().min(14, 'הגיל חייב להיות לפחות 14').required('גיל הוא שדה חובה').max(25,'הגיל עד 25'),
});


export default function CreateVolunteer() {
  const navigate = useNavigate();
 
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
  

  function calculateDOBFromAge(ageString) {
    
    const age = parseInt(ageString, 10);
    const currentDate = new Date();
    const birthYear = currentDate.getFullYear() - age;
    const dateOfBirth = new Date(birthYear, 0, 1); 
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
        
        navigate('/Alphone');
        return responseData;
      } catch (error) {
        setError('An unexpected error occurred.');
        console.error('Error:', error);
      }
    }
    )
  }
  const addVolunteer = async (values) => {
    const data = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
        mail: values.email,
        cityId: values.city,
        neighborhood: values.neighborhood,
        street: values.street,
        identity_number: values.identityNumber,
        date_of_birth: calculateDOBFromAge(values.age),
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
      // Reset form modification state
      return responseData;
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Error:', error);
    }
  }


  const formik = useFormik({
  initialValues: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    neighborhood: '',
    street: '',
    identityNumber: '',
    age: '',
  },
  validationSchema: validationSchema,
  onSubmit: async (values) => {
    try {
      console.log("in function handleAddClick");
      const volunteer = await addVolunteer(values);
      if (volunteer) {
        addVolunteerTypes(volunteer.id);
        navigate("/Alphone");
      }
    } catch (error) {
      console.error('Error adding volunteerDetails:', error);
    }
  },
});

  return (
    <Box
      dir="rtl"
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="on"
    >
      <Typography variant="h4">הוספת מתנדב</Typography>
      {(err !== null) && <Alert severity="error">{err}</Alert>}
      <MultipleSelectChip onDataTypeChange={handleAddType}></MultipleSelectChip>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="firstName"
            label="שם פרטי"
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="lastName"
            label="שם משפחה"
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="phone"
            label="טלפון"
            variant="outlined"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            label="מייל"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="city-label">עיר</InputLabel> 
            <Select
              labelId="city-label"
              id="city"
              name="city" // הוסיפי name="city" ל-Select
              value={formik.values.city}
              onChange={formik.handleChange} // עדכון ה-state של Formik
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
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
          <TextField
            id="neighborhood"
            label="שכונה"
            variant="outlined"
            value={formik.values.neighborhood}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="street"
            label="רחוב"
            variant="outlined"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="identityNumber"
            label="תעודת זהות"
            variant="outlined"
            value={formik.values.identityNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.identityNumber && Boolean(formik.errors.identityNumber)}
            helperText={formik.touched.identityNumber && formik.errors.identityNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="age"
            label="גיל"
            type="number"
            variant="outlined"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
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