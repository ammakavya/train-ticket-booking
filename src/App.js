import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SeatGrid from './components/SeatGrid';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SeatGrid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
export default App;
