import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router-dom';

function BookingAdd() {
  const [newBooking, setNewBooking] = useState({
    doctorName: '',
    patientPhone: '',
    date: new Date().setHours(9, 0, 0),
    timeSlot: '',
    treatmentType: '',
    note: '',
    doctors: [],
    patients: []
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewBooking(prevEx => {
      return {
        ...prevEx,
        [name]: value
      };
    });
  }
  function handleChangeDate(date) {
    setNewBooking(prevEx => {
      return {
        ...prevEx,
        date: date,
        timeSlot: date.getHours() + ':' + date.getMinutes()
      };
    });
  }

  useEffect(() => {
    axios
      .get('/doctors/')
      .then(response => {
        const responseData = response.data;
        if (responseData.length > 0) {
          setNewBooking(prevEx => {
            return {
              ...prevEx,
              doctors: responseData.map(doctor => doctor.doctorName),
              doctorName: responseData[0].doctorName
            };
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []); // useEffect callback only once

  let history = useHistory();
  async function onSubmit(event) {
    event.preventDefault();
    const Booking = {
      doctorName: newBooking.doctorName,
      patientPhone: newBooking.patientPhone,
      date: newBooking.date,
      timeSlot: newBooking.timeSlot,
      treatmentType: newBooking.treatmentType,
      note: newBooking.note
    };
    console.log(Booking);

    try {
      await axios.post('/bookings/add', Booking);
    } catch (error) {
      console.error(error);
    }
    history.push('/');
  }

  return (
    <div>
      <h3>Add New Booking</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Doctor: </label>
          <select
            required
            className='form-control'
            name='doctorName'
            value={newBooking.doctorName}
            onChange={handleChange}
          >
            {newBooking.doctors.map(function(doctor) {
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
            value={newBooking.patientPhone}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Date / Time: </label>
          <div>
            <DatePicker
              selected={newBooking.date}
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
            value={newBooking.timeslot}
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
            value={newBooking.treatmentType}
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
            value={newBooking.note}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Book the Time'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
}
export default BookingAdd;
