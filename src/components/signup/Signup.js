// src/components/signup/Signup.js
// src/components/signup/Signup.js

// src/components/signup/Signup.js

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Add confirm password
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // API call to sign up the user
    const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        contactNumber
      }),
    });

    if (response.ok) {
      navigate('/login'); // Redirect to login after successful signup
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || 'Signup failed. Please check your input.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f1f1f1', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '40px' }}> {/* Reduced paddingTop */}
      <Box
        sx={{
          width: '350px', // Adjusted width to make it more compact
          backgroundColor: 'white',
          padding: '20px', // Reduced padding for a more compact layout
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}
      >
        {/* Circular background for Lock icon */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="50px" // Reduced size
          height="50px" // Reduced size
          borderRadius="50%"
          bgcolor="red"
          margin="auto"
          mb={1} // Reduced margin
        >
          <LockIcon style={{ fontSize: 30, color: 'white' }} /> {/* Reduced font size */}
        </Box>

        <Typography variant="h6" gutterBottom> {/* Changed variant for smaller font */}
          Sign up
        </Typography>

        {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}

        <form onSubmit={handleSignup} style={{ marginTop: '10px' }}> {/* Reduced margin */}
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="dense" // Used 'dense' margin to reduce spacing
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="dense" // Used 'dense' margin to reduce spacing
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="dense" // Used 'dense' margin to reduce spacing
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="dense" // Used 'dense' margin to reduce spacing
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="dense" // Used 'dense' margin to reduce spacing
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <TextField
            label="Contact Number"
            type="tel"
            variant="outlined"
            fullWidth
            margin="dense" // Used 'dense' margin to reduce spacing
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }} // Reduced margin top
          >
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link href="/login" underline="always" style={{ color: 'blue' }}>
            Already have an account? Sign in.
          </Link>
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Copyright © upGrad 2021.
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;

