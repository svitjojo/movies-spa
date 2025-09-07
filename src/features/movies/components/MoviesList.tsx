import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { Movie } from '@/types/movie';
import { clearError, list, remove } from '../movies.slice';
import type { SortKey, SortOrder } from '../types';
import MovieDialog from './MovieDialog';
import MovieImport from './MovieImport';
import { getErrorMessageByCode } from '../utils/getErrorMessage';
import getParams from '../utils/getParams';

export default function MoviesList() {
  const [dialogOpen, setOpenDialog] = React.useState(false);
  const [editMovie, setEditMovie] = React.useState<Movie | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { order, sort, titleQuery, actorQuery, limit, offset } = getParams(params);
  const { items, status, error, total } = useAppSelector((s) => s.movies);

  React.useEffect(() => {
    dispatch(
      list({
        sort,
        order,
        title: titleQuery,
        actor: actorQuery,
        limit,
        offset,
      }),
    );
  }, [actorQuery, dispatch, limit, offset, order, sort, titleQuery]);

  const pushSort = (nextSort: SortKey) => {
    const currentSort = sort;
    const currentOrder: SortOrder = order;

    const nextOrder: SortOrder =
      currentSort === nextSort ? (currentOrder === 'ASC' ? 'DESC' : 'ASC') : 'ASC';

    const newParams = new URLSearchParams(params);
    newParams.set('sort', nextSort);
    newParams.set('order', nextOrder);
    setParams(newParams, { replace: false });
  };

  const HeaderCell = ({ label, field }: { label: string; field: SortKey }) => {
    const isActive = sort === field;
    const asc = order === 'ASC';
    return (
      <TableCell
        onClick={() => pushSort(field)}
        sx={{
          userSelect: 'none',
          cursor: 'pointer',
          fontWeight: isActive ? 700 : 500,
          color: isActive ? 'primary.main' : 'text.primary',
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <span>{label}</span>
          <Box component="span" sx={{ display: 'inline-flex', ml: 0.5 }}>
            {isActive ? (
              asc ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )
            ) : (
              <UnfoldMoreIcon fontSize="small" sx={{ opacity: 0.4 }} />
            )}
          </Box>
        </Stack>
      </TableCell>
    );
  };

  const openEdit = (m: Movie) => {
    setEditMovie(m);
    setOpenDialog(true);
  };
  const closeEdit = () => {
    setOpenDialog(false);
    setEditMovie(null);
  };

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1">Movies</Typography>
        </Stack>

        {status === 'loading' && <CircularProgress size={24} sx={{ m: 2 }} />}
        {total ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <HeaderCell label="Title" field="title" />
                <HeaderCell label="Year" field="year" />
                <TableCell>Format</TableCell>
                <TableCell width={120} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((m) => (
                <TableRow key={m.id} hover>
                  <TableCell>{m.title}</TableCell>
                  <TableCell>{m.year}</TableCell>
                  <TableCell>{m.format}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Details">
                      <IconButton size="small" onClick={() => navigate(`/movies/${m.id}`)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => openEdit(m)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => dispatch(remove(m.id))}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && status !== 'loading' && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography>No data</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : null}

        <Stack direction="row" justifyContent="flex-end" gap={5} sx={{ mt: 2 }}>
          <MovieImport />
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenDialog(true)}>
            Add movie
          </Button>
        </Stack>
      </Paper>
      {dialogOpen ? <MovieDialog movie={editMovie} onClose={closeEdit} /> : null}
      <Snackbar
        open={error?.code === 'FILE_INVALID'}
        autoHideDuration={6000}
        onClose={() => dispatch(clearError())}
      >
        <Alert
          onClose={() => dispatch(clearError())}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {getErrorMessageByCode(error?.code)}
        </Alert>
      </Snackbar>
    </>
  );
}
