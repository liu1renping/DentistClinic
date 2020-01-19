import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function DoctorAdd() {
  const [doctorName, setDoctorname] = useState('');
  function onChangeDoctorname(event) {
    setDoctorname(event.target.value);
  }

  let history = useHistory();
  async function onSubmit(event) {
    event.preventDefault();
    const doctor = {
      doctorName: doctorName
    };
    try {
      await axios.post('/doctors/add', doctor);
    } catch (error) {
      console.error(error);
    }
    setDoctorname('');
    history.push('/');
  }

  return (
    <div>
      <h3>Create New Doctor</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Doctorname: </label>
          <input
            type='text'
            required
            className='form-control'
            value={doctorName}
            onChange={onChangeDoctorname}
          />
        </div>
        <div className='form-group'>
          <input type='submit' value='Add Doctor' className='btn btn-primary' />
        </div>
      </form>
    </div>
  );
}
export default DoctorAdd;
