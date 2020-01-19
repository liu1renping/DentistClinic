const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    doctorName: { type: String, required: true },
    patientPhone: { type: String, reqired: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    treatmentType: { type: String, required: true },
    note: { type: String }
  },
  { timestamps: true }
);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
