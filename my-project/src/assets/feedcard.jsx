// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../utils/feedslice";

// const Feedcard = ({ user }) => {
//   const dispatch = useDispatch();

//   if (!user) return null;

//   const { _id, firstName, lastName, photoUrl, age, about } = user;

//   const handleSendRequest = async (status) => {
//     try {
//       await axios.post(
//         `http://localhost:4003/request/send/${status}/${_id}`,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUserFromFeed());
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="card bg-base-300 w-70 h-auto shadow-sm">
//       <figure>
//         <img
//           src={photoUrl}
//           alt="Shoes"
//           className="h-70 w-70 "
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="text-1.5xl,font-mono font-bold -ml-3">{firstName + " " + lastName + " " + age}
//         </h2>
//         <span className="text-1.5xl font-mono -ml-3 font-bold ">{about}</span>
//         <div className="flex justify-center items-end gap-4 mt-6">

//           <button
//             className="btn btn-circle w-12 h-12 translate-y-3
//                transition-all duration-200 active:scale-90 hover:scale-105"
//             onClick={handleSendRequest}
//           >
//             <span className="text-3xl">🔄️</span>
//           </button>

//           <button
//             className="btn btn-circle w-14 h-14 translate-y-0
//                transition-all duration-200 active:scale-90 hover:scale-105"
//             onClick={handleSendRequest}
//           >
//             <span className="text-3xl">❌</span>
//           </button>

//           <button
//             className="btn btn-circle w-16 h-16 -translate-y-0 shadow-lg
//                transition-all duration-200 active:scale-90 hover:scale-110"
//             onClick={handleSendRequest("interested", _id)}
//           >
//             <span className="text-3xl">💚</span>
//           </button>

//           <button
//             className="btn btn-circle w-12 h-12 translate-y-3
//                transition-all duration-200 active:scale-90 hover:scale-105"
//             onClick={handleSendRequest}
//           >
//             <span className="text-3xl">📍</span>
//           </button>

//       </div>
//     </div>
//   </div>
// );
// }
// export default Feedcard;
// src/components/Feedcard.jsx
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedslice";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";

const Feedcard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, about } = user;

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        BASE_URL+`/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      {/* Background Card */}
      <div className="relative w-80 h-105 rounded-3xl bg-linear-to-br from-[#1e1b4b] to-[#312e81] shadow-2xl ">

        {/* Profile Image */}
        <div className="absolute -top-15 left-1/2 -translate-x-1/2 mt-25">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl">
            <img
              src={photoUrl}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-24 px-6 text-center text-white mt-25">
          <h2 className="text-2xl font-semibold tracking-wide font-mono">
            {firstName} {lastName}
            <span className="text-indigo-300">, {age}</span>
          </h2>

          <p className="mt-3 text-sm text-indigo-200 line-clamp-4 font-mono font-bold">
            {about}
          </p>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-10 px-4">
            <button
              className="btn btn-circle bg-white/10 border-none hover:bg-red-500/80 transition"
              onClick={() => handleSendRequest("ignore")}
            >
              ❌
            </button>

            <button
              className="btn btn-circle w-16 h-16 bg-green-400 text-2xl
              border-none shadow-lg hover:scale-110 active:scale-95 transition"
              onClick={() => handleSendRequest("interested")}
            >
              💚
            </button>

            <button
              className="btn btn-circle bg-white/10 border-none hover:bg-blue-500/80 transition"
              onClick={() => handleSendRequest("maybe")}
            >
              ⭐
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedcard;