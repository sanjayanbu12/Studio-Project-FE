import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: null,
    purpose: ''
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [appdates, setAppdates] = useState([]);
  const [loading, setLoading] = useState(false); 
  console.log(appdates)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // Make POST request to API endpoint
      await axios.post('http://localhost:5000/api/auth/Appointment', formData);

      // Clear form fields after successful submission
      setFormData({
        name: '',
        email: '',
        date: null,
        purpose: ''
      });
      fetchReports();
      // Show success alert
      setAlertOpen(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/Appointment');
      console.log(response)
      if (response.status === 200) {
        const appoDates = (response.data.reports.map((data) => data.date));
        setAppdates(appoDates);
      }
    } catch (error) {
      console.error('Error fetching reports:', error.message);
    }
  };
  useEffect(() => {

    fetchReports();
  }, []);

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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker  
                format='DD/MM/YYYY'
                value={formData.date} onChange={(newDate) => handleDateChange(newDate)}
                disablePast 
                shouldDisableDate={(day) =>
                  appdates.some((dates) => dayjs(day).isSame(dates, 'day'))
                }
                />
              </LocalizationProvider>
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
            {loading ? 'Booking...' : 'Book Appointment'}
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
