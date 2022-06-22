import {
  FileRoutes, PerformanceMetrics,
  PerformanceMetricsDebug, Route, Router, ShopifyProvider
} from '@shopify/hydrogen';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import { Suspense } from 'react';
import DefaultSeo from './components/DefaultSeo.server';
import LoadingFallback from './components/LoadingFallback';
import NotFound from './components/NotFound.server';
import ServerCartProvider from './components/ServerCartProvider.server';

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopifyProvider>
        <ServerCartProvider>
          <DefaultSeo />
          <Router>
            <FileRoutes />
            <Route path="*" page={<NotFound />} />
          </Router>
        </ServerCartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
