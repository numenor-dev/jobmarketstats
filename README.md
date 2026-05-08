# Jobs and Inflation
Production URL: __[jobsandinflation.vercel.app](https://jobsandinflation.vercel.app/)__

A data visualization tool for exploring the relationship between U.S. job market activity and inflation trends over the last 15 years. Built with a focus on interactive charting, animated UI, and modern React patterns.

## How It Works
Jobs and Inflation fetches and simplifies complex job creation/loss data sets from the U.S. Bureau of Labor Statistics and maps it against the Consumer Price Index (CPI) and the historical value of the U.S. dollar. The data is rendered through a high-performance Recharts frontend, providing an interactive lens into macroeconomic trends over the last 15 years.

## Features

* __Interactive Data Visualization:__ Dynamic charts and graphs powered by Recharts for exploring job market and inflation data side by side.
* __Theme Support:__ Seamless light/dark mode switching via next-themes for a comfortable viewing experience in any environment.
* __Smooth Animations:__ Engaging UI transitions and interactions using Motion for a polished, fluid feel.
* __Responsive Design:__ Modern, mobile-first interface built with Tailwind CSS 4.
* __Type-Safe Development:__ End-to-end TypeScript support for enhanced code reliability.

## Tech Stack

* __Framework:__ __[Next.js](https://nextjs.org/)__ (App Router)
* __UI Library:__ __[React](https://react.dev/)__
* __Styling:__ __[Tailwind CSS](https://tailwindcss.com/)__
* __Charting:__ __[Recharts](https://recharts.org/)__
* __Animations:__ __[Motion](https://motion.dev/)__
* __Theme Management:__ __[next-themes](https://github.com/pacocoursey/next-themes)__
* __Icons:__ __[Heroicons](https://heroicons.com/)__
* __Language:__ TypeScript

## Key Engineering Features

**BLS Data Integration**: Structured data pipeline sourcing layoff, job creation, CPI, and dollar value datasets from the U.S. Bureau of Labor Statistics for consistent, reliable rendering.
**Composable Chart Architecture**: Recharts components are built for reusability and extensibility, making it straightforward to add new economic indicators or date ranges.
**Tailwind v4 & TypeScript Compatibility**: Resolved CSS module typing via a custom `globals.d.ts` declaration, enabling Tailwind v4's CSS-first config approach alongside strict TypeScript tooling.

## Getting Started
### Prerequisites

* Node.js 18+
* Yarn package manager

### Installation

1. Clone the repository:
```
git clone https://github.com/numenor-dev/jobs-and-inflation.git
cd jobs-and-inflation
```
2. Install dependencies: `yarn install`
3. Run the development server: `yarn dev`

Open __http://localhost:3000__ in your browser to see the application.

## Scripts
`yarn dev` - Start development server with hot reload

`yarn build` - Build the application for production

`yarn start` - Start the production server

`yarn lint` - Run ESLint to check code quality

## Project Structure
```
jobs-and-inflation/
├── app/                    # Next.js App Router (pages & layouts)
├── public/                 # Static assets (images, icons)
├── package.json
└── tsconfig.json
```