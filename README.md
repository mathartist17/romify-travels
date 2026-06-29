# Romify Travels

Simple Next.js landing page for the Romify Travels startup.

## What is included

- Clean landing page with light visuals and low loading cost.
- Destination sections for Meghalaya, Arunachal Pradesh, and Uttar Pradesh.
- Real-time feedback form with star rating.
- Customer photo upload previews.
- Organized asset folders for brand and destination media.
- Optional Supabase persistence for shared feedback storage.
- Gallery sections that expect photos in the public asset folders.

## Local development

```bash
npm install
npm run dev
```

## Deploy for free

1. Create a GitHub repository at [github.com/new](https://github.com/new) and push this project.
2. Create a free Supabase project at [supabase.com/dashboard/new](https://supabase.com/dashboard/new).
3. Import the GitHub repo into Vercel at [vercel.com/new](https://vercel.com/new).
4. Leave the build command as `npm run build` and the framework preset as Next.js.
5. Add the environment variables from [.env.example](.env.example) in Vercel project settings.
6. Run the SQL in [supabase/schema.sql](supabase/schema.sql#L1) inside the Supabase SQL editor.
7. In Supabase Storage, confirm the `feedback-images` bucket exists and is public.
8. Deploy and test the site from a phone and from a second browser.

## Supabase setup

1. Create a free Supabase project.
2. Run the SQL in [supabase/schema.sql](supabase/schema.sql#L1).
3. Copy `.env.example` to `.env.local` and fill in the Supabase URL and anon key.
4. Add the same variables in Vercel project settings before deployment.
5. Confirm the `feedback-images` bucket is public so uploaded photos can be displayed.

## Gallery setup

- Brand logo: `public/assets/brand/`
- Meghalaya photos: `public/assets/destinations/meghalaya/`
- Arunachal Pradesh photos: `public/assets/destinations/arunachal-pradesh/`
- Uttar Pradesh photos: `public/assets/destinations/uttar-pradesh/`
- Customer upload previews: handled in the form and can later be sent to Supabase Storage

## Feedback storage note

Feedback and traveler images are stored in Supabase when the environment variables are present.
If Supabase is not configured, the form falls back to local browser storage for development only.

## Suggested free stack

- Hosting: Vercel
- Database for shared feedback: Supabase free tier
- Image storage: Supabase Storage free tier

## Brand details used in the app

- Company name: Romify Travels
- Phone numbers: +91 81155 75830, +91 81288 17889
- Address: N9/61-3-1 Chhoti Patiya, Bajardiha, Varanasi 221109