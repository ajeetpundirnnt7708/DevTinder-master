import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";


const RequestCard = ({ user }) => {
    const fromUser = user?.fromUserid;
    const [hidebtn,setHidebtn]=useState(true);


    if (!fromUser) return null;

    const {
        firstName,
        lastName,
        age,
        photoUrl,
        about,
        skills = [],
        _id = [],
    } = fromUser;

    const handlerequest = async (status) => {
        try {
            setHidebtn((prev)=>!prev);
            const res = await axios.post(
                BASE_URL+`/request/review/${status}/${_id}`,
                {},
                { withCredentials: true }
            );

        } catch (error) {
            console.log(error.message)

        }

    }
    return (
        <div className="flex items-center justify-between 
                p-4 mb-3 rounded-xl shadow-md 
                bg-base-200 
                w-full max-w-3xl mx-auto ">


            {/* Left: Avatar + Info */}
            <div className="flex items-center gap-4">
                <img
                    src={photoUrl}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                    <h3 className="font-semibold text-lg">
                        {firstName} {lastName}
                        {age && <span className="text-sm opacity-60"> • {age}</span>}
                    </h3>

                    <p className="text-sm opacity-70">
                        {about || "No bio available"}
                    </p>

                    {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Actions */}
            {
                hidebtn &&(
                    <div className="flex gap-2">
                <button className="btn btn-sm btn-success" onClick={() => handlerequest('accepted')}>
                    Accept
                </button>
                <button className="btn btn-sm btn-error" onClick={() => handlerequest("rejected")}>
                    Reject
                </button>
            </div>
                )
            }
        </div>
    );
};

export default RequestCard;
