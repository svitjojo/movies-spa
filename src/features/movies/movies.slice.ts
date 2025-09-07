import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import * as api from '@/features/movies/api/movies';
import type { ApiError } from '@/types/error';
import type { Movie, NewMovie } from '@/types/movie';

type MoviesState = {
  items: Movie[];
  current: Movie | null;
  total: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: ApiError | null;
};

const initialState: MoviesState = {
  items: [],
  current: null,
  total: null,
  status: 'idle',
};

export const list = createAsyncThunk(
  'movies/list',
  async (body: Parameters<typeof api.listMovies>[0], { rejectWithValue }) => {
    try {
      const data = await api.listMovies(body);
      return data;
    } catch (e: any) {
      // pass structured error down
      return rejectWithValue({
        code: e?.code,
        message: e?.message,
        fields: e?.fields,
      } as ApiError);
    }
  },
);
export const show = createAsyncThunk('movies/show', api.showMovie);
export const create = createAsyncThunk(
  'movies/create',
  async (body: Parameters<typeof api.createMovie>[0], { rejectWithValue }) => {
    try {
      const data = await api.createMovie(body);
      return data;
    } catch (e: any) {
      // pass structured error down
      return rejectWithValue({
        code: e?.code,
        message: e?.message,
        fields: e?.fields,
      } as ApiError);
    }
  },
);
export const update = createAsyncThunk(
  'movies/update',
  async (p: { id: number | string; body: NewMovie }, { rejectWithValue }) => {
    try {
      const data = await api.updateMovie(p.id, p.body);
      return data;
    } catch (e: any) {
      // pass structured error down
      return rejectWithValue({
        code: e?.code,
        message: e?.message,
        fields: e?.fields,
      } as ApiError);
    }
  },
);
export const remove = createAsyncThunk('movies/remove', api.deleteMovie);
export const importTxt = createAsyncThunk(
  'movies/import',
  async (body: Parameters<typeof api.importMovies>[0], { rejectWithValue }) => {
    try {
      const data = await api.importMovies(body);
      return data;
    } catch (e: any) {
      // pass structured error down
      return rejectWithValue({
        code: e?.code,
        message: e?.message,
        fields: e?.fields,
      } as ApiError);
    }
  },
);

const slice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetCurrent(state) {
      state.current = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(list.pending, (s) => {
      s.status = 'loading';
      s.error = undefined;
    })
      .addCase(list.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.items = a.payload.data;
        s.total = a.payload.meta?.total ?? a.payload.data.length;
      })
      .addCase(list.rejected, (s, a) => {
        s.status = 'failed';
        s.error = (a.payload as ApiError) ?? { message: a.error.message || 'Request failed' };
      })

      .addCase(show.fulfilled, (s, a) => {
        s.current = a.payload.data;
      })

      .addCase(create.fulfilled, (s, a) => {
        if (a.payload.status === 1) {
          s.items = [...s.items, a.payload.data].sort((x, y) =>
            String(x.title).localeCompare(String(y.title), undefined, { sensitivity: 'base' }),
          );
        }
      })
      .addCase(create.rejected, (s, a) => {
        s.status = 'failed';
        s.error = (a.payload as ApiError) ?? { message: a.error.message || 'Request failed' };
      })

      .addCase(update.fulfilled, (s, a) => {
        if (a.payload.status === 1) {
          s.items = s.items
            .map((m) => (m.id === a.payload.data.id ? a.payload.data : m))
            .sort((x, y) =>
              String(x.title).localeCompare(String(y.title), undefined, { sensitivity: 'base' }),
            );
        }
      })
      .addCase(update.rejected, (s, a) => {
        s.status = 'failed';
        s.error = (a.payload as ApiError) ?? { message: a.error.message || 'Request failed' };
      })

      .addCase(remove.fulfilled, (s, a) => {
        const id = a.meta.arg;
        s.items = s.items.filter((m) => m.id !== id);
      })

      .addCase(importTxt.fulfilled, (s, a) => {
        if (a.payload.status === 1) {
          s.items = [...a.payload.data].sort((x, y) =>
            String(x.title).localeCompare(String(y.title), undefined, { sensitivity: 'base' }),
          );
          s.total = a.payload.meta?.total ?? s.items.length;
        }
      })
      .addCase(importTxt.rejected, (s, a) => {
        s.status = 'failed';
        s.error = (a.payload as ApiError) ?? { message: a.error.message || 'Request failed' };
      });
  },
});

// Selectors
export const selectMoviesError = (state: RootState) => state.movies.error as ApiError | null;
export const selectMoviesStatus = (state: RootState) =>
  state.movies.status as MoviesState['status'];

export const { resetCurrent, clearError } = slice.actions;
export default slice.reducer;
