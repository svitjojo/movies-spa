import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import MovieIcon from '@mui/icons-material/Movie';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout } from '@/features/auth/auth.slice';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const showBack = /^\/movies\/\d+/.test(location.pathname);

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <AppBar position="sticky">
        <Toolbar>
          {showBack ? (
            <IconButton color="inherit" onClick={() => navigate(-1)} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <MovieIcon sx={{ mr: 1 }} />
          )}
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
