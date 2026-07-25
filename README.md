# Gym Tracker

Full-stack workout tracking web app: React frontend + Node/Express backend + SQLite database.

## Stage 1 (this drop): Project scaffold

- Backend: Express server, SQLite schema (users, exercises, labels, workout plans, exercise logs/sets), JWT auth (signup/login/me) with the exact error-handling rules from the spec (duplicate email → offer login, duplicate username → suggest alternatives, wrong login → generic error). Uses Node's built-in `node:sqlite` module (no native compilation, no Visual Studio required — needs Node 22.5+).
- Frontend: Vite + React, React Router, design tokens (colors/fonts/spacing from the brief), light/dark theme context, auth context with "remember me" (localStorage vs sessionStorage), protected `/dashboard` route.
- Nothing is styled yet beyond tokens — placeholder pages just prove the plumbing works end to end (signup → token issued → dashboard accessible → logout).

## Setup

### Backend

```powershell
cd backend
npm install
copy .env.example .env
npm run dev
```

Server runs on `http://localhost:5000`. The SQLite DB file is created automatically at `backend/data/gymtracker.db` on first run.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173` (Vite dev server proxies `/api` calls to the backend on port 5000).

## Next stages

1. ~~Project scaffold~~ ✅
2. Homepage (hero, reviews, features, about) + real Login/Signup UI wired to the API
3. Dashboard shell (sidebar, topbar, theme toggle, routing between dashboard pages)
4. Dashboard home (stat cards, weight goal, volume graph, muscle heatmap)
5. Tracker page (exercise CRUD, workout plan, monthly grid tracker)
6. Analytics page
