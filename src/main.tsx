import '#/shared/styles/root.css';
import { UnheadProvider } from '@unhead/react/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { headConfig, queryClientConfig } from '#/shared/configs';
import { router } from '#/router';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <UnheadProvider head={headConfig}>
      <QueryClientProvider client={queryClientConfig}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} reverseOrder={false} />
      </QueryClientProvider>
    </UnheadProvider>
  </StrictMode>,
);
