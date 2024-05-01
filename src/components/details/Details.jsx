import React, { useState, useEffect } from 'react';
import './Details.css';
import axios from 'axios';
import { Box, InputLabel, MenuItem, Modal, Select, TextField, Typography,CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "35%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
  borderRadius: "10px",
};

const Details = (props) => {
  const { userid } = props;
  const { open, handleClose, cardDetails } = props;

  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [reports, setReports] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/getallreports');
        if (response.status === 200) {
          const reportDates = (response.data.reports.map((data) => data.date));
          setReports(reportDates);
        }
      } catch (error) {
        console.error('Error fetching reports:', error.message);
      }
    };

    fetchReports();
  }, []);


  const handlePaymentMethod = () => {
    var options = {
      key: "rzp_test_ERvSXNSWia7TU7",
      key_secret: "qSjZ9b9pkY2szfpb7Bm58IaD",
      amount: cardDetails.price * 100,
      currency: "INR",
      name: "STUDIO_PURPLE",
      description: "for testing purpose",
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "Kishore",
        email: "ksrki@gmail.com",
        contact: "8270252916"
      },
      notes: {
        address: "Razorpay Corporate office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reports', {
        userId: userid,
        cardTitle: cardDetails.cardTitle,
        price: cardDetails.price,
        date: date
      });
      if (response.status === 200) {
        // Show loader for 3 seconds
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          handleClose(); // Close the popup
        }, 3000);
      } else {
        throw new Error('Failed to submit the data.');
      }
      console.log('Data submitted successfully!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Report with this date already exists");
      } else {
        setError("Failed to submit the data.");
      }
    }
  }

  const handleCloseError = () => {
    setError(null); // Reset error state when closing the alert
  }

  return (
    <div >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {error && (
            <div style={{
              position: 'fixed',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              maxWidth: 600,
              zIndex: 1000
            }}>
              <Alert severity="error" onClose={handleCloseError}>
                {error}
              </Alert>
            </div>
          )}
          <Typography id="modal-modal-title" variant="h4" component="h2" style={{ textAlign: "center" }}>
            {cardDetails.cardTitle}
          </Typography>
          <div>
            <InputLabel id="demo-simple-select-label" style={{ marginBottom: "10px" }}>Select Date</InputLabel>
            <TextField
              style={{ width: 300 }}
              variant="outlined"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            
            />
          </div>
          <div>
            <InputLabel id="demo-simple-select-label" style={{ marginBottom: "10px" }}>Price</InputLabel>
            <TextField
              style={{ width: 300 }}
              variant="outlined"
              value={cardDetails.price}
              disabled
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 3, width: "100%", alignItems: "center" }}>
            <div>
              <InputLabel id="demo-simple-select-label" style={{ marginBottom: "10px" }}>Payment Method</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: 300, marginRight: "20px" }}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value='online'>online Payment</MenuItem>
                <MenuItem value='offline'>offline Payment</MenuItem>
              </Select>
            </div>
            <div>
              {paymentMethod === 'online' && <button className='paymentbutton' onClick={handlePaymentMethod}>Make Payment</button>}
            </div>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          ) : (
            <button className='confirmbutton' variant='contained' onClick={handleSubmit}>Confirm Book</button>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Details;
