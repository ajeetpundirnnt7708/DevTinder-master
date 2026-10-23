# DevTinder — Frontend

React 19 + Vite + Redux Toolkit + Tailwind CSS 4 + daisyUI.

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
```

The backend should be running on `http://localhost:3000` (see the backend
README). Create `my-project/.env` if the API lives elsewhere:

```env
VITE_API_URL=http://localhost:3000
```

In production the app falls back to `https://<your-frontend-domain>/api`, so
set `VITE_API_URL` to the deployed backend URL in Vercel → Project → Settings →
Environment Variables, then redeploy. Example:

```env
VITE_API_URL=https://your-backend.onrender.com
```

> `https://dev-tinder.site` no longer resolves (NXDOMAIN), which is why the
> deployed app could not reach the API. Point this variable at the new backend
> deployment.

## Build

```bash
npm run build
npm run preview
```

`vercel.json` contains the SPA rewrite so routes like `/feed` work when opened
directly.

## Demo account

After running `npm run seed` in the backend:

- Email: `demo@devtinder.dev`
- Password: `Demo@1234`
