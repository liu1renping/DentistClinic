import React from 'react';
import { Link } from 'react-router-dom';

function Exercise(props) {
  return (
    <tr>
      <td>{props.username}</td>
      <td>{props.description}</td>
      <td>{props.duration}</td>
      <td>{props.date}</td>
      <td>
        <Link to={'/edit/' + props.id}>edit</Link> |
        <Link to='#' onClick={() => props.deleteEx(props.id)}>
          delete
        </Link>
      </td>
    </tr>
  );
}
export default Exercise;
