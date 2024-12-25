import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { Button, CircularProgress } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true); 
    const user = {
      email: email,
      password: password
    };
  
    try {
      const response = await fetch('https://foodie-vqll.onrender.com/user/login', {
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
      console.log('Login Response:', data); 
  
      
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('userName', data.userName);
      sessionStorage.setItem('userEmail', data.userEmail);
      sessionStorage.setItem('profilePic', data.profilePic);
      sessionStorage.setItem('hotelName', data.hotelName);
      sessionStorage.setItem('hotelImage', data.hotelImage);
  
      
      if (data.isSeller) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  
    setEmail('');
    setPassword('');
    setIsSeller(false);
  }

  return (
    <div className='h-dvh w-dvw flex justify-center items-center'>
      <FormGroup className='h-auto w-[90%] max-w-md shadow-md border-[1px] border-[#9e9e9e55] rounded-md p-6 flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-bold mb-4'>Login</h1>

        {error && <p className='text-red-500'>{error}</p>}

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

        <Button 
          endIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />} 
          variant='contained' 
          color='success' 
          onClick={handleLogin}
          fullWidth
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <p className='mt-4'>New User? <Link to='/register'>Register Here</Link></p>
      </FormGroup>
    </div>
  );
}
