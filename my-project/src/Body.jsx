import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./navcom";
import Footer from "./Footer";
import { addUser } from "./utils/userSlice";

const PUBLIC_ROUTES = ["/", "/login"];

const PageLoader = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4">
    <div className="relative flex h-16 w-16 items-center justify-center">
      <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/30" />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl">
        💜
      </span>
    </div>
    <p className="text-sm font-medium text-slate-400">Connecting to DevTinder…</p>
  </div>
);

const Body = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      if (userData) {
        setCheckingSession(false);
        return;
      }
      try {
        const res = await axios.get("/profile/view");
        if (active) dispatch(addUser(res.data.message));
      } catch (error) {
        // 401 simply means "not logged in". Everything else is logged so the
        // real cause (CORS / server down) is visible in the console.
        if (error.response?.status !== 401) {
          console.error("Could not restore session:", error.message);
        }
      } finally {
        if (active) setCheckingSession(false);
      }
    };

    fetchUser();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checkingSession && !PUBLIC_ROUTES.includes(location.pathname)) {
    return <PageLoader />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
