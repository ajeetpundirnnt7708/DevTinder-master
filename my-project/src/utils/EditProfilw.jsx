import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "./userSlice";
import Feedcard from "../assets/feedcard";

const emptyForm = {
  firstName: "",
  lastName: "",
  about: "",
  age: "",
  gender: "",
  skills: "",
  photoUrl: "",
};

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const storeUser = useSelector((store) => store.user);
  const activeUser = user || storeUser;

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!activeUser) return;
    setForm({
      firstName: activeUser.firstName || "",
      lastName: activeUser.lastName || "",
      about: activeUser.about || "",
      age: activeUser.age || "",
      gender: activeUser.gender || "",
      skills: Array.isArray(activeUser.skills)
        ? activeUser.skills.join(", ")
        : activeUser.skills || "",
      photoUrl: activeUser.photoUrl || "",
    });
  }, [activeUser]);

  if (!activeUser) {
    return (
      <div className="app-container py-16">
        <div className="glass-card mx-auto max-w-md p-8 text-center text-slate-400">
          Loading your profile…
        </div>
      </div>
    );
  }

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    setToast(null);

    const skills = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skills.length > 10) {
      setToast({ type: "error", message: "You can add up to 10 skills." });
      setSaving(false);
      return;
    }

    try {
      const res = await axios.patch("/profile/edit", {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age === "" ? undefined : Number(form.age),
        gender: form.gender || undefined,
        about: form.about.trim(),
        skills,
        photoUrl: form.photoUrl.trim() || undefined,
      });

      dispatch(addUser(res.data.user));
      setToast({ type: "success", message: "Profile saved successfully." });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      setToast({
        type: "error",
        message: error.response?.data?.message || "Could not save your profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const previewSkills = form.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div className="app-container py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
          Your account
        </p>
        <h1 className="section-title mt-2">Edit profile</h1>
        <p className="mt-2 text-sm text-slate-400">
          Keep it short and human — other developers will see this in their feed.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <form onSubmit={saveProfile} className="glass-card p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="field-label">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                className="field-input"
                value={form.firstName}
                onChange={updateField}
                required
                maxLength={20}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="field-label">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                className="field-input"
                value={form.lastName}
                onChange={updateField}
                maxLength={20}
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
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
                className="field-input"
                value={form.age}
                onChange={updateField}
              />
            </div>
            <div>
              <label htmlFor="gender" className="field-label">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="field-input"
                value={form.gender}
                onChange={updateField}
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="about" className="field-label">
              About you
            </label>
            <textarea
              id="about"
              name="about"
              rows={4}
              maxLength={300}
              className="field-input resize-none"
              value={form.about}
              onChange={updateField}
              placeholder="Frontend engineer who loves design systems, coffee and clean commits."
            />
            <p className="mt-1.5 text-right text-xs text-slate-500">
              {form.about.length}/300
            </p>
          </div>

          <div className="mt-2">
            <label htmlFor="skills" className="field-label">
              Skills
            </label>
            <input
              id="skills"
              name="skills"
              className="field-input"
              value={form.skills}
              onChange={updateField}
              placeholder="React, Node.js, MongoDB, TypeScript"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Separate skills with commas. Up to 10.
            </p>
          </div>

          <div className="mt-5">
            <label htmlFor="photoUrl" className="field-label">
              Photo URL
            </label>
            <input
              id="photoUrl"
              name="photoUrl"
              type="url"
              className="field-input"
              value={form.photoUrl}
              onChange={updateField}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="mt-7 flex items-center gap-3">
            <button type="submit" disabled={saving} className="btn-brand">
              {saving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Saving…
                </>
              ) : (
                "Save changes"
              )}
            </button>
            <button
              type="button"
              className="btn-ghost-brand"
              onClick={() =>
                setForm({
                  firstName: activeUser.firstName || "",
                  lastName: activeUser.lastName || "",
                  about: activeUser.about || "",
                  age: activeUser.age || "",
                  gender: activeUser.gender || "",
                  skills: Array.isArray(activeUser.skills)
                    ? activeUser.skills.join(", ")
                    : activeUser.skills || "",
                  photoUrl: activeUser.photoUrl || "",
                })
              }
            >
              Reset
            </button>
          </div>
        </form>

        <div className="lg:sticky lg:top-24">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Profile preview
          </p>
          <Feedcard
            preview
            user={{
              _id: activeUser._id,
              firstName: form.firstName,
              lastName: form.lastName,
              age: form.age,
              photoUrl: form.photoUrl,
              skills: previewSkills,
              about: form.about,
            }}
          />
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border px-5 py-3 text-sm font-medium shadow-2xl backdrop-blur-xl ${
            toast.type === "success"
              ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
              : "border-rose-400/30 bg-rose-500/15 text-rose-200"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
