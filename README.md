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
3. In **Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to the final canonical URL, for example `https://example.com`. Select **Production**. The URL is used for canonical metadata, Open Graph, `robots.txt`, and `sitemap.xml`. Without it, Vercel's production URL is used as a fallback.
4. Deploy and check the temporary `*.vercel.app` URL before connecting the domain. Check the hero video, mobile navigation, external links, and `/robots.txt` and `/sitemap.xml`.
5. In **Project → Settings → Domains**, add the domain. Add `www` too if both forms should work, and choose one as the primary domain with a redirect from the other.
6. In **Spaceship → Advanced DNS → Host records**, enter **the exact A/CNAME/TXT records displayed by Vercel** for this project. If the domain uses custom nameservers, edit records at that DNS provider instead. Do not change unrelated MX/email records. Vercel provisions HTTPS after DNS verification.
7. If `NEXT_PUBLIC_SITE_URL` was added or changed after the first deployment, redeploy Production. Then verify the final domain, canonical URL, social preview, `robots.txt`, and `sitemap.xml`.

Further reference: [Vercel deployments](https://vercel.com/docs/deployments), [custom domains](https://vercel.com/docs/domains/set-up-custom-domain).
