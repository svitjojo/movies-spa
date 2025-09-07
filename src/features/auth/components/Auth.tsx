import { Box, Button, Paper, Typography } from '@mui/material';
import * as React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthForm() {
  const [mode, setMode] = React.useState<'login' | 'register'>('login');

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        width: 360,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Typography variant="h6" mb={2}>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </Typography>

      {/* Show form based on mode */}
      <Box sx={{ flex: 1 }}>{mode === 'login' ? <LoginForm /> : <RegisterForm />}</Box>

      {/* Toggle button */}
      <Button onClick={toggleMode} sx={{ mt: 2 }}>
        {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </Button>
    </Paper>
  );
}
