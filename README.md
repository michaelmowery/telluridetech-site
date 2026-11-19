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
