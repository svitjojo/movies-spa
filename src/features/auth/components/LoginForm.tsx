import { Alert, Button, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { doLogin } from '../auth.slice';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((s) => s.auth);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(doLogin({ email, password }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          placeholder="petro@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in…' : 'Login'}
        </Button>
        {error && <Alert severity="error">Your email or password incorrect</Alert>}
      </Stack>
    </form>
  );
}
