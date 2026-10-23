import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "./userSlice";
import Feedcard from "../assets/feedcard";
import { BASE_URL } from "./constant";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  console.log("Edit profile message", user)

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [age, setAge] = useState(user?.age || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [showToast, setShowToast] = useState(false);

  // Update states when user changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAbout(user.about || "");
      setAge(user.age || "");
      setSkills(user.skills || "");
      setPhotoUrl(user.photoUrl || "");
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const SaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL+"/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          skills,
          photoUrl
        },
        { withCredentials: true }
      );
      console.log("API Response:", res.data);
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };
return (
  <div className="flex justify-center ">
    
    {/* ===== Form Section ===== */}
    <div className="justify-items-center mt-4 px-10 h-auto">
      <fieldset className="fieldset bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-box w-xs p-6 shadow-xl">

        <label className="label text-indigo-300 font-mono font-semibold -mt-3">
          First Name
        </label>
        <input
          type="text"
          className="input bg-slate-700 text-indigo-100 placeholder-indigo-300
          focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label text-indigo-300 font-mono font-semibold">
          Last Name
        </label>
        <input
          type="text"
          className="input bg-slate-700 text-indigo-100
          focus:ring-2 focus:ring-indigo-500 font-mono"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label text-indigo-300 font-mono font-semibold">
          Age
        </label>
        <input
          type="text"
          className="input bg-slate-700 text-indigo-100
          focus:ring-2 focus:ring-indigo-500 font-mono"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label text-indigo-300 font-mono font-semibold">
          About
        </label>
        <input
          type="text"
          className="input bg-slate-700 text-indigo-100 font-mono
          focus:ring-2 focus:ring-indigo-500"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <label className="label text-indigo-300 font-mono font-semibold">
          Skills
        </label>
        <textarea
          className="textarea textarea-bordered h-24 resize-none
          bg-slate-700 text-indigo-100 font-mono
          focus:ring-2 focus:ring-indigo-500"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, Node, MongoDB..."
        />

        <label className="label text-indigo-300 font-mono font-semibold">
          Photo URL
        </label>
        <input
          type="text"
          className="input bg-slate-700 text-indigo-100 font-mono
          focus:ring-2 focus:ring-indigo-500"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <button
          className="btn mt-4 bg-indigo-600 hover:bg-indigo-500 border-none
          text-white font-mono tracking-wide shadow-md"
          onClick={SaveProfile}
        >
          Save
        </button>
      </fieldset>
    </div>

    {/* ===== Preview ===== */}
    <div className="mt-10">
      <Feedcard
        preview
        user={{
          id: "xyz",
          firstName,
          lastName,
          age,
          photoUrl,
          skills,
          about,
        }}
      />
    </div>

    {/* Toast */}
    {showToast && (
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2
      bg-emerald-500 text-white px-6 py-2 rounded-lg shadow-xl z-50 font-mono">
        Profile Saved Successfully
      </div>
    )}
  </div>
);
}
export default EditProfile;
//   return (<div className="flex justify-center">
//     <div className="justify-items-center mt-10 px-10 h-auto ">
//       <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
//         <label className="label text-blue-50 font-mono font-bold">First Name

//         </label>

//         <input type="text" className="input text-blue-50 font-mono font-bold" value={firstName} onChange={(e) => setFirstName(e.target.value)} /> <label className="label text-blue-50 font-mono font-bold">Last Name</label>
//         <input type="text" className="input text-blue-50 font-mono font-bold" value={lastName} onChange={(e) => setLastName(e.target.value)} /> <label className="label text-blue-50 font-mono font-bold">age</label>
//         <input type="text" className="input text-blue-50 font-mono font-bold" value={age} onChange={(e) => setAge(e.target.value)} /> <label className="label text-blue-50 font-mono font-bold">About</label> <input type="text" className="input h-10 text-blue-50 font-mono font-bold" value={about} onChange={(e) => setAbout(e.target.value)} />
//         <label className="label text-blue-50 font-mono font-bold">Skills</label>
//         <textarea className="textarea textarea-bordered h-24 text-blue-50 bg-base-300 resize-none font-mono font-bold" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Enter your skills..." />
//         <label className="label text-blue-50 font-mono font-bold">Photo URL</label>
//         <input type="text" className="input h-10 text-blue-50 font-mono font-bold" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
//         <button className="btn btn-primary font-mono font-bold" onClick={SaveProfile}> Save </button> </fieldset> </div> <div className="mt-10">
//       <Feedcard preview user={{ id: "xyz", firstName, lastName, age, photoUrl, skills, about }} />
//     </div> {showToast && (<div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"> Profile Saved Successfully </div>)} </div>);
// };


