import React from 'react';

function Contact() {
  return (
    <div>
      <h3>Contact Us</h3>
      <form>
        <div className='form-group'>
          <input
            type='text'
            required
            className='form-control'
            placeholder='Your Name:'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            required
            className='form-control'
            placeholder='Phone Number'
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            required
            className='form-control'
            placeholder='email'
          />
        </div>
        <div className='form-group'>
          <textarea
            type='text'
            rows='3'
            className='form-control'
            placeholder='how can we help'
          />
        </div>
        <div className='form-group'>
          <input type='submit' value='Submit' className='btn btn-primary' />
        </div>
      </form>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.578725434976!2d151.07866981520763!3d-33.77155048068322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a682b5543781%3A0xc7b62432f7be0044!2sEpping%20Dental%20Centre!5e0!3m2!1sen!2sau!4v1578434413663!5m2!1sen!2sau'
        title='Epping Dental Centre'
        width='600px'
        height='450px'
        frameBorder='0'
        allowfullscreen=''
      ></iframe>
    </div>
  );
}
export default Contact;
