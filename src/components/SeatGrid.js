import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField, Chip, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TOTAL_SEATS = 80;
const SEATS_PER_ROW = 7;
const LAST_ROW_SEATS = 3;

const generateInitialSeats = () => {
  return Array.from({ length: TOTAL_SEATS }, (_, i) => ({
    seatNumber: i + 1,
    status: 'available',
    bookedBy: null, // store username
  }));
};

const SeatGrid = () => {
  const [seats, setSeats] = useState(generateInitialSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);
  const [snackOpen, setSnackOpen] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  if (!currentUser) return null;

  const handleSeatSelect = (seatNum) => {
    const seat = seats.find((s) => s.seatNumber === seatNum);
    if (seat.status !== 'available') return;

    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatNum));
    } else {
      if (selectedSeats.length < 7) {
        setSelectedSeats((prev) => [...prev, seatNum]);
      } else {
        alert('You can select a maximum of 7 seats.');
      }
    }
  };

  const handleBookSeats = () => {
    const newSeats = [...seats];
    let count = parseInt(seatCount);

    if (count < 1 || count > 7) return alert('You can book between 1 to 7 seats only');

    let found = false;

    for (let i = 0; i < TOTAL_SEATS; i += SEATS_PER_ROW) {
      const row = newSeats.slice(i, i + SEATS_PER_ROW);
      let startIdx = -1;

      for (let j = 0; j <= row.length - count; j++) {
        const group = row.slice(j, j + count);
        if (group.every((seat) => seat.status === 'available')) {
          startIdx = j;
          break;
        }
      }

      if (startIdx !== -1) {
        for (let k = startIdx; k < startIdx + count; k++) {
          newSeats[i + k].status = 'booked';
          newSeats[i + k].bookedBy = currentUser;
        }
        found = true;
        break;
      }
    }

    if (!found) {
      alert('Could not find contiguous seats in the same row.');
      return;
    }

    setSeats(newSeats);
    setSelectedSeats([]);
    setSnackOpen(true);
  };

  const handleReset = () => {
    setSeats(generateInitialSeats());
    setSelectedSeats([]);
  };

  const getSeatColor = (seat) => {
    if (seat.status === 'booked') {
      return seat.bookedBy === currentUser ? '#2196f3' : '#f44336';
    }
    if (selectedSeats.includes(seat.seatNumber)) return '#ffeb3b';
    return '#4caf50';
  };

  const availableSeats = seats.filter((s) => s.status === 'available').length;
  const bookedSeats = seats.filter((s) => s.status === 'booked').length;

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Ticket Booking
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${SEATS_PER_ROW}, 1fr)` ,
          gap: '10px',
          maxWidth: 400,
        }}
      >
        {seats.slice(0, 77).map((seat) => (
          <Box
            key={seat.seatNumber}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: getSeatColor(seat),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              cursor: seat.status === 'available' ? 'pointer' : 'not-allowed',
            }}
            onClick={seat.status === 'available' ? () => handleSeatSelect(seat.seatNumber) : undefined}
          >
            {seat.seatNumber}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: 2 }}>
        {seats.slice(77).map((seat) => (
          <Box
            key={seat.seatNumber}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: getSeatColor(seat),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              cursor: seat.status === 'available' ? 'pointer' : 'not-allowed',
            }}
            onClick={seat.status === 'available' ? () => handleSeatSelect(seat.seatNumber) : undefined}
          >
            {seat.seatNumber}
          </Box>
        ))}
      </Box>

      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Book Seats
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginBottom: 1 }}>
          {selectedSeats.map((seatNum) => (
            <Chip key={seatNum} label={seatNum} color="warning" />
          ))}
        </Box>

        <TextField
          label="Enter Seat Count"
          type="number"
          size="small"
          value={seatCount}
          onChange={(e) => setSeatCount(e.target.value)}
          sx={{ marginRight: 2, width: 100 }}
        />
        <Button variant="contained" onClick={handleBookSeats}>
          Book
        </Button>
        <Button variant="outlined" onClick={handleReset} sx={{ marginLeft: 2 }}>
          Reset Booking
        </Button>
      </Box>

      <Box sx={{ marginTop: 2, display: 'flex', gap: 4 }}>
        <Typography color="text.secondary">Booked Seats = {bookedSeats}</Typography>
        <Typography color="text.secondary">Available Seats = {availableSeats}</Typography>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message="Seat successfully booked"
      />
    </Box>
  );
};

export default SeatGrid;