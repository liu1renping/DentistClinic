import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useHistory } from 'react-router';

function EditExercise() {
  let { id } = useParams();
  const [exercise, setExercise] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
  });
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
    const fetchData = async () => {
      try {
        const resEx = await axios.get('/exercises/' + id);
        setExercise(prevEx => {
          return {
            ...prevEx,
            username: resEx.data.username,
            description: resEx.data.description,
            duration: resEx.data.duration,
            date: new Date(resEx.data.date)
          };
        });
      } catch (error) {
        console.error(error);
      }

      try {
        const resUsers = await axios.get('/users');
        if (resUsers.data.length > 0) {
          setExercise(prevEx => {
            return {
              ...prevEx,
              users: resUsers.data.map(user => user.username)
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
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date
    };
    await axios.post('/exercises/update/' + id, updatedEx);
    history.push('/');
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
