import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router';

function EditExercise() {
  const [exercise, setExercise] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
  });

  let { id } = useParams();
  console.log(id);

  function onChange(event) {
    const { name, value } = event.target;
    setExercise(prevEx => {
      return {
        ...prevEx,
        [name]: value
      };
    });
  }
  function onChangeDate(date) {
    setExercise(prevEx => {
      return {
        ...prevEx,
        date: date
      };
    });
  }

  useEffect(() => {
    axios
      .get('/exercises/' + id)
      .then(response => {
        setExercise(prevEx => {
          return {
            ...prevEx,
            username: response.data.username,
            description: response.data.description,
            duration: response.data.duration,
            date: new Date(response.data.date)
          };
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get('/users/')
      .then(response => {
        const responseData = response.data;
        if (responseData.length > 0) {
          setExercise(prevEx => {
            return {
              ...prevEx,
              users: responseData.map(user => user.username)
            };
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    const ex = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date
    };

    axios
      .post('/exercises/update/' + id, ex)
      .then(res => console.log(res.data))
      .catch(error => {
        console.error(error);
      });

    window.location = '/';
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <select
            required
            className='form-control'
            name='username'
            value={exercise.username}
            onChange={onChange}
          >
            {exercise.users.map(function(user) {
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
            value={exercise.description}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>Duration (in minutes): </label>
          <input
            type='text'
            className='form-control'
            name='duration'
            value={exercise.duration}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker selected={exercise.date} onChange={onChangeDate} />
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Edit Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
}
export default EditExercise;
