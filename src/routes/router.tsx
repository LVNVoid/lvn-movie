import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { MovieListPage } from '@/pages/movie-list-page';
import { RootLayout } from '@/components/layout/root-layout';
import { MovieDetailPage } from '@/pages/movie-detail-page';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: MovieListPage,
});

const movieDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie/$id',
  component: MovieDetailPage,
});

const routeTree = rootRoute.addChildren([indexRoute, movieDetailRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
