import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin() {
    const user = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:3000/user/login', { // Update with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();

      // Check if the user is a seller
      if (data.isSeller) {
        navigate('/admin'); // Redirect to admin page for sellers
      } else {
        navigate('/user'); // Redirect to user page for regular users
      }
    } catch (error) {
      setError(error.message);
    }

    // Reset the form
    setEmail('');
    setPassword('');
    setIsSeller(false);
  }

  return (
    <div className='h-dvh w-dvw flex justify-center items-center'>
      <FormGroup className='h-auto w-[90%] max-w-md shadow-md border-[1px] border-[#9e9e9e55] rounded-md p-6 flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-bold mb-4'>Login</h1>

        {error && <p className='text-red-500'>{error}</p>} {/* Display error message */}

        <TextField 
          id='email' 
          label="Email" 
          variant="outlined" 
          type='email' 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField 
          id='password' 
          label="Password" 
          variant="outlined" 
          type='password' 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

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
          title="Check this if you're a seller"
        />

        <Button 
          endIcon={<LoginIcon />} 
          variant='contained' 
          color='success' 
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>

        <p className='mt-4'>New User? <Link to='/register'>Register Here</Link></p>
      </FormGroup>
    </div>
  );
}
