import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="app-container flex flex-col items-center justify-center py-24 text-center">
    <p className="font-display text-7xl font-bold text-white">404</p>
    <h1 className="mt-3 text-2xl font-semibold text-white">Page not found</h1>
    <p className="mt-2 max-w-sm text-sm text-slate-400">
      The page you're looking for doesn't exist — maybe it shipped to production
      without you.
    </p>
    <Link to="/" className="btn-brand mt-7">
      Back to home
    </Link>
  </div>
);

export default NotFound;
