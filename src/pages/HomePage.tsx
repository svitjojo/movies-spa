import { Box, Grid } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import AppShell from '@/components/AppShell';
import AuthForm from '@/features/auth/components/Auth';
import MoviesList from '@/features/movies/components/MoviesList';
import MoviesSearch from '@/features/movies/components/MoviesSearch';

export default function HomePage() {
  const token = useAppSelector((s) => s.auth.token);

  return (
    <AppShell>
      {!token ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <AuthForm />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <MoviesSearch />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <MoviesList />
          </Grid>
        </Grid>
      )}
    </AppShell>
  );
}
