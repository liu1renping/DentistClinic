const router = require('express').Router();
let Booking = require('../models/bookingModel');

router.get('/', async (req, res) => {
  try {
    const foundBookings = await Booking.find().sort('date');
    res.json(foundBookings);
  } catch (error) {
    console.log(error.mssage);
    res.status(500).send('server error');
  }
});

router.post('/add', async (req, res) => {
  const newBooking = new Booking({
    doctorName: req.body.doctorName,
    patientPhone: req.body.patientPhone,
    date: req.body.date,
    timeSlot: req.body.timeSlot,
    treatmentType: req.body.treatmentType,
    note: req.body.note
  });
  try {
    await newBooking.save();
    res.json('new booking added.');
  } catch (error) {
    console.log(error.mssage);
    res.status(500).send('server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundBooking = await Booking.findById(req.params.id);
    res.json(foundBooking);
  } catch (error) {
    console.log(error.mssage);
    res.status(500).send('server error');
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json('Booking deleted.');
  } catch (error) {
    console.log(error.mssage);
    res.status(500).send('server error');
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const bookingUpdate = await Booking.findById(req.params.id);
    bookingUpdate.patientPhone = req.body.patientPhone;
    bookingUpdate.doctorName = req.body.doctorName;
    bookingUpdate.date = req.body.date;
    bookingUpdate.timeSlot = req.body.timeSlot;
    bookingUpdate.treatmentType = req.body.treatmentType;
    bookingUpdate.note = req.body.note;
    await bookingUpdate.save();
    res.json('Booking updated!');
  } catch (error) {
    console.log(error.mssage);
    res.status(500).send('server error');
  }
});
module.exports = router;
