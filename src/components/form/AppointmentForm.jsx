import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    purpose: ''
  });
  const [alertOpen, setAlertOpen] = useState(false); // State to control alert visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to API endpoint
      await axios.post('http://localhost:5000/api/auth/Appointment', formData);

      // Clear form fields after successful submission
      setFormData({
        name: '',
        email: '',
        date: '',
        purpose: ''
      });

      // Show success alert
      setAlertOpen(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center',marginTop:'50px' }} >
      <div style={{ width: '500px' }} className="containers">
        <form onSubmit={handleSubmit} className="modal">
          <div className="modal__header">
            <span className="modal__title">Appointment</span>
          </div>
          <div className="modal__body">
            <div className="input">
              <label className="input__label">Name</label>
              <input
                className="input__field"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label className="input__label">Email</label>
              <input
                className="input__field"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label className="input__label">Select Date</label>
              <input
                className="input__field"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label className="input__label">Purpose for meeting</label>
              <textarea
                className="input__field input__field--textarea"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
              ></textarea>
              <p className="input__description">Book your Appointment</p>
            </div>
          </div>
          <div className="modal__footer">
            <button type="submit" className="button button--primary">
              Book Appointment
            </button>
          </div>
        </form>
      </div>

      {/* Snackbar for displaying success message */}
      <Snackbar sx={{mt:'90px'}}
        open={alertOpen}
        autoHideDuration={3000} // Adjust duration as needed
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleAlertClose} severity="success" elevation={6} variant="filled">
          Appointment booked successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AppointmentForm;
