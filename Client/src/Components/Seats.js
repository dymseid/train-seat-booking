
// src/components/Seats.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Seats.css'; // Ensure you have appropriate styles

const Seats = () => {
  const [seats, setSeats] = useState([]); // State to hold the seat data
  const [error, setError] = useState(''); // State for error messages

  // Fetch seat data on component mount
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get('https://train-seat-booking-backend.onrender.com/api/seats'); // Adjust endpoint as needed
        setSeats(response.data); // Assume response.data is an array of rows with seat info
      } catch (error) {
        setError('Failed to fetch seats: ' + error.message);
      }
    };

    fetchSeats();
  }, []);

  return (
    <div className="seats-container">
      <h2>Available Seats</h2>
      {error && <p className="error">{error}</p>}
      <div className="seats">
        {seats.map((row) => (
          <div key={row.rowNumber} className="seat-row">
            <span>Row {row.rowNumber}: </span>
            {row.seats.map((seat) => (
              <span
                key={seat}
                className={`seat ${row.booked.includes(seat) ? 'booked' : 'available'}`}
              >
                {seat}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seats;
