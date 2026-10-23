import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedslice";
import { useState } from "react";

const FALLBACK_AVATAR =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";

const Feedcard = ({ user, preview = false }) => {
  const dispatch = useDispatch();
  const [pendingAction, setPendingAction] = useState(null);
  const [error, setError] = useState("");

  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, about, skills = [] } = user;
  const skillList = Array.isArray(skills)
    ? skills
    : String(skills)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

  const handleSendRequest = async (status) => {
    if (preview || pendingAction) return;
    setPendingAction(status);
    setError("");
    try {
      await axios.post(`/request/send/${status}/${_id}`, {});
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not send the request.");
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm animate-fade-up">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/[0.08] to-white/[0.03] p-1 shadow-2xl shadow-black/50">
        <div className="relative overflow-hidden rounded-[1.35rem] bg-ink-900">
          {/* Cover */}
          <div className="relative h-44 bg-linear-to-br from-brand-600/70 via-brand-500/30 to-accent-400/40">
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          </div>

          {/* Avatar */}
          <div className="relative -mt-14 flex justify-center">
            <div className="rounded-full bg-linear-to-br from-brand-400 to-accent-400 p-[3px] shadow-xl shadow-brand-600/30">
              <img
                src={photoUrl || FALLBACK_AVATAR}
                alt={`${firstName || "Developer"}'s avatar`}
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_AVATAR;
                }}
                className="h-28 w-28 rounded-full border-4 border-ink-900 object-cover"
              />
            </div>
          </div>

          <div className="px-6 pb-7 pt-4 text-center">
            <h2 className="text-2xl font-bold text-white">
              {firstName} {lastName}
              {age && <span className="font-normal text-slate-400">, {age}</span>}
            </h2>

            <p className="mt-3 min-h-10 text-sm leading-relaxed text-slate-300">
              {about || "This developer is still writing their story."}
            </p>

            {skillList.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {skillList.slice(0, 6).map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {!preview && (
              <>
                <div className="mt-7 flex items-center justify-center gap-8">
                  <button
                    onClick={() => handleSendRequest("ignore")}
                    disabled={Boolean(pendingAction)}
                    aria-label="Skip this developer"
                    className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl transition hover:scale-105 hover:border-rose-400/60 hover:bg-rose-500/15 active:scale-95 disabled:opacity-50"
                  >
                    <span className="transition group-hover:scale-110">✕</span>
                  </button>

                  <button
                    onClick={() => handleSendRequest("interested")}
                    disabled={Boolean(pendingAction)}
                    aria-label="Send connection request"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-500 text-2xl text-white shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-400/10 transition hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {pendingAction === "interested" ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/50 border-t-white" />
                    ) : (
                      "♥"
                    )}
                  </button>
                </div>
                {error && (
                  <p className="mt-4 text-xs text-rose-300" role="alert">
                    {error}
                  </p>
                )}
              </>
            )}

            {preview && (
              <div className="mt-7 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-slate-400">
                Live preview of your public profile
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedcard;
