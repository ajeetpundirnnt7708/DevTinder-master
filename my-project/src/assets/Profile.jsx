import { useSelector } from "react-redux"
import EditProfile from "../utils/EditProfilw"
import Feedcard from "./feedcard"

const Profile=()=>{
    const user=useSelector((store)=>store.user)
    return(
        <>
        <div className="">
            <EditProfile user={user}/>
        </div>
        </>
    )
}
export default Profile