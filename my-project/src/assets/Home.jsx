import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const features = [
  {
    icon: "🧑‍💻",
    title: "Developer-first profiles",
    text: "Show your stack, your story and what you love building — not just a selfie.",
  },
  {
    icon: "⚡",
    title: "Instant connections",
    text: "Swipe through the feed, send a request and start pairing up in seconds.",
  },
  {
    icon: "🔒",
    title: "Safe by design",
    text: "JWT-based auth, httpOnly cookies and per-request authorization.",
  },
];

const Home = () => {
  const user = useSelector((store) => store.user);

  if (user) return <Navigate to="/feed" replace />;

  return (
    <div className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl animate-pulse-slow" />
      <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl animate-pulse-slow animation-delay-200" />

      <section className="app-container relative flex flex-col items-center pt-16 pb-20 text-center sm:pt-24">
        <span className="chip animate-fade-up gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Built for developers, by developers
        </span>

        <h1 className="mt-6 max-w-4xl animate-fade-up font-display text-4xl font-bold leading-tight text-white animation-delay-100 sm:text-6xl lg:text-7xl">
          Find your next <span className="brand-gradient-text">dev match</span>
        </h1>

        <p className="mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-slate-300 animation-delay-200 sm:text-lg">
          DevTinder connects you with developers who share your stack, your
          curiosity and your late-night debugging energy. Build something great
          with someone great.
        </p>

        <div className="mt-9 flex animate-fade-up flex-col gap-3 animation-delay-300 sm:flex-row">
          <Link to="/login" className="btn-brand">
            Get started — it's free
            <span aria-hidden>→</span>
          </Link>
          <Link to="/login" className="btn-ghost-brand">
            I already have an account
          </Link>
        </div>

        <div className="mt-14 grid w-full max-w-3xl animate-fade-up grid-cols-3 gap-4 animation-delay-300">
          {[
            ["10k+", "Developers"],
            ["50k+", "Connections"],
            ["120+", "Tech stacks"],
          ].map(([value, label]) => (
            <div key={label} className="glass-panel px-4 py-5">
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="app-container relative pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card group p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand-400/30 hover:bg-white/[0.06]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-brand-500/10 text-2xl transition group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="glass-card mt-14 flex flex-col items-center justify-between gap-6 overflow-hidden p-8 sm:flex-row sm:p-10">
          <div>
            <h2 className="text-2xl font-bold text-white">Ready to meet your people?</h2>
            <p className="mt-2 text-sm text-slate-400">
              Create a profile in under a minute. No resumes, no recruiters — just devs.
            </p>
          </div>
          <Link to="/login" className="btn-brand shrink-0">
            Join DevTinder
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
