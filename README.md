# Azure Demand Forecasting & Capacity Optimization (Frontend)

A React + Vite dashboard for monitoring Azure resource usage, visualizing forecasts, and reviewing cost/optimization reports.

## Tech Stack
- React 18 + Vite
- react-router-dom
- chart.js + react-chartjs-2
- CSS (modular component styles)
- ESLint + Prettier (recommended)

## Features
- Dashboard layout with Header, Sidebar, and Main content
- Routing (Usage Trends, Forecasts, Reports)
- Mock visualizations with Chart.js
- API service placeholders with loading/error states
- Filters, tables (sorting/pagination/export), and responsive UI

## Project Structure (frontend/)
```
src/
  components/
    charts/                # Reusable chart components
    filters/               # FilterPanel
    data/                  # DataTable
  data/                    # Mock chart/table data
  hooks/                   # useApi hook
  pages/                   # UsageTrends, Forecasts, Reports
  services/                # api.js (placeholder API layer)
  styles/                  # Global/additional styles (if any)
  App.jsx
  main.jsx
```

## Getting Started
1) Prerequisites
- Node.js 18+ and npm

2) Install
```bash
npm install
```

3) Environment Variables (Vite requires VITE_ prefix)
Create a `.env` file (or use `.env.local`) from `.env.example`:
```
VITE_API_URL=http://localhost:8000/api
```
Note: Step 4 uses mock data; real API not required yet.

4) Run
```bash
npm run dev
```
Open the printed localhost URL.

## Data Flow
- Pages call functions from `src/services/api.js` (e.g., `getCPUUsageTrends`).
- These functions currently return mock objects from `src/data/mockData.js` after a simulated delay.
- When you introduce real data:
  - Option A: Frontend-only — load and parse CSV (Papaparse/d3), store in state, feed into charts.
  - Option B (recommended): Backend endpoint returns JSON; replace mock functions in `api.js` with `fetch` calls to `VITE_API_URL`.

## Linting & Formatting (recommended)
Install tools:
```bash
npm i -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import eslint-config-prettier
```
Then run:
```bash
npx eslint "src/**/*.{js,jsx}" --fix
npx prettier "src/**/*.{js,jsx,css,md}" --write
```

## Scripts (optional to add in package.json)
```json
{
  "scripts": {
    "lint": "eslint \\"src/**/*.{js,jsx}\\"",
    "lint:fix": "eslint \\"src/**/*.{js,jsx}\\" --fix",
    "format": "prettier \\"src/**/*.{js,jsx,css,md}\\" --write"
  }
}
```

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for branch strategy, commit conventions, and PR process.

## Code of Conduct
See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Notes
- Vite env vars must start with `VITE_`.
- If you see `process is not defined`, replace `process.env` with `import.meta.env`.