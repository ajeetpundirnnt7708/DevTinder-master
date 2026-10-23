import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../utils/constant";

const initialForm = {
  firstName: "",
  lastName: "",
  emailId: "",
  password: "",
  age: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  if (user) return <Navigate to="/feed" replace />;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLoginForm) {
        const res = await axios.post("/login", {
          emailId: form.emailId.trim(),
          password: form.password,
        });
        localStorage.setItem(TOKEN_KEY, res.data.token);
        dispatch(addUser(res.data.user));
        navigate("/feed");
      } else {
        const res = await axios.post("/signup", {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          emailId: form.emailId.trim(),
          password: form.password,
          age: form.age ? Number(form.age) : undefined,
        });
        localStorage.setItem(TOKEN_KEY, res.data.token);
        dispatch(addUser(res.data.user));
        navigate("/profile");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (err.code === "ERR_NETWORK"
          ? "Cannot reach the server. Please try again in a moment."
          : "Something went wrong. Please try again.");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLoginForm((value) => !value);
    setError("");
  };

  return (
    <div className="app-container flex items-center justify-center py-12 sm:py-16">
      <div className="glass-card grid w-full max-w-4xl overflow-hidden md:grid-cols-2">
        {/* Brand panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-brand-600/30 via-ink-800/80 to-ink-900 p-10 md:flex">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-accent-400/20 blur-3xl" />

          <div className="relative">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500 to-accent-400 text-xl shadow-lg shadow-brand-600/40">
              💜
            </span>
            <h2 className="mt-8 text-3xl font-bold leading-tight text-white">
              Code is better <br />
              <span className="brand-gradient-text">with company.</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300">
              Meet developers who get excited about the same problems you do.
              Swap ideas, pair program, or build your next side project together.
            </p>
          </div>

          <div className="relative mt-10 space-y-3">
            {[
              ["🚀", "Match by stack and interests"],
              ["🤝", "Send and accept connection requests"],
              ["✨", "Make your profile stand out"],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  {icon}
                </span>
                {text}
              </div>
            ))}
          </div>
        </aside>

        {/* Form panel */}
        <div className="p-7 sm:p-10">
          <h1 className="text-2xl font-bold text-white">
            {isLoginForm ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            {isLoginForm
              ? "Log in to see who's waiting in your feed."
              : "A few details and you're ready to mingle."}
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            {!isLoginForm && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="field-label">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    maxLength={20}
                    value={form.firstName}
                    onChange={updateField}
                    placeholder="Ada"
                    className="field-input"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="field-label">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    maxLength={20}
                    value={form.lastName}
                    onChange={updateField}
                    placeholder="Lovelace"
                    className="field-input"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="emailId" className="field-label">
                Email
              </label>
              <input
                id="emailId"
                name="emailId"
                type="email"
                autoComplete="email"
                required
                value={form.emailId}
                onChange={updateField}
                placeholder="you@example.com"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="field-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLoginForm ? "current-password" : "new-password"}
                  required
                  value={form.password}
                  onChange={updateField}
                  placeholder="••••••••"
                  className="field-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-3 my-auto h-7 rounded-md px-2 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {!isLoginForm && (
                <p className="mt-1.5 text-xs text-slate-500">
                  Min. 8 characters with uppercase, lowercase, number and symbol.
                </p>
              )}
            </div>

            {!isLoginForm && (
              <div>
                <label htmlFor="age" className="field-label">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min={18}
                  max={120}
                  value={form.age}
                  onChange={updateField}
                  placeholder="21"
                  className="field-input"
                />
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
              >
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-brand w-full">
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Please wait…
                </>
              ) : isLoginForm ? (
                "Log in"
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            {isLoginForm ? "New to DevTinder?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-brand-300 transition hover:text-brand-200 hover:underline"
            >
              {isLoginForm ? "Create an account" : "Log in instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
