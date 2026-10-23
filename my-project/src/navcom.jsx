import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "./utils/userSlice";
import { addFeed } from "./utils/feedslice";
import { addconnections } from "./utils/connectionslise";
import { addRequest } from "./utils/requestslice";
import { TOKEN_KEY } from "./utils/constant";

const navLinks = [
  { to: "/feed", label: "Feed" },
  { to: "/connections", label: "Connections" },
  { to: "/request", label: "Requests" },
  { to: "/profile", label: "Profile" },
];

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-white/10 text-white"
      : "text-slate-400 hover:bg-white/5 hover:text-white"
  }`;

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      dispatch(removeUser());
      dispatch(addFeed([]));
      dispatch(addconnections(null));
      dispatch(addRequest([]));
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <nav className="app-container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-accent-400 text-lg shadow-lg shadow-brand-600/30">
            💜
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Dev<span className="text-brand-300">Tinder</span>
          </span>
        </Link>

        {user ? (
          <>
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs text-slate-500">Welcome back</p>
                <p className="text-sm font-semibold text-white">
                  {user.firstName} {user.lastName}
                </p>
              </div>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar cursor-pointer rounded-full ring-2 ring-brand-500/40 ring-offset-2 ring-offset-ink-950 transition hover:ring-brand-400"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt={`${user.firstName}'s avatar`}
                      src={
                        user.photoUrl ||
                        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                      }
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";
                      }}
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-50 mt-3 w-56 gap-1 rounded-2xl border border-white/10 bg-ink-800/95 p-2 shadow-2xl backdrop-blur-xl"
                >
                  {navLinks.map((link) => (
                    <li key={link.to} className="md:hidden">
                      <NavLink to={link.to} className="text-slate-300">
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="font-medium text-rose-300 hover:bg-rose-500/10 hover:text-rose-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden text-sm font-medium text-slate-300 hover:text-white sm:block">
              Log in
            </Link>
            <Link to="/login" className="btn-brand px-4 py-2 text-sm">
              Get started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
