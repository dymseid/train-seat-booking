// // src/components/Seats.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Seats.css'; // CSS for styling

// const Seats = () => {
//   const [seats, setSeats] = useState([]); // State to hold seat data
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     // Fetch seat data from the backend
//     const fetchSeats = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/seats');
//         setSeats(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching seat data', error);
//       }
//     };
//     fetchSeats();
//   }, []);

//   // Helper function to display seat status
//   const getSeatClass = (isAvailable) => {
//     return isAvailable ? 'seat available' : 'seat booked';
//   };

//   if (loading) {
//     return <p>Loading seats...</p>; // Display loading while fetching data
//   }

//   return (
//     <div className="seats-container">
//       {seats.map((seat) => (
//         <div key={seat.seatNumber} className={getSeatClass(seat.isAvailable)}>
//           {seat.seatNumber}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Seats;









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
        const response = await axios.get('http://localhost:5000/api/seats'); // Adjust endpoint as needed
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
