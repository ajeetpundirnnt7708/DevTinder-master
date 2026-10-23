import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedslice";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Feedcard from "./feedcard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(feed.length === 0);
  const [error, setError] = useState("");

  const getFeed = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/user/feed");
      dispatch(addFeed(res.data?.users || []));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't load your feed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (feed.length === 0) getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="app-container py-14">
        <div className="mx-auto h-[26rem] w-full max-w-sm animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container py-20 text-center">
        <div className="glass-card mx-auto max-w-md p-8">
          <p className="text-3xl">😕</p>
          <h2 className="mt-3 text-xl font-semibold text-white">Feed unavailable</h2>
          <p className="mt-2 text-sm text-slate-400">{error}</p>
          <button onClick={getFeed} className="btn-brand mt-6">
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="app-container py-20 text-center">
        <div className="glass-card mx-auto max-w-md p-10">
          <p className="text-4xl">🎉</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">You're all caught up</h2>
          <p className="mt-2 text-sm text-slate-400">
            No new developers to discover right now. Check back soon, or review
            your pending requests.
          </p>
          <Link to="/request" className="btn-ghost-brand mt-6">
            View requests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container py-10">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
          Discover
        </p>
        <h1 className="section-title mt-2">Find your next collaborator</h1>
        <p className="mt-2 text-sm text-slate-400">
          Swipe through developers and send a connection request.
        </p>
      </div>

      <Feedcard key={feed[0]._id} user={feed[0]} />
    </div>
  );
};

export default Feed;
