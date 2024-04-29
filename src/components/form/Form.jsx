import React, { useState } from 'react';
import './form.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const Form = (props) => {
  const {userid}=props;
  console.log(userid,"userid")
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleCreateCard=async()=>{
    const data = {
      cardTitle: title,
      price: price,
      description: description,
      userId: userid
  }
  try{
     const res = await axios.post("http://localhost:5000/api/auth/createcard", data);
     console.log(res)
     setDescription('');
     setPrice('');
     setTitle('');
  }
  catch(error){
   console.log(error)
  }
  }

  return (
    <div className='backgroundy'><div class="containers">
	
    <div class="modal">
      <div class="modal__header">
        <span class="modal__title">Add Card</span>
      </div>
      <div class="modal__body">
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <div class="input">
          <label class="input__label">Card title</label>
          <input class="input__field" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/> 
         
        </div>
        <div  class="input">
          <label class="input__label">Price</label>
          <input class="input__field" type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/> 
          
        </div>
        </div>
        <div class="input">
                  <label class="input__label">Description</label>
          <textarea class="input__field input__field--textarea" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            <p class="input__description">Give your card profile for a good description so everyone know what's it for</p>
        </div>
        <div>
        <Button sx={{backgroundImage:'linear-gradient(to bottom right, #aa00ff, #9600ff, #6f00ff, #5512fb, #3c00ff)',ml:'7px'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>

          </div>
      </div>
      <div class="modal__footer">
        <button class="button button--primary" onClick={handleCreateCard}>Create Card</button>
      </div>
    </div>
  </div></div>
  )
}

export default Form