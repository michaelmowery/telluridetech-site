// Adds Umami to the old-WordPress-URL redirect stubs in public/ after the build,
// so a visit to e.g. /software-development/ is counted before it redirects.
// The stub still redirects if the script is blocked or slow (1.5s cap), and
// without JavaScript through a <noscript> meta refresh.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

export default function umamiRedirects(cfg) {
  return {
    name: 'umami-redirects',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (!cfg.websiteId) return;
        const root = fileURLToPath(dir);
        const refresh = /<meta http-equiv="refresh" content="0; url=([^"]+)">/;
        let n = 0;
        for (const file of await htmlFiles(root)) {
          const html = await readFile(file, 'utf8');
          const m = html.match(refresh);
          if (!m || html.includes('data-website-id')) continue;
          const target = m[1];
          const snippet =
            `<noscript>${m[0]}</noscript>` +
            `<script>(function(){var d=0;window.__go=function(){if(!d){d=1;location.replace(${JSON.stringify(target)})}};setTimeout(window.__go,1500)})()</script>` +
            `<script async src="${attr(cfg.src)}" data-website-id="${attr(cfg.websiteId)}" data-domains="${attr(cfg.domains)}" data-auto-track="false" ` +
            `onload="Promise.resolve(window.umami&&umami.track()).catch(function(){}).then(window.__go)" onerror="window.__go()"></script>`;
          await writeFile(file, html.replace(m[0], snippet));
          n++;
        }
        logger.info(`Added Umami to ${n} redirect pages`);
      },
    },
  };
}
