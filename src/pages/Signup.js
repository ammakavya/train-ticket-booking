
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {

    const[username,SetUsername] = useState('');
    const[password,SetPassword] = useState('');
    const navigate = useNavigate()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSignup =() => {
if(username.trim() && password.trim()){
    const userData = {username ,password};
    localStorage.setItem(username,JSON.stringify(userData));
    localStorage.setItem('currentUser',username);
    navigate('/');
}else{
    alert('please enter both username and password');
}
    };
  return (
    <Box sx={{padding:4,margin:'Auto',maxWidth:400,textAlign:'center',width:isSmallScreen?300:400}}>
        <Typography variant='h5' gutterBottom>SignUp</Typography>
        <TextField label= "username"  fullWidth margin='normal' value={username} onChange={(e)=>SetUsername(e.target.value)} />
        <TextField label= "password"  fullWidth margin='normal' value={password} onChange={(e)=>SetPassword(e.target.value)} />
            <Button variant="contained" fullWidth onClick={handleSignup}>SignUp</Button>
            <Typography>Already have an account <Link to="/login">Login</Link></Typography>


    </Box>
  )
}

export default Signup