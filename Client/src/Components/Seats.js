
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Seats.css'; 

const Seats = () => {
  const [seats, setSeats] = useState([]); 
  const [error, setError] = useState(''); 

  // Fetch seat data on component mount
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get('https://train-seat-booking-backend.onrender.com/api/seats'); 
        setSeats(response.data); 
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
