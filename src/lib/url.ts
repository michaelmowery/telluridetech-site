// Prefix site-relative paths with the deploy base ("/" on mountm.tech, "/mountm-site" on the github.io preview).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (path: string) => base + path;
