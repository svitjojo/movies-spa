import { Chip, Paper, Skeleton, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { show } from '../movies.slice';

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((s) => s.movies.current);

  React.useEffect(() => {
    if (id) {
      dispatch(show(id));
    }
  }, [id, dispatch]);

  if (!movie) {
    return (
      <Paper sx={{ p: 2 }}>
        <Skeleton variant="text" width={240} />
        <Skeleton variant="text" width={120} />
        <Skeleton variant="rectangular" height={48} sx={{ mt: 1 }} />
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {movie.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {movie.year} • {movie.format}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Actors
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {(movie.actors ?? []).map((a) => (
          <Chip key={a.id} label={a.name} variant="outlined" />
        ))}
      </Stack>
    </Paper>
  );
}
