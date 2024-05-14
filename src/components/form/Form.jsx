import React, { useState } from 'react';
import './form.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const Form = (props) => {
  const { userid } = props;
  console.log(userid, "userid")
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImageFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name
    }
  };

  const handleCreateCard = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('cardTitle', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('userId', userid);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/createcard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setTitle('');
      setPrice('');
      setDescription('');
      setImageFile(null);
    } catch (error) {
      console.error('Error creating card:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='backgroundy'><div class="containers">

      <div class="modal">
        <div class="modal__header">
          <span class="modal__title">Add Card</span>
        </div>
        <div class="modal__body">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div class="input">
              <label class="input__label">Card title</label>
              <input class="input__field" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            </div>
            <div class="input">
              <label class="input__label">Price</label>
              <input class="input__field" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

            </div>
          </div>
          <div class="input">
            <label class="input__label">Description</label>
            <textarea class="input__field input__field--textarea" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <p class="input__description">Give your card profile for a good description so everyone know what's it for</p>
          </div>
          <div>
            <Button
              sx={{ backgroundImage: 'linear-gradient(to bottom right, #aa00ff, #9600ff, #6f00ff, #5512fb, #3c00ff)', ml: '7px' }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              {fileName ? fileName : 'Upload file'}
              <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
            </Button>
          </div>
        </div>
        <div class="modal__footer">

          <button class="button button--primary" onClick={handleCreateCard}>
            {isSubmitting ? <CircularProgress sx={{ fontSize: "15px", color: 'white' }} /> : 'Create Card'}
          </button>

        </div>
      </div>
    </div></div>
  )
}

export default Form