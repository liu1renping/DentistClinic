import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Booking from './Booking';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookings = await axios.get('/bookings');
        setBookings(bookings.data);
        console.log(bookings.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  async function deleteBooking(id) {
    try {
      await axios.delete('/bookings/delete/' + id);
      setBookings(prevBk => {
        return prevBk.filter(el => el._id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h3>Logged Bookings</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Doctor Name</th>
            <th>Patient Phone</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Treatment Type</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(ex => (
            <Booking
              key={ex._id}
              id={ex._id}
              doctorName={ex.doctorName}
              patientPhone={ex.patientPhone}
              date={Date(ex.date).substring(0, 15)}
              timeSlot={ex.timeSlot}
              treatmentType={ex.treatmentType}
              note={ex.note}
              deleteBooking={deleteBooking}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BookingList;
