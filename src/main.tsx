import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { initApi } from '@/api/client';
import { store } from '@/app/store';
import { router } from '@/routes';
import { loadRuntimeConfig } from './config/runtime';
import './index.css';

async function bootstrap() {
  const cfg = await loadRuntimeConfig();

  initApi(cfg.API_URL);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  );
}

bootstrap();
