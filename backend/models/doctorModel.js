const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
      required: true,
      unique: true,
      trim: true, // trim off white spaces
      minlength: 3
    }
  },
  { timestamps: true }
);
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
