import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
  const [username, setUsername] = useState('');
  function onChangeUsername(event) {
    setUsername(event.target.value);
  }

  let history = useHistory();
  async function onSubmit(event) {
    event.preventDefault();
    const user = {
      username: username
    };
    try {
      await axios.post('/users/add', user);
    } catch (error) {
      console.error(error);
    }
    setUsername('');
    history.push('/create');
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <input
            type='text'
            required
            className='form-control'
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create User'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
}
export default CreateUser;
