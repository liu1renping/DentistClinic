import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='navbar navbar-dark bg-info navbar-expand-lg'>
      <Link to='/' className='navbar-brand'>
        <i class='fas fa-tooth'></i>
      </Link>
      <div className='collpase navbar-collapse'>
        <ul className='navbar-nav mr-auto'>
          <li className='navbar-item'>
            <Link to='/bookings' className='nav-link'>
              Bookings
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to='/bookings/add' className='nav-link'>
              Add Booking
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to='/doctors/add' className='nav-link'>
              Add Doctor
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav navbar-right'>
          <li className='navbar-item'>
            <Link to='/contact' className='nav-link'>
              Contact us
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to='/contact' className='nav-link'>
              <i class='fas fa-phone-volume'></i> 9869 3003
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
