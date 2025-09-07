import { Alert, Button, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { doRegister } from '../auth.slice';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(doRegister({ email, name, password, confirmPassword }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          placeholder="petro@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating…' : 'Register'}
        </Button>
        {error && <Alert severity="error">Invalid entered values</Alert>}
      </Stack>
    </form>
  );
}
