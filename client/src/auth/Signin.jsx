import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/authSlice'
import toast from 'react-hot-toast';

const Signin = () => {
  
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    designation: 'user', // Default to "user"
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', formData);
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        navigate('/');
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };

  useEffect(()=>{
    if(user){
        navigate("/");
    }
  },[])

  return (
    <div className='mb-10'>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: "20px"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#FFAE42' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <Grid item xs={12} className="flex gap-4 items-center">
              <FormLabel id="designation-label">Designation:</FormLabel>
              <RadioGroup
                row
                aria-labelledby="designation-label"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
              >
                <FormControlLabel value="user" control={<Radio />} label="User" />
                <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              </RadioGroup>
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <p>Don't have an account? <Link to={'/sign-up'} className='text-blue-500'>Sign Up</Link></p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Signin;

