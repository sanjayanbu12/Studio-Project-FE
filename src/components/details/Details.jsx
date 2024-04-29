import React, { useState } from 'react';
import './Details.css'; // This is where you'll import the global styles if needed
import { Box, Button, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display:"flex",
  flexDirection:"column",
  gap:3,
  borderRadius:"10px",
};

const Details = (props) => {
  const { open, handleClose, cardDetails } = props;
  const [date, setDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethod=()=>{
    var options = {
      key: "rzp_test_ERvSXNSWia7TU7",
      key_secret:"qSjZ9b9pkY2szfpb7Bm58IaD",
      amount: cardDetails.price *100,
      currency:"INR",
      name:"STUDIO_PURPLE",
      description:"for testing purpose",
      handler: function(response){
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name:"Kishore",
        email:"ksrki@gmail.com",
        contact:"8270252916"
      },
      notes:{
        address:"Razorpay Corporate office"
      },
      theme: {
        color:"#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {cardDetails.cardTitle}
          </Typography>
          <div>
            <InputLabel id="demo-simple-select-label" style={{marginBottom:"10px"}}>Select Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ width: 300 }}/>
            </LocalizationProvider>
          </div>
          <div style={{display:"flex", flexDirection:"row", gap:3,width:"100%",alignItems:"center"}}>
          <div>
            <InputLabel id="demo-simple-select-label" style={{marginBottom:"10px"}}>Payment Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: 300,marginRight:"20px" }}
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
          
          <button className='confirmbutton' variant='contained'>Confirm Book</button>
        </Box>
      </Modal>
    </div>
  );
}

export default Details;
