import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import bookingList from './components/BookingList';
import bookingEdit from './components/BookingEdit';
import bookingAdd from './components/BookingAdd';
import doctorAdd from './components/DoctorAdd';
import contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
        <Route exact path='/' component={bookingList} />
        <Route exact path='/bookings' component={bookingList} />
        <Route exact path='/bookings/add' component={bookingAdd} />
        <Route exact path='/bookings/edit/:id' component={bookingEdit} />
        <Route exact path='/doctors/add' component={doctorAdd} />
        <Route exact path='/contact' component={contact} />
      </div>
    </Router>
  );
}
export default App;
