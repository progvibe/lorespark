import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/AuthContext';
import { fal } from '@fal-ai/client';

fal.config({
  proxyUrl: `${import.meta.env.VITE_API_URL}api/fal/proxy`,
});

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  ),
});
