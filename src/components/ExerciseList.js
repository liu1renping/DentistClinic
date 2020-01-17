import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Exercise from './Exercise';

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get('/exercises')
      .then(response => {
        console.log(response.data);
        setExercises(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function deleteExercise(id) {
    axios.delete('/exercises/' + id).then(response => {
      console.log(response.data);
    });

    setExercises(prevEx => {
      return prevEx.filter(el => el._id !== id);
    });
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(ex => (
            <Exercise
              key={ex._id}
              id={ex._id}
              username={ex.username}
              description={ex.description}
              duration={ex.duration}
              date={ex.date.substring(0, 10)}
              deleteEx={deleteExercise}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ExercisesList;
