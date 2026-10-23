import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addconnections } from "../utils/connectionslise";
import Connectioncard from "./connectioncard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(!connections);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchConnections = async () => {
      try {
        const res = await axios.get("/user/connections");
        if (active) dispatch(addconnections(res.data?.data || []));
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message || "Could not load your connections."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchConnections();
    return () => {
      active = false;
    };
  }, [dispatch]);

  const list = connections || [];

  return (
    <div className="app-container py-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            Your network
          </p>
          <h1 className="section-title mt-2">Connections</h1>
          <p className="mt-2 text-sm text-slate-400">
            Developers who said yes. Say hello and start building.
          </p>
        </div>
        {list.length > 0 && (
          <span className="chip self-start sm:self-auto">{list.length} connected</span>
        )}
      </div>

      {loading && (
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="glass-card mx-auto max-w-md p-8 text-center">
          <p className="text-3xl">😕</p>
          <p className="mt-3 text-sm text-slate-300">{error}</p>
        </div>
      )}

      {!loading && !error && list.length === 0 && (
        <div className="glass-card mx-auto max-w-md p-10 text-center">
          <p className="text-4xl">🫱🏽‍🫲🏼</p>
          <h2 className="mt-4 text-xl font-semibold text-white">No connections yet</h2>
          <p className="mt-2 text-sm text-slate-400">
            Browse the feed and send a few connection requests to get started.
          </p>
          <Link to="/feed" className="btn-brand mt-6">
            Explore the feed
          </Link>
        </div>
      )}

      {!loading && !error && list.length > 0 && (
        <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-2">
          {list.map((user) => (
            <Connectioncard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
