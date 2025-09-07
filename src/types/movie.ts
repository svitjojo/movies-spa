import type { ApiError } from './error';

export type Format = 'VHS' | 'DVD' | 'Blu-Ray';

export type Movie = {
  id: number;
  title: string;
  year: number | string;
  format: Format;
  actors?: Array<{ id: number; name: string }>;
  createdAt?: string;
  updatedAt?: string;
};

export type NewMovie = {
  title: string;
  year: number;
  format: Exclude<Format, 'Blu-Ray'> | 'Blu-Ray';
  actors: string[];
};

export type MoviesListResponse = {
  data: Array<Pick<Movie, 'id' | 'title' | 'year' | 'format' | 'createdAt' | 'updatedAt'>>;
  meta: { total: number };
  status: 1 | 0;
};

export type MovieOneResponse = { data: Movie; status: 1 | 0 };
export type ActionStatus = {
  status: 1 | 0;
  error?: ApiError;
};
