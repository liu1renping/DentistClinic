const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors());
app.use(express.json());

async function connectDB() {
  try {
    // const uri = process.env.ATLAS_URI;
    // await mongoose.connect(uri, {
    await mongoose.connect('mongodb://localhost:27017/mernDB', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected ...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
connectDB();

app.use('/bookings/', require('./routes/bookings'));
app.use('/doctors/', require('./routes/doctors'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
