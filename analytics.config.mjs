// Umami analytics settings. Tracking is off until websiteId is set.
// Set them here, or override at build time with the PUBLIC_UMAMI_* env vars
// (e.g. GitHub repo variables, wired up in .github/workflows/deploy.yml).
const env = (typeof process !== 'undefined' && process.env) || {};

export const umami = {
  // Website ID from Umami: Settings > Websites > Edit > Website ID.
  websiteId: env.PUBLIC_UMAMI_WEBSITE_ID || '559c168f-b221-4a7c-a929-2436dc1089b1',
  // Self-hosted Umami (analytics.meander.me).
  src: env.PUBLIC_UMAMI_SRC || 'https://analytics.meander.me/script.js',
  // Only count visits on the live domain (skips localhost and previews).
  domains: env.PUBLIC_UMAMI_DOMAINS || 'telluridetech.com,www.telluridetech.com',
};
