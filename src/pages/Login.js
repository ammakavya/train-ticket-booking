
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const[username,SetUsername] = useState('');
    const[password,SetPassword] = useState('');
    const navigate = useNavigate()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.password === password) {
          localStorage.setItem('currentUser', username);
          navigate('/');
        } else {
          alert('Invalid username or password');
        }
      };
      
  return (
    <Box sx={{padding:4,margin:'Auto',maxWidth:400,textAlign:'center',width:isSmallScreen?300:400}}>
        <Typography variant='h5' gutterBottom>Login</Typography>
        <TextField label= "username"  fullWidth margin='normal' value={username} onChange={(e)=>SetUsername(e.target.value)} />
        <TextField label= "password"  fullWidth margin='normal' value={password} onChange={(e)=>SetPassword(e.target.value)} />
            <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
           


    </Box>
  )
}

export default Login