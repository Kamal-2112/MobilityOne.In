# MobilityOne — Prosthetics & Orthotics E-Commerce

A modern, accessible, SEO-friendly e-commerce website for premium prosthetics and orthotics products. Built with React, TypeScript, Vite, and Tailwind CSS.

## Overview

MobilityOne is a healthcare e-commerce storefront featuring a clean medical-themed design with a red and pale-pink brand palette. The site includes a product catalog, individual product detail pages, a shopping cart with localStorage persistence, a checkout flow with form validation, and an admin dashboard.

## Main Features

- **Product catalog** with six featured products across four categories (Prosthetics, Orthotics, Mobility Aids, Rehabilitation)
- **Product detail pages** with full descriptions, ratings, quantity selector, and related products
- **Shopping cart** with add/remove items, quantity updates, and persistent storage across page reloads
- **Checkout flow** with validation for name, phone, address, city, and ZIP code
- **Admin dashboard** with order overview, stats, and navigation sidebar
- **SEO optimized** with per-page meta tags, canonical URLs, Open Graph data, JSON-LD structured data (Organization, WebSite, Product, BreadcrumbList), XML sitemap, and robots.txt
- **Accessible** with semantic HTML5, ARIA labels, keyboard navigation, skip-to-content link, and lazy-loaded images
- **Responsive** design for mobile, tablet, and desktop

## Technologies Used

- **React 18** — UI library
- **TypeScript 5** — type safety
- **Vite 7** — build tool and dev server
- **Tailwind CSS 3** — utility-first styling
- **lucide-react** — icon library
- **Supabase** — database and authentication (optional)

## Project Structure

```
mobilityone/
├── public/
│   ├── robots.txt          # SEO crawl directives
│   └── sitemap.xml          # XML sitemap for search engines
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # Shared navigation bar with cart badge
│   │   └── Breadcrumbs.tsx  # Breadcrumb navigation component
│   ├── context/
│   │   └── CartContext.tsx  # Cart state provider with localStorage
│   ├── data/
│   │   └── products.ts     # Product catalog data and types
│   ├── pages/
│   │   ├── Home.tsx         # Homepage with hero, products, categories
│   │   ├── ProductDetails.tsx # Individual product page
│   │   ├── Cart.tsx         # Shopping cart page
│   │   ├── Checkout.tsx     # Checkout with form validation
│   │   ├── Admin.tsx        # Admin dashboard
│   │   └── NotFound.tsx     # 404 page
│   ├── utils/
│   │   └── seo.ts           # SEO metadata management
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   └── index.css           # Global styles and Tailwind imports
├── index.html               # HTML template with base SEO meta
├── tailwind.config.js       # Tailwind theme configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js) or **pnpm**/**yarn**

## Local Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd mobilityone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy the example environment file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your actual Supabase credentials:

   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | No (only for database features) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | No (only for database features) |

Never commit your `.env` file. Only `.env.example` with placeholder values should be in version control.

## Running the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

## Building for Production

```bash
npm run build
```

This outputs optimized files to the `dist/` directory. Preview the production build:

```bash
npm run preview
```

## Type Checking and Linting

```bash
npm run typecheck   # TypeScript type checking
npm run lint        # ESLint
```

## Database Setup (Optional)

If you want to use Supabase for data persistence:

1. Create a project at [supabase.com](https://supabase.com)
2. Set the environment variables in `.env` as described above
3. Create tables and RLS policies as needed for your products and orders

The current product catalog uses local data defined in `src/data/products.ts`.

## Deployment

This project can be deployed to any static hosting provider:

- **Netlify:** Run `npm run build` and deploy the `dist/` folder
- **Vercel:** Import the repository and Vercel will auto-detect Vite
- **GitHub Pages:** Use the `dist/` output with GitHub Actions

Before deploying, update the production domain in:
- `src/utils/seo.ts` — change `SITE_URL` to your actual domain
- `public/robots.txt` — update the sitemap URL
- `public/sitemap.xml` — update all URLs to your domain
- `index.html` — update canonical and Open Graph URLs

## License

This project is provided as-is for educational and commercial use.
