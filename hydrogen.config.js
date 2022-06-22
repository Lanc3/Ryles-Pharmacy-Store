import {
  CookieSessionStorage,
  PerformanceMetricsServerAnalyticsConnector
} from '@shopify/hydrogen';
import { defineConfig } from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: 'https://ryles-pharmacy-4b8b.myshopify.com',
    storefrontToken: '0227a42326f603da309e0477b07b1ec9',
    storefrontApiVersion: '2022-07',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [PerformanceMetricsServerAnalyticsConnector],
});
