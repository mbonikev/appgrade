import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AuthProvider } from '../contexts/AuthContext';
import NotFoundPage from '../features/NotFound/Pages/NotFoundPage';

import { ToastProvider } from '../contexts/ToastContext';

const RootLayout = () => (
  <AuthProvider>
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  </AuthProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage
});