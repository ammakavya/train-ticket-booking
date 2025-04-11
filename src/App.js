import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SeatGrid from './components/SeatGrid';
import { Typography } from '@mui/material';

function App() {
  const isLoggedIn = localStorage.getItem('currentUser');

  return (
    <div className="App">
      {!isLoggedIn && (
        <Typography variant='h6' sx={{ justifyContent: 'center', textAlign: 'center' }}>
          <Link to="/signup">SignUp</Link> | <Link to="/login">Login</Link>
        </Typography>
      )}

      <Routes>
        <Route path="/" element={<SeatGrid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
