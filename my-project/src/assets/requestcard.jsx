import axios from "axios";
import { useState } from "react";

const FALLBACK_AVATAR =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";

const RequestCard = ({ request, onReviewed }) => {
  // `request` is the connection-request document; `fromUser` is the sender.
  const fromUser = request?.fromUserid;
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");

  if (!fromUser) return null;

  const { firstName, lastName, age, photoUrl, about, skills = [] } = fromUser;
  const skillList = Array.isArray(skills)
    ? skills
    : String(skills)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

  const handleRequest = async (status) => {
    setPending(status);
    setError("");
    try {
      // The backend expects the connection-request id, not the sender's id.
      await axios.post(`/request/review/${status}/${request._id}`, {});
      onReviewed?.(request._id);
    } catch (err) {
      setError(err.response?.data?.message || "Could not update this request.");
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="glass-card mx-auto flex w-full max-w-3xl flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="shrink-0 rounded-full bg-linear-to-br from-brand-400 to-accent-400 p-[2px]">
          <img
            src={photoUrl || FALLBACK_AVATAR}
            alt={`${firstName || "Developer"}'s avatar`}
            onError={(event) => {
              event.currentTarget.src = FALLBACK_AVATAR;
            }}
            className="h-14 w-14 rounded-full border-2 border-ink-900 object-cover"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white">
            {firstName} {lastName}
            {age && <span className="font-normal text-slate-500"> · {age}</span>}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-sm text-slate-400">
            {about || "No bio yet."}
          </p>

          {skillList.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skillList.slice(0, 5).map((skill) => (
                <span key={skill} className="chip px-2 py-0.5 text-[11px]">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
        </div>
      </div>

      <div className="flex shrink-0 gap-2 self-end sm:self-center">
        <button
          onClick={() => handleRequest("rejected")}
          disabled={Boolean(pending)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-200 disabled:opacity-50"
        >
          {pending === "rejected" ? "Rejecting…" : "Reject"}
        </button>
        <button
          onClick={() => handleRequest("accepted")}
          disabled={Boolean(pending)}
          className="rounded-xl bg-linear-to-r from-emerald-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 disabled:opacity-50"
        >
          {pending === "accepted" ? "Accepting…" : "Accept"}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
