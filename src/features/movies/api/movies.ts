import type { ApiError } from '@/types/error';
import type { MovieOneResponse, MoviesListResponse, NewMovie } from '@/types/movie';
import { apiCall } from '../../../api/client';

export type ListQuery = {
  actor?: string;
  title?: string;
  search?: string;
  sort?: 'id' | 'title' | 'year';
  order?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
};

export const listMovies = (q: ListQuery = {}) =>
  apiCall.get<MoviesListResponse>('/movies', { params: q });

export const showMovie = (id: number | string) => apiCall.get<MovieOneResponse>(`/movies/${id}`);

export const createMovie = (body: NewMovie) =>
  apiCall.post<MovieOneResponse, NewMovie>('/movies', body);

export const updateMovie = (id: number | string, body: NewMovie) =>
  apiCall.patch<MovieOneResponse, NewMovie>(`/movies/${id}`, body);

export const deleteMovie = (id: number | string) =>
  apiCall.delete<{ status: 1 | 0; error?: ApiError }>(`/movies/${id}`);

export const importMovies = (file: File) => {
  const form = new FormData();
  form.append('movies', file);
  return apiCall.post<MoviesListResponse, FormData>('/movies/import', form);
};
