# Pixelnest Solutions website

Agency site for Pixelnest Solutions, built with Next.js 16, Tailwind CSS 4, Motion and GSAP. Deploys on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

- `src/content/site.ts`: contact details, nav, services, process, FAQ, testimonials, stats
- `src/content/work.ts`: case studies (text, images, results)
- `public/images/work/`: case study images
- `public/brand/`: logo files (`logo-dark.png` for light backgrounds, `logo-light.png` for dark, `logo-mark.png`, `logo-3d.png`)
- `src/components/motion/`: scroll and motion effects (parallax images, scroll-filled text, 3D logo tilt, progress bar)

To add a case study, add an entry to `caseStudies` in `src/content/work.ts` and put its images in `public/images/work/`. Set `hasPage: false` to show it in the grid without a detail page.

## Before launch

- Add the real social profile links in `src/content/site.ts` (empty links are hidden).
- Set `NEXT_PUBLIC_SITE_URL` in Vercel once a custom domain is connected (used for SEO tags and the sitemap).
- The contact form opens the visitor's email app. Connect a form service if you want submissions stored.
- Privacy Policy and Terms are short drafts; have them reviewed.
