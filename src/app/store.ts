import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/auth.slice';
import moviesReducer from '@/features/movies/movies.slice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
