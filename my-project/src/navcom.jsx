import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "./utils/userSlice";
import Connections from "./assets/connection";
import { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constant";

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState();
  console.log("naviagetuser is", user);

  const handleLogout = async () => {

    await axios.post(
      BASE_URL+"/logout",
      {},
      { withCredentials: true }
    );
    dispatch(removeUser());
    navigate("/login");
  }

  useEffect(() => {
    setUserData(user);
    console.log("userdata is", userdata)

  }, [user])//
  return (
    <div className="navbar  bg-gradient-to-br from-[#0b0119] to-[#2f0a7f] shadow-2xl ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-mono font-bold ">DevTinder👩‍💻</Link>
      </div>
      <div className="flex gap-2">
        {
          user && (
            <p className=" font-mono font-semibold text-xl"> Welcome {userdata?.firstName}</p>
          )
        }
        <div className="dropdown dropdown-end">
          {
            user && (
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-4">
                {
                  <div className="w-10 rounded-full ">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoUrl || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"} />
                  </div>
                }
              </div>
            )
          }
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="font-mono font-bold">
                Profile <span className="badge">New</span>
              </Link>
            </li>

            <li>
             <Link to="/request" className="font-mono font-bold">
                Request <span className="badge">New</span>
              </Link>
            </li>

            
            <li>
             <Link to="/connections" className="font-mono font-bold">
                Connections <span className="badge">New</span>
              </Link>
            </li>

            <li>
              <button
                className="font-mono font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

            <li>
              <Link to="/feed" className="font-mono font-bold">
                Feed
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </div>
  )
}
export default Navbar;