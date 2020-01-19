const router = require('express').Router();
let Doctor = require('../models/doctorModel');

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.log(error.mssage);
    res.status(500).send('server error');
  }
});

router.post('/add', async (req, res) => {
  const doctorName = req.body.doctorName;
  const newDoctor = new Doctor({ doctorName });
  try {
    const newDoc = await newDoctor.save();
    res.json('newDoc added' + newDoc);
  } catch (error) {
    console.log(error.mssage);
    res.status(500).send('server error');
  }
});

module.exports = router;
