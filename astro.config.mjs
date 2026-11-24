import { defineConfig } from 'astro/config';
import { umami } from './analytics.config.mjs';
import umamiRedirects from './integrations/umami-redirects.mjs';
export default defineConfig({
  site: 'https://telluridetech.com',
  base: process.env.SITE_BASE || '/',
  integrations: [umamiRedirects(umami)],
});
