import { defineConfig } from 'astro/config';
export default defineConfig({ site: 'https://telluridetech.com', base: process.env.SITE_BASE || '/' });
