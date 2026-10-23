const Connectioncard=({user})=>{
    console.log("current user is",user)
    const {firstName,lastName,age,about,skills,photoUrl}=user||"";
    if(user===null)return ;

    return(
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
                    <h3 className="font-bold font-mono text-lg">
                        {firstName} {lastName}
                        {age && <span className="text-sm opacity-60"> • {age}</span>}
                    </h3>

                    <p className="text-sm opacity-70 font-semibold font-mono">
                        {about || "No bio available"}
                    </p>
                </div>
            </div>

            <div className="flex gap-2 font-bold  ">
                <button className="btn btn-sm btn-success text-black font-mono">
                    Message
                </button>
            </div>
        </div>

    )
}
export default Connectioncard;