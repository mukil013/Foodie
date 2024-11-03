import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button, Snackbar, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [hotelImage, setHotelImage] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [hotelContactNumber, setHotelContactNumber] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  function handleProfileImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleHotelImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHotelImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleRegister() {
    if (password !== confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }

    let newUser = {
      email,
      password,
      profilePic: profileImage,
      userName: username,
      isSeller,
    };

    if (isSeller) {
      newUser = {
        ...newUser,
        hotelName,
        hotelAddress,
        hotelContactNumber,
        hotelImg: hotelImage,
      };
    }

    try {
      const response = await axios.post('http://localhost:3000/user/register', newUser);
      showSnackbar('Registration successful: ' + response.data.message, 'success');
      resetForm();
    } catch (error) {
      console.error('Error registering user:', error);
      showSnackbar('Registration failed: ' + (error.response?.data?.message || error.message), 'error');
    }
  }

  function resetForm() {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsSeller(false);
    setProfileImage('');
    setHotelImage('');
    setHotelName('');
    setHotelAddress('');
    setHotelContactNumber('');
  }

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className='min-h-dvh max-h-fit w-dvw flex justify-center items-center p-4'>
      <FormGroup className='max-h-fit min-h-1/2 w-[90%] max-w-md shadow-md border-[1px] border-[#9e9e9e55] rounded-md p-6 flex flex-col items-center gap-4 overflow-y-scroll'>
        <h1 className='text-4xl font-bold mb-4'>Register</h1>

        <TextField
          id='username'
          label="Username"
          variant="outlined"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />

        <TextField
          id='email'
          label="Email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          id='password'
          label="Password"
          variant="outlined"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <TextField
          id='confirmPassword'
          label="Confirm Password"
          variant="outlined"
          required
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />

        <label htmlFor="">Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="mt-4 w-full"
          />
        </label>
        {profileImage && <img src={profileImage} alt="Profile Preview" className="mt-4 w-24 h-24 rounded-full object-cover" />}

        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
            />
          }
          label="Seller"
          labelPlacement="end"
        />

        {isSeller && (
          <div className="w-full flex flex-col gap-4">
            <TextField
              id='hotelName'
              label="Hotel Name"
              variant="outlined"
              required
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              fullWidth
            />
            <TextField
              id='hotelAddress'
              label="Hotel Address"
              variant="outlined"
              required
              value={hotelAddress}
              onChange={(e) => setHotelAddress(e.target.value)}
              fullWidth
            />
            <TextField
              id='hotelContactNumber'
              label="Hotel Contact Number"
              variant="outlined"
              required
              value={hotelContactNumber}
              onChange={(e) => setHotelContactNumber(e.target.value)}
              fullWidth
            />
            <label htmlFor="">Hotel Image
              <input
                type="file"
                accept="image/*"
                onChange={handleHotelImageChange}
                className="mt-4 w-full"
              />
            </label>
            {hotelImage && (
              <div className="flex items-center mt-4">
                <img src={hotelImage} alt="Hotel Preview" className="w-24 h-24 rounded object-cover" />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setHotelImage('')}
                  className="ml-2"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}

        <Button
          endIcon={<AccountCircleIcon />}
          variant='contained'
          color='success'
          onClick={handleRegister}
          fullWidth
        >
          Register
        </Button>

        <p className='mt-4'>Already have an account? <Link to='/login'>Login Here</Link></p>
      </FormGroup>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
