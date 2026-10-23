// Central place for the API URL.
//
// Set VITE_API_URL in a .env file (or in Vercel's project settings) when the
// backend lives on another domain, for example:
//   VITE_API_URL=https://dev-tinder.site
//
// Note: the backend exposes its routes both at `/` and `/api`, so either URL
// works. Previously this file pointed to `https://dev-tinder.site/api` *and*
// appended `/profile/view`, which produced `.../api/profile/view` and failed.
const { hostname, origin } = window.location;
const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

// In production, always set VITE_API_URL to the deployed backend URL.
// If it is missing we fall back to the same origin (`/api`), which works when
// the frontend and backend are served behind the same domain/reverse proxy.
export const BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (isLocal ? "http://localhost:3000" : `${origin}/api`)
).replace(/\/$/, "");

export const TOKEN_KEY = "devtinder_token";
