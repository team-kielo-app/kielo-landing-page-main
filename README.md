# Kielo Landing Page

A modern, SEO-optimized landing page for the Kielo Finnish language learning app, built with Next.js 15 and App Router.

## Features

- ✨ Modern, responsive design with smooth animations
- 🎯 SEO optimized with metadata, sitemap, and robots.txt
- 📱 Mobile-first responsive layout
- 🔗 Placeholder pages ready for content (About, Blog, Privacy, Terms)
- 🚀 Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── about/          # About Us page
│   ├── blog/           # Blog page (placeholder)
│   ├── privacy/        # Privacy Policy page
│   ├── terms/          # Terms of Service page
│   ├── globals.css     # Global styles and design system
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Main landing page
│   ├── sitemap.ts      # Auto-generated sitemap
│   └── robots.ts       # Robots.txt config
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section with mascot placeholder
│   ├── Features.tsx    # Feature cards grid
│   ├── DownloadCTA.tsx # Download section with QR code
│   └── Footer.tsx      # Footer with copyright
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or use the CLI:

```bash
npm i -g vercel
vercel
```

## Customization

### Replace Placeholders

- **Images**: Replace emoji placeholders in components with actual image files
- **Animations**: Add Lottie or Framer Motion for mascot animations
- **App Store Links**: Update href values in Hero.tsx and DownloadCTA.tsx
- **QR Code**: Replace QR placeholder with actual app download QR code

### Add Blogging

Install MDX support for blog functionality:

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

## License

© 2024 Kielo. All rights reserved.
