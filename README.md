# Uncoached

A modern wellness and personal development platform built with React. Uncoached provides members with guided tools including audio breaths, guided shifts, pocket prompts, clarity cards, affirmations, and voice notes — all behind a subscription-based paywall.

## Tech Stack

### Frontend

- **React 19** — UI library
- **Vite 7** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first CSS framework
- **React Router 7** — Client-side routing
- **Supabase JS** — Authentication and database client

### Backend

- **Node.js + Express** — API server
- **Stripe** — Payment processing and subscription management
- **Supabase Admin SDK** — Server-side database operations
- **CORS** — Cross-origin resource sharing
- **dotenv** — Environment variable management

## Project Structure

```
uncoached-react/
├── public/                  # Static assets
├── server/                  # Express API server
│   ├── routes/
│   │   ├── stripe.js        # Stripe checkout & webhook routes
│   │   └── audio.js         # Audio content routes
│   ├── supabaseAdmin.js     # Supabase admin client
│   └── index.js             # Server entry point
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── about/           # About page sections
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication state
│   ├── lib/
│   │   └── supabase.js       # Supabase client init
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── PricingPage.jsx
│   │   ├── SignInPage.jsx
│   │   ├── SignUpPage.jsx
│   │   └── member/           # Protected member pages
│   │       ├── DashboardPage.jsx
│   │       ├── FieldPage.jsx
│   │       ├── AudioBreathsPage.jsx
│   │       ├── AudioBreathPlayerPage.jsx
│   │       ├── GuidedShiftsPage.jsx
│   │       ├── PocketPromptsPage.jsx
│   │       ├── ClarityCardsPage.jsx
│   │       ├── AffirmationsPage.jsx
│   │       └── VoiceNotesPage.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env.example             # Frontend env template
└── server/.env.example      # Backend env template
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- A [Supabase](https://supabase.com/) project
- A [Stripe](https://stripe.com/) account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/uncoached-react.git
   cd uncoached-react
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**

   Copy the example env files and fill in your credentials:

   ```bash
   cp .env.example .env.local
   cp server/.env.example server/.env
   ```

   See the `.env.example` files for required variables.

### Running Locally

Start the frontend dev server:

```bash
npm run dev
```

Start the backend API server (in a separate terminal):

```bash
cd server
npm run dev
```

The frontend runs on `http://localhost:5173` and the API server on `http://localhost:3001`.

### Building for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Environment Variables

### Frontend (`.env.local`)

| Variable                          | Description               |
| --------------------------------- | ------------------------- |
| `VITE_SUPABASE_URL`               | Supabase project URL      |
| `VITE_SUPABASE_ANON_KEY`          | Supabase public anon key  |
| `VITE_API_URL`                    | Backend API URL            |
| `VITE_STRIPE_MONTHLY_PRICE_ID`    | Stripe monthly price ID   |
| `VITE_STRIPE_QUARTERLY_PRICE_ID`  | Stripe quarterly price ID |
| `VITE_STRIPE_BIANNUAL_PRICE_ID`   | Stripe biannual price ID  |
| `VITE_STRIPE_ANNUAL_PRICE_ID`     | Stripe annual price ID    |

### Backend (`server/.env`)

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| `SUPABASE_URL`             | Supabase project URL         |
| `SUPABASE_SERVICE_ROLE_KEY`| Supabase service role key    |
| `STRIPE_SECRET_KEY`        | Stripe secret key            |
| `STRIPE_WEBHOOK_SECRET`    | Stripe webhook signing secret|
| `FRONTEND_URL`             | Frontend URL for redirects   |
| `PORT`                     | Server port (default: 3001)  |

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start Vite dev server          |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview production build       |
| `npm run lint`    | Run ESLint                     |
