const FALLBACK_AVATAR =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";

const Connectioncard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, age, about, skills = [], photoUrl } = user;
  const skillList = Array.isArray(skills)
    ? skills
    : String(skills)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

  return (
    <div className="glass-card group flex items-start justify-between gap-4 p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-400/30 hover:bg-white/[0.06]">
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
          <h3 className="truncate text-base font-semibold text-white">
            {firstName} {lastName}
            {age && <span className="font-normal text-slate-500"> · {age}</span>}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-sm text-slate-400">
            {about || "No bio yet."}
          </p>

          {skillList.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skillList.slice(0, 4).map((skill) => (
                <span key={skill} className="chip px-2 py-0.5 text-[11px]">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <span className="shrink-0 self-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300">
        Connected ✓
      </span>
    </div>
  );
};

export default Connectioncard;
