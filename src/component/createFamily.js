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
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().required('שם פרטי הוא שדה חובה').min(2),
  lastName: Yup.string().required('שם משפחה הוא שדה חובה').min(2).max(10),
  phone: Yup.string().matches(/^\d{10}$/, 'מספר טלפון חייב להיות בן 10 ספרות').required('טלפון הוא שדה חובה'),
  email: Yup.string().email('כתובת מייל לא תקינה'),
  city: Yup.string().required('עיר היא שדה חובה'),
  neighborhood: Yup.string().required('שכונה היא שדה חובה').min(2),
  street: Yup.string().required('רחוב הוא שדה חובה').min(2),
  remaind_time: Yup.number().required('תכיפות לתזכורת היא שדה חובה'),
  identityNumber: Yup.string(),
  description: Yup.string(),
});

export default function CreateNeedy() {
  const navigate = useNavigate();
  
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
  
  const handleAddClick = async (values) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      phone_2: values.phone_2 ? values.phone_2 : null,
      mail: values.email,
      cityId: values.city,
      neighborhood: values.neighborhood,
      street: values.street,
      remaind_time: values.remaind_time,
      description: values.description ? values.description : null,
      last_time_updated: new Date().toISOString().split('T')[0],
    };
  console.log(data);
  console.log(new Date().toLocaleDateString())
  
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
      
      navigate('/Alphone'); // Redirect to the desired page
      return responseData;
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      phone_2: '',
      email: '',
      city: '',
      neighborhood: '',
      street: '',
      remaind_time: '',
      identityNumber: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddClick(values);
    },
  });

  return (
    
   <Box
      sx={{ width: '100%' }}
      dir="rtl"
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="on"
    >
      <Typography variant="h4">הוספת משפחה</Typography>
      {err && <Alert severity="error">{err}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="שם פרטי*"
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
            name="lastName"
            label="שם משפחה*"
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
            name="phone"
            label="טלפון*"
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
            id="phone_2"
            name="phone_2"
            label="טלפון 2"
            variant="outlined"
            value={formik.values.phone_2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            name="email"
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
            <InputLabel id="city-label">עיר*</InputLabel>
            <Select
              id="city"
              name="city"
              label="עיר*"
              value={formik.values.city}
              onChange={formik.handleChange}
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
          <FormControl fullWidth>
            <InputLabel id="remaind_time-label">תכיפות לתזכורת*</InputLabel>
            <Select
              id="remaind_time"
              name="remaind_time"
              label="תכיפות לתזכורת*"
              value={formik.values.remaind_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.remaind_time && Boolean(formik.errors.remaind_time)}
            >
              <MenuItem value='7'>שבוע</MenuItem>
              <MenuItem value="30">חודש</MenuItem>
              {/* <MenuItem value="חודש">חודש</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="neighborhood"
            name="neighborhood"
            label="שכונה*"
            variant="outlined"
            value={formik.values.neighborhood}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
            helperText={formik.touched.neighborhood && formik.errors.neighborhood}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="street"
            name="street"
            label="רחוב*"
            variant="outlined"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="identityNumber"
            name="identityNumber"
            label="מספר ת.ז"
            variant="outlined"
            value={formik.values.identityNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="description"
            name="description"
            label="הערה"
            variant='outlined'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>
      <Stack spacing={6} direction="row">
        <Button variant="outlined" type="submit">הוספה</Button>
        <Button variant="outlined" onClick={() => { navigate('../Alphone') }}>ביטול</Button>
      </Stack>
    </Box>
    
  );
}