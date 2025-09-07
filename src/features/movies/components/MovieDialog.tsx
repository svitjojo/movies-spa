import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { Movie, NewMovie } from '@/types/movie';
import { clearError, create, selectMoviesError, update } from '../movies.slice';
import getErrorMessageByField from '../utils/getErrorMessage';

const FORMATS = ['VHS', 'DVD', 'Blu-Ray'] as const;

type Props = {
  open: boolean;
  movie: Movie | null;
  onClose: () => void;
};

export default function MovieEditDialog({ open, movie, onClose }: Props) {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectMoviesError);

  const [{ title, year, format, actors }, setFormState] = React.useState<{
    title: string;
    year: string | number;
    format: (typeof FORMATS)[number];
    actors: string;
  }>({
    title: movie?.title ?? '',
    year: movie?.year ?? '',
    format: movie?.format ?? 'DVD',
    actors: movie?.actors?.map((a) => a.name).join(', ') ?? '',
  });

  const canSave = Boolean(title && year && format);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: NewMovie = {
      title,
      year: Number(year),
      format,
      actors: actors
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
    };
    try {
      dispatch(clearError());
      if (movie) {
        await dispatch(update({ id: movie.id, body })).unwrap();
      } else {
        await dispatch(create(body)).unwrap();
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const renderError = () => {
    if (error) {
      const firstErrorField = Object.keys(error.fields)[0];

      return (
        <Alert sx={{ mt: 2 }} severity={'error'}>
          {getErrorMessageByField(firstErrorField)}
        </Alert>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{movie ? 'Edit movie' : 'Add movie'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={title}
              onChange={handleChange}
              autoFocus
              fullWidth
              required
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Year"
                name="year"
                type="number"
                value={year}
                onChange={handleChange}
                required
                sx={{ width: { xs: '100%', sm: 180 } }}
              />
              <TextField
                select
                label="Format"
                name="format"
                value={format}
                onChange={handleChange}
                required
                sx={{ width: { xs: '100%', sm: 180 } }}
              >
                {FORMATS.map((f) => (
                  <MenuItem key={f} value={f}>
                    {f}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField
              label="Actors (comma separated)"
              name="actors"
              value={actors}
              onChange={handleChange}
              fullWidth
              placeholder="Humphrey Bogart, Ingrid Bergman"
            />
          </Stack>
          {renderError()}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!canSave}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
