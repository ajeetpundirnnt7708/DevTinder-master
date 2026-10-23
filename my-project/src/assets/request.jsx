import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestslice";
import { useEffect, useState } from "react";
import RequestCard from "./requestcard";
import { Link } from "react-router-dom";

const Request = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const getRequests = async () => {
      try {
        const res = await axios.get("/user/request");
        if (active) dispatch(addRequest(res.data?.message || []));
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message || "Could not load your requests."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    getRequests();
    return () => {
      active = false;
    };
  }, [dispatch]);

  const handleReviewed = (requestId) => {
    dispatch(addRequest(requests.filter((item) => item._id !== requestId)));
  };

  return (
    <div className="app-container py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
          Inbox
        </p>
        <h1 className="section-title mt-2">Connection requests</h1>
        <p className="mt-2 text-sm text-slate-400">
          Developers who would like to connect with you.
        </p>
      </div>

      {loading && (
        <div className="space-y-4">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="mx-auto h-24 w-full max-w-3xl animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
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

      {!loading && !error && requests?.length === 0 && (
        <div className="glass-card mx-auto max-w-md p-10 text-center">
          <p className="text-4xl">📭</p>
          <h2 className="mt-4 text-xl font-semibold text-white">No pending requests</h2>
          <p className="mt-2 text-sm text-slate-400">
            When someone wants to connect, you'll see them here.
          </p>
          <Link to="/feed" className="btn-brand mt-6">
            Discover developers
          </Link>
        </div>
      )}

      {!loading && !error && requests?.length > 0 && (
        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              onReviewed={handleReviewed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Request;
