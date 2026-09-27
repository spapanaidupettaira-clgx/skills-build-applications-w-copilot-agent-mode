# OctoFit Tracker Frontend

The presentation tier is a React 19 application built with Vite and React Router. It provides Activities, Leaderboard, Teams, Users, and Workouts views.

## API configuration

Define `VITE_CODESPACE_NAME` in `.env.local` when using the API in GitHub Codespaces. Set it to the Codespace name only, without a protocol or port:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads this variable at startup, so restart the dev server after changing `.env.local`. The frontend requests resources from `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. If the variable is missing or blank, requests safely fall back to `http://localhost:8000/api/[component]/` rather than creating an `undefined` Codespaces URL.

## Development

Run the frontend from the repository root with `npm run dev --prefix octofit-tracker/frontend`. Verify a production build with `npm run build --prefix octofit-tracker/frontend`.
