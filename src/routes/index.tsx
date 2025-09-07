import { createBrowserRouter } from 'react-router-dom';
import DetailsPage from '@/pages/DetailsPage';
import HomePage from '@/pages/HomePage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/movies/:id', element: <DetailsPage /> },
]);
