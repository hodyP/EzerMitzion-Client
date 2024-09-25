import axios from 'axios';
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, LinearProgress, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdminCodeValid, setIsAdminCodeValid] = useState(false);
  const correctAdminCode = '1234';

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('הסיסמאות לא תואמות');
    } else {
      alert('נרשמת בהצלחה!');
      {
          const path="http://localhost:3600/api/manager/register";
          axios({
          method: 'POST',
          baseURL: path,
          data: {first_name:firstName,last_name:lastName,password:password}}).catch((err)=>{ console.log(err)})
      }
    }
  };
  const handleAdminCodeChange = (e) => {
    setAdminCode(e.target.value);
    setIsAdminCodeValid(e.target.value === correctAdminCode); // בדיקת קוד מנהל
  };

  const isFormValid = () => {
    return password === confirmPassword && isAdminCodeValid;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{p:1,width: '500px', // הגדרת רוחב הבן
      height: '75vh', // הגדרת גובה הבן
      margin: 'auto',  // מרכוז אופקי
      position: 'absolute', // מיקום מוחלט
      top: '45%', // מיקום אנכי
      left: '45%', // מיקום אופקי
      transform: 'translate(-50%, -45%)', // תזוזה כך שהמרכז של הבן יעמוד במרכז ההורה
      
    }} fullWidth>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '500px',
        padding: '20px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" mb={1}>
        הרשמה
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          fullWidth
          label="שם פרטי"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="שם משפחה"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="סיסמה"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LinearProgress
          variant="determinate"
          value={passwordStrength}
          sx={{
            height: '10px',
            borderRadius: '5px',
            mb: 1,
            bgcolor: passwordStrength === 100 ? 'green' : 'gray', // משנה צבע לירוק כשהסיסמה חזקה
          }}
        />
        <Typography mb={2} variant="body2" color="textSecondary">
          * יש להשתמש באותיות גדולות, מספרים ותווים מיוחדים
        </Typography>
        <TextField
          fullWidth
          label="אימות סיסמה"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          
        />
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        <TextField
        label="קוד מנהל"
        variant="outlined"
        fullWidth
        margin="normal"
        value={adminCode}
        onChange={handleAdminCodeChange}
        error={!isAdminCodeValid && adminCode.length > 0}
        helperText={!isAdminCodeValid && adminCode.length > 0 && "קוד מנהל לא נכון"}
      />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid()} // הכפתור לא פעיל אם הסיסמאות לא תואמות או שהסיסמה לא חזקה
        >
          הירשם
        </Button>
      </form>
    </Box>
    </Box>
  );
};

export default Register;
