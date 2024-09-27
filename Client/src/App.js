
// import React from 'react';
// import Seats from './Components/Seats';
// import SeatBooking from './Components/SeatBooking';
// import './App.css'; // Import the CSS for styling


// function App() {
//   return (
//     <div className="App">
//       <h1>Train Seat Booking System</h1>
//       <div className="container">
//         <SeatBooking />
//         <Seats />
//       </div>
//     </div>
//   );
// }


// export default App;






import React from 'react';
import Seats from './Components/Seats'; // Ensure the correct path
import SeatBooking from './Components/SeatBooking'; // Ensure the correct path
import './App.css'; // Import your main CSS for the app

function App() {
  return (
    <div className="App">
      <h1>Train Seat Booking System</h1>
      <div className="container">
        <SeatBooking />
        <Seats />
      </div>
    </div>
  );
}

export default App;
