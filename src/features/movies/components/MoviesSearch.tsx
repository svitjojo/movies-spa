import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import getParams from '../utils/getParams';

export default function MoviesSearch() {
  const [params, setParams] = useSearchParams();
  const { titleQuery, actorQuery } = getParams(params);
  const [title, setTitle] = React.useState(titleQuery || '');
  const [actor, setActor] = React.useState(actorQuery || '');

  const resetSearch = () => {
    setParams((p) => {
      const n = new URLSearchParams(p);
      ['title', 'actor', 'offset'].forEach((k) => n.delete(k));
      return n;
    });

    setTitle('');
    setActor('');
  };

  const setParam = (key: string, val?: string) => {
    const next = new URLSearchParams(params);
    if (val && val.trim().length) next.set(key, val.trim());
    else next.delete(key);
    // reset pagination when filter changes
    next.delete('offset');
    setParams(next);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" mb={1}>
        Search
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="By title…"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="outlined" onClick={() => setParam('title', title)}>
          Find by title
        </Button>

        <TextField
          label="By actor…"
          size="small"
          value={actor}
          onChange={(e) => setActor(e.target.value)}
        />
        <Button variant="outlined" onClick={() => setParam('actor', actor)}>
          Find by actor
        </Button>

        <Button onClick={() => resetSearch()}>Reset</Button>
      </Stack>
    </Paper>
  );
}
