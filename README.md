# telluridetech.com (v2)

One-page static site for Telluride Tech, replacing the old WordPress site. Telluride Tech is now local IT support in Telluride only, and is not taking on new work. All software development points to Mount M Technologies at https://mountm.tech.

Built with [Astro](https://astro.build), same setup as `mountm-site`.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```

## Deploy

`.github/workflows/deploy.yml` publishes to GitHub Pages on every push to `main`. `public/CNAME` sets the custom domain.

## Old WordPress URLs

`public/<old-path>/index.html` files redirect old links. Development pages (`/Software-Development/`, `/service/wordpress/`, `/10-step-plan/`) go to https://mountm.tech/services/. Everything else goes to the home page.

## Analytics (Umami)

Configured in `analytics.config.mjs` (Umami website "Telluride Tech"). To override without a code change, add repo variables under Settings > Secrets and variables > Actions > Variables:

- `UMAMI_WEBSITE_ID`: the website ID from Umami (Settings > Websites > Edit).
- `UMAMI_SRC` (optional): script URL. Defaults to the self-hosted instance, `https://analytics.meander.me/script.js`.

Every page gets the script, including the 404. The old-URL redirect stubs in `public/` get it at build time (`integrations/umami-redirects.mjs`) so those hits are counted before redirecting. Only `telluridetech.com` visits are counted. Clicks on Mount M links and email links are tracked as `Mount M click` and `Email click` events.
