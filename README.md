# Nelfy's Solutions

A responsive Next.js App Router website for Nelfy's Solutions. Includes marketing pages, project showcases, public GitHub integration, a Zod-validated contact form with server-side email delivery, SEO metadata, sitemap, robots rules, and editable business content.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS v4
- Lucide React icons
- React Hook Form + Zod validation
- Resend email delivery
- GitHub REST API with server-side caching
- Vercel deployment target

## Requirements

- Node.js 20.9 or later (use the current Node.js LTS supported by your selected Next.js release)
- npm

## Install and run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | For contact delivery | Server-side Resend API key. Never prefix this with `NEXT_PUBLIC_`. |
| `CONTACT_TO_EMAIL` | For contact delivery | Business inbox that should receive inquiries. |
| `CONTACT_FROM_EMAIL` | For contact delivery | Verified sender address/domain configured in Resend. |
| `NEXT_PUBLIC_SITE_URL` | Production recommended | Canonical public origin, e.g. `https://your-domain.example`. |

Without email configuration, the contact endpoint returns a real `503` response and the UI displays an error. It does not claim the inquiry was sent. For production, verify your sender domain with Resend and set the three email environment variables in Vercel project settings.

## Contact form behavior

- Client-side form validation with React Hook Form and Zod.
- Server-side Zod validation in `app/api/contact/route.ts`.
- Honeypot field and basic same-origin check.
- Email notification via Resend.
- Explicit loading, success, and error states.

Before production, add persistent rate limiting (for example, a managed KV store or edge middleware with a rate-limit provider), configure any needed CAPTCHA, and test email deliverability. The in-memory process is not used for rate limiting, because serverless instances do not provide reliable shared state.

## GitHub integration

The site reads the public profile `https://github.com/yashwanth-nelfys` and public repositories from GitHub REST API. Requests are cached/revalidated to reduce rate-limit pressure. Rate-limit and failure states link users to the public profile. Repository star controls open GitHub; they never attempt to star repositories on behalf of visitors.

## Projects and services

- Edit `data/projects.ts` to add or update public project links and copy.
- Edit `data/services.ts` to update service descriptions and capabilities.
- Edit `data/navigation.ts` to change the main navigation.
- Technologies shown on the homepage are illustrative and should be reviewed against actual team capabilities before launch.

The two project links supplied in the project brief are configured in `data/projects.ts`. No app ratings, downloads, user counts, screenshots, client names, or matching repositories are invented.

## Branding and contact details

- Replace the icon/text mark in `components/layout/header.tsx` and `components/layout/footer.tsx` with an approved company logo if available.
- Add an approved founder portrait to `public/images/` and update the founder sections in `app/page.tsx` and `app/about/page.tsx`.
- Add verified business contact details in `app/contact/page.tsx` and the footer when supplied.
- Update `NEXT_PUBLIC_SITE_URL` to the real production domain before deployment.

## Legal pages

The privacy policy and terms are editable drafts with visible placeholders. They must be reconciled with the actual data processing, hosting, email, analytics, legal entity, and jurisdiction, and reviewed for applicable Indian law before publication. Do not treat them as legal advice.

## Validation and production build

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

Then manually verify each route, mobile navigation, keyboard focus, form validation, successful email delivery, missing email configuration, GitHub rate-limit fallback, external links, and mobile/tablet/desktop layouts. A local build has not been certified until these commands complete successfully in your environment.

## Deploy to Vercel

### Important: Vercel dependency/root-directory check

This project pins compatible major versions: Next.js 16, `eslint-config-next` 16, and ESLint 9. The Vercel error mentioning `eslint-config-next@14.2.35` means Vercel is not installing the `package.json` from this project (or an older commit is being deployed). Do not fix this by using `--force` or `--legacy-peer-deps`.

Before deploying:

1. Confirm the Git repository contains this project's `package.json` at the selected Vercel **Root Directory**. If the repository contains the `nelfys-solutions/` folder, set Root Directory to `nelfys-solutions`; if the contents of that folder are at the repository root, leave Root Directory as `.`.
2. In the Vercel deployment's source commit, open `package.json` and confirm `next` and `eslint-config-next` are both version `16.0.0` and `eslint` is version `9.38.0`.
3. Commit and push the corrected `package.json`, then trigger a new deployment. If Vercel still reports the old dependency, check the selected repository, branch, commit, and Root Directory.
4. Use Node.js 20.9 or newer in Vercel Project Settings.


1. Push this project to a Git repository.
2. Import the repository in Vercel.
3. Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `NEXT_PUBLIC_SITE_URL` in the project's environment settings.
4. Verify the sender domain with Resend and test delivery.
5. Deploy and verify all pages and API routes.
6. Configure your custom domain and update canonical URL metadata via `NEXT_PUBLIC_SITE_URL`.
7. Review legal copy and all company details before public launch.

## Important launch checklist

- [ ] Configure the actual legal entity name and privacy contact.
- [ ] Add verified company email and other contact details.
- [ ] Verify team technologies and remove capabilities that are not offered.
- [ ] Review current Google Play listing and live web app metadata.
- [ ] Add approved images and image alt text where available.
- [ ] Set production environment variables and test contact delivery.
- [ ] Add persistent rate limiting / anti-spam controls.
- [ ] Review privacy policy and terms with qualified counsel.
- [ ] Run typecheck, lint, production build, and manual responsive/accessibility checks.
