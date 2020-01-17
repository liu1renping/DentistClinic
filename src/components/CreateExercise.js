import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateExercise() {
  const [newExercise, setNewExercise] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setNewExercise(prevEx => {
      return {
        ...prevEx,
        [name]: value
      };
    });
  }
  function handleChangeDate(date) {
    setNewExercise(prevEx => {
      return {
        ...prevEx,
        date: date
      };
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    const exercise = {
      username: newExercise.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date
    };
    try {
      await axios.post('/exercises/add', exercise);
    } catch (error) {
      console.error(error);
    }

    window.location = '/';
  }

  useEffect(() => {
    axios
      .get('/users/')
      .then(response => {
        const responseData = response.data;
        if (responseData.length > 0) {
          setNewExercise(prevEx => {
            return {
              ...prevEx,
              users: responseData.map(user => user.username),
              username: responseData[0].username
            };
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []); // useEffect callback only once

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <select
            required
            className='form-control'
            name='username'
            value={newExercise.username}
            onChange={handleChange}
          >
            {newExercise.users.map(function(user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            required
            className='form-control'
            name='description'
            value={newExercise.description}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Duration (in minutes): </label>
          <input
            type='text'
            className='form-control'
            name='duration'
            value={newExercise.duration}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker
              selected={newExercise.date}
              onChange={handleChangeDate}
            />
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Create Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
}
export default CreateExercise;
