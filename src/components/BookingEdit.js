import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useHistory } from 'react-router';

function BookingEdit() {
  const [booking, setBooking] = useState({
    doctorName: '',
    patientPhone: '',
    date: new Date().setHours(9, 0, 0),
    timeSlot: '',
    treatmentType: '',
    note: '',
    doctors: [],
    patients: []
  });
  let { id } = useParams();

  function handleChange(event) {
    const { name, value } = event.target;
    setBooking(prevBk => {
      return {
        ...prevBk,
        [name]: value
      };
    });
  }
  function handleChangeDate(date) {
    setBooking(prevBk => {
      return {
        ...prevBk,
        date: date,
        timeSlot: date.getHours() + ':' + date.getMinutes()
      };
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foundBooking = await axios.get('/bookings/' + id);
        console.log(foundBooking);

        setBooking(prevBk => {
          return {
            ...prevBk,
            doctorName: foundBooking.data.doctorName,
            patientPhone: foundBooking.data.patientPhone,
            date: new Date(foundBooking.data.date),
            timeSlot: foundBooking.data.timeSlot,
            treatmentType: foundBooking.data.treatmentType,
            note: foundBooking.data.note
          };
        });
      } catch (error) {
        console.error(error);
      }

      try {
        const resDoctors = await axios.get('/doctors');
        if (resDoctors.data.length > 0) {
          setBooking(prevBk => {
            return {
              ...prevBk,
              doctors: resDoctors.data.map(doctor => doctor.doctorName)
            };
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  let history = useHistory();
  async function onSubmit(event) {
    event.preventDefault();
    const updatedEx = {
      doctorName: booking.doctorName,
      patientPhone: booking.patientPhone,
      date: booking.date,
      timeSlot: booking.timeSlot,
      treatmentType: booking.treatmentType,
      note: booking.note
    };
    await axios.post('/Bookings/update/' + id, updatedEx);
    history.push('/');
  }

  return (
    <div>
      <h3>Edit booking Log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Doctorname: </label>
          <select
            required
            className='form-control'
            name='doctorName'
            value={booking.doctorName}
            onChange={handleChange}
          >
            {booking.doctors.map(function(doctor) {
              return (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              );
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Patient: </label>
          <input
            required
            type='text'
            className='form-control'
            name='patientPhone'
            value={booking.patientPhone}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Date / Time: </label>
          <div>
            <DatePicker
              selected={booking.date}
              onChange={handleChangeDate}
              showTimeSelect
              timeIntervals={15}
              minTime={new Date().setHours(9, 0, 0)}
              maxTime={new Date().setHours(17, 0, 0)}
              dateFormat='yyyy/MM/dd HH:mm'
              inline
            />
          </div>
        </div>
        {/* <div className='form-group'>
          <label>Time Slot:</label>
          <input
            type='text'
            className='form-control'
            name='timeslot'
            value={booking.timeslot}
            onChange={handleChange}
          />
        </div> */}
        <div className='form-group'>
          <label>Treatment Type: </label>
          <select
            type='text'
            required
            className='form-control'
            name='treatmentType'
            value={booking.treatmentType}
            onChange={handleChange}
          >
            <option value='t0'>Select Treatment</option>
            <option value='Broken/Chipped tooth'>Broken/Chipped tooth</option>
            <option value='Check and Clean'>Check and Clean</option>
            <option value='Check and Clean (Child under 13)'>
              Check and Clean (Child under 13)
            </option>
            <option value='Consultation'>Consultation</option>
            <option value='Emergency'>Emergency</option>
            <option value='Emergency (Child under 13)'>
              Emergency (Child under 13)
            </option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div className='form-group'>
          <label>Note: </label>
          <textarea
            type='text'
            rows='3'
            className='form-control'
            name='note'
            value={booking.note}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Update Booking'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
}
export default BookingEdit;
