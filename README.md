# $BATMAN website

Next.js landing page for $BATMAN on NEAR.

## Local development

```bash
npm ci
npm run dev
```

Open the localhost address printed by Next.js. The app works without an env file.

## Deploy on Vercel

1. Commit and push the site to the GitHub repository, `rommelwif/batmannear`.
2. In [Vercel New Project](https://vercel.com/new), import `rommelwif/batmannear`. Keep **Next.js** as the framework and `.` as the root directory.
3. The production canonical URL is `https://nearbatman.com` in the code. You can also set `NEXT_PUBLIC_SITE_URL=https://nearbatman.com` in Vercel for the **Production** environment; this overrides the built-in value. The URL is used for canonical metadata, Open Graph, `robots.txt`, and `sitemap.xml`.
4. Deploy and check the temporary `*.vercel.app` URL before connecting the domain. Check the hero video, mobile navigation, external links, and `/robots.txt` and `/sitemap.xml`.
5. In **Project → Settings → Domains**, add `nearbatman.com` and `www.nearbatman.com`. Make the apex domain the primary address and redirect `www` to it.
6. In **Spaceship → Advanced DNS → Host records**, enter **the exact A/CNAME/TXT records displayed by Vercel** for this project. If the domain uses custom nameservers, edit records at that DNS provider instead. Do not change unrelated MX/email records. Vercel provisions HTTPS after DNS verification.
7. If `NEXT_PUBLIC_SITE_URL` was added or changed after the first deployment, redeploy Production. Then verify `https://nearbatman.com`, the `www` redirect, canonical URL, social preview, `robots.txt`, and `sitemap.xml`.

Further reference: [Vercel deployments](https://vercel.com/docs/deployments), [custom domains](https://vercel.com/docs/domains/set-up-custom-domain).
