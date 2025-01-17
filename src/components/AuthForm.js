// src/components/AuthForm.js
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token, name, and email from URL parameters after successful login
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const name = queryParams.get('name');
    const email = queryParams.get('email');

    if (token && name && email) {
      // Save token to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);

      // Redirect to /journals with name and email as state
      navigate('/SlackAuth', { state: { name, email } });
    }
  }, [navigate]);

  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth route
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-md p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome to My Journal App</h2>
        <p className="text-gray-600 mb-8">Please sign in to continue</p>
        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          startIcon={<Google />}
          sx={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            color: 'gray.700',
            borderColor: 'gray.300',
            '&:hover': { backgroundColor: 'gray.100', borderColor: 'gray.500' },
          }}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
