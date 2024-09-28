
import React, { useState } from 'react';
import axios from 'axios';
import './SeatBooking.css';

const SeatBooking = () => {
  const [numSeats, setNumSeats] = useState(''); 
  const [bookedSeats, setBookedSeats] = useState([]); 
  const [error, setError] = useState(''); 

  // Handle seat booking submission
  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://train-seat-booking-backend.onrender.com/api/book-seats', { numSeats });
      setBookedSeats(response.data.bookedSeats);
      setError(''); 
    } catch (error) {
      setError('Booking failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Your Seats</h2>
      <form onSubmit={handleBooking}>
        <label>
          Number of seats:
          <input
            type="number"
            value={numSeats}
            onChange={(e) => setNumSeats(e.target.value)}
            min="1"
            max="7"
            required
          />
        </label>
        <button type="submit">Book Seats</button>
      </form>

      {bookedSeats.length > 0 && (
        <div>
          <h3>Booked Seats</h3>
          <p>{bookedSeats.join(', ')}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SeatBooking;
