import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AuthProvider } from '../contexts/AuthContext';
import NotFoundPage from '../features/NotFound/Pages/NotFoundPage';

const RootLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage
});