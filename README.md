# Wish Consult Early Access Waitlist

A modern, professional landing page for Wish Consult—a mentorship and learning platform for medical students. Built with Next.js 15, Tailwind CSS v3, and Supabase for waitlist email storage.

## Features
- Professional, exclusive landing page design
- Animated floating lights and medical icons (hydration-safe)
- Waitlist email capture with Supabase backend
- Shows user their waitlist position and special messages for new/returning users
- Animated hero section, 3D cube, countdown timer
- FAQ, social proof, and expert-focused messaging
- Fully responsive and production-ready

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production
```bash
npm run build
npm start
```

## Environment Variables
- Configure your Supabase credentials in a `.env` file for waitlist storage.

## Tech Stack
- Next.js 15 (App Router, React Server Components)
- Tailwind CSS v3
- Framer Motion (animations)
- Supabase (waitlist backend)

## Customization
- Main page: `src/app/page.tsx`
- Styles: `src/app/globals.css`, `tailwind.config.js`
- Actions/server logic: `src/app/actions.ts`

## Notes
- All floating lights/particles use predefined positions for hydration safety.
- Linting and build warnings are resolved.

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)

## Deploy
Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.
