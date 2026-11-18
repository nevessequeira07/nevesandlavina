# Neves & Lavina — Catholic wedding invitation

A standalone rose-gold and ivory invitation, created separately from `royal-invitation`.

## Preview

Run `python -m http.server 4174 --directory dist` from this folder.

## Vercel

Run `npx vercel` from this folder, then `npx vercel --prod` when ready. The included configuration serves `dist` without a build step.

## Content

Edit `dist/index.html` for visible details. The countdown is in `dist/app.js`; the Google Calendar link is in `dist/index.html` (December 26, 2026, 5 PM India time; reception at 7:30 PM). Original supplied artwork is in `dist/assets`.

Includes an opening envelope, floral monogram, Scripture, countdown, Google Calendar link, ceremony and reception details, and map search links. No RSVP or guest-data storage.



