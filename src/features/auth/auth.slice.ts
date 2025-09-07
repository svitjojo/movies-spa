import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/features/auth/api/auth';
import { clearToken, getToken, setToken } from './utils/token';

type AuthState = {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};
const initialState: AuthState = {
  token: getToken(),
  status: 'idle',
};

export const doRegister = createAsyncThunk('auth/register', api.register);
export const doLogin = createAsyncThunk('auth/login', api.login);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(s) {
      s.token = null;
      clearToken();
    },
    setAuthToken(s, a) {
      s.token = a.payload;
      setToken(a.payload);
    },
  },
  extraReducers: (b) => {
    b.addCase(doRegister.pending, (s) => {
      s.status = 'loading';
      s.error = undefined;
    })
      .addCase(doRegister.fulfilled, (s, a) => {
        s.status = 'succeeded';
        if (a.payload.status === 1) s.token = a.payload.token;
        else s.error = 'Registration failed';
      })
      .addCase(doRegister.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.error.message;
      })

      .addCase(doLogin.pending, (s) => {
        s.status = 'loading';
        s.error = undefined;
      })
      .addCase(doLogin.fulfilled, (s, a) => {
        s.status = 'succeeded';
        if (a.payload.status === 1) s.token = a.payload.token;
        else s.error = 'Login failed';
      })
      .addCase(doLogin.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.error.message;
      });
  },
});

export const { logout, setAuthToken } = slice.actions;
export default slice.reducer;
