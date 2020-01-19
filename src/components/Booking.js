import React from 'react';
import { Link } from 'react-router-dom';

function Booking(props) {
  return (
    <tr>
      <td>{props.doctorName}</td>
      <td>{props.patientPhone}</td>
      <td>{props.date}</td>
      <td>{props.timeSlot}</td>
      <td>{props.treatmentType}</td>
      <td>{props.note}</td>
      <td>
        <Link to={'/bookings/edit/' + props.id}>edit</Link> |
        <Link to='#' onClick={() => props.deleteBooking(props.id)}>
          delete
        </Link>
      </td>
    </tr>
  );
}
export default Booking;
