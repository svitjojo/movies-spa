import LogoutIcon from '@mui/icons-material/Logout';
import MovieIcon from '@mui/icons-material/Movie';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout } from '@/features/auth/auth.slice';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <AppBar position="sticky">
        <Toolbar>
          <MovieIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Movies
          </Typography>
          {token && (
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={() => dispatch(logout())}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
}
