import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SeatGrid from './components/SeatGrid';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Typography variant='h6' sx={{justifyContent:'center',textAlign:'center'}}><Link to="/signup">SignUp</Link></Typography>
      <Typography variant='h6' sx={{justifyContent:'center',textAlign:'center'}}><Link to="/login">Login</Link></Typography>
      
      <Routes>
        <Route path="/" element={<SeatGrid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
export default App;
