import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-white/10 bg-ink-950/60">
    <div className="app-container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-brand-500 to-accent-400 text-sm">
          💜
        </span>
        <div>
          <p className="text-sm font-semibold text-white">DevTinder</p>
          <p className="text-xs text-slate-500">Where developers meet developers.</p>
        </div>
      </div>

      <div className="flex items-center gap-5 text-sm text-slate-400">
        <Link to="/" className="transition hover:text-white">
          Home
        </Link>
        <Link to="/feed" className="transition hover:text-white">
          Feed
        </Link>
        <Link to="/profile" className="transition hover:text-white">
          Profile
        </Link>
      </div>

      <p className="text-xs text-slate-500">
        © {new Date().getFullYear()} DevTinder. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
