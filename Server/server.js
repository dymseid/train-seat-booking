const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://train-seat-booking-frontend1.onrender.com' }));

// MongoDB Seat Schema
const seatSchema = new mongoose.Schema({
    rowNumber: { type: Number, required: true }, 
    seats: { type: [Number], required: true }, 
    booked: { type: [Number], required: true }, 
  });
  

const Seat = mongoose.model("Seat", seatSchema);

// Fetch all seats
app.get("/api/seats", async (req, res) => {
  const seats = await Seat.find({});
  res.json(seats);
});

// Book seats
app.post("/api/book-seats", async (req, res) => {
  const { numSeats } = req.body;

  const rows = await Seat.find({});

  let bookedSeats = [];

  for (let row of rows) {
    const availableSeats = row.seats.filter(
      (seat) => !row.booked.includes(seat)
    ).length;

    if (availableSeats >= numSeats) {
      
      bookedSeats = row.seats
        .filter((seat) => !row.booked.includes(seat))
        .slice(0, numSeats);
      row.booked.push(...bookedSeats);
   
      await Seat.updateOne(
        { 'rowNumber': row.rowNumber},
        { 'booked': row.booked }
      );
      break; 
    }
  }

  if (bookedSeats.length > 0) {
    return res.json({ bookedSeats });
  } else {
    return res.status(400).json({ message: "Not enough seats available" });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect("mongodb+srv://rajat:2rajat%40db@cluster-train.ebayd.mongodb.net/trainsbook", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5000, () => console.log("Server running on port 5000"))
  )
  .catch((error) => console.error("Error connecting to MongoDB:", error));
