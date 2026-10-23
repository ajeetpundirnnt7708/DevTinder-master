import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailID] = useState("something@gmail.com");
  const [password, setPassword] = useState("something@#");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL+"/login", {
        "emailId": emailId, "password": password
      }, { withCredentials: true });

      dispatch(addUser(res.data.user));
      console.log("data is ", res.data.user)
      return navigate("/feed")
    }
    catch (error) {
      setError(error.response.data.message);

    }
  }
  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL+"/signup", {
        "firstName": firstName,
        "lastName": lastName,
        "emailId": emailId,
        "password": password,
        age: age

      }, {
        withCredentials: true
      })
      dispatch(addUser(res.data));
      return navigate("/profile")


    }
    catch (error) {


    }

  }

  return (
<div className="flex justify-center items-center min-h-screen -my-14">
  <div className="card bg-linear-to-br from-slate-800 to-slate-900
      w-96 shadow-2xl border border-slate-700">
    
    <div className="card-body gap-4">

      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-indigo-300 font-mono ">
        {isLoginForm ? "Login" : "Create Account"}
      </h2>

      {/* Signup fields */}
      {!isLoginForm && (
        <>
          <div className="form-control">
            <label className="label text-indigo-300 font-mono font-semibold ">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input bg-slate-700 text-indigo-100 placeholder-indigo-300
              focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>

          <div className="form-control -mt-2">
            <label className="label text-indigo-300 font-mono font-semibold">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input bg-slate-700 text-indigo-100
              focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>

          <div className="form-control -mt-2">
            <label className="label text-indigo-300 font-mono font-semibold">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input bg-slate-700 text-indigo-100
              focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
        </>
      )}

      {/* Email */}
      <div className="form-control -mt-2">
        <label className="label text-indigo-300 font-mono font-semibold">
          Email
        </label>
        <input
          type="email"
          value={emailId}
          onChange={(e) => setEmailID(e.target.value)}
          className="input bg-slate-700 text-indigo-100 placeholder-indigo-300
          focus:ring-2 focus:ring-indigo-500 font-mono"
        />
      </div>

      {/* Password */}
      <div className="form-control -mt-2">
        <label className="label text-indigo-300 font-mono font-semibold">
          Password
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input bg-slate-700 text-indigo-100
          focus:ring-2 focus:ring-indigo-500 font-mono"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm text-center font-mono">
          {error}
        </p>
      )}

      {/* Button */}
      <button
        className="btn mt-2 bg-indigo-600 hover:bg-indigo-500
        border-none text-white font-mono tracking-wide shadow-md"
        onClick={isLoginForm ? handleLogin : handleSignUp}
      >
        {isLoginForm ? "Login" : "Sign Up"}
      </button>

      {/* Switch */}
      <p
        className="text-center text-sm mt-2 cursor-pointer
        text-indigo-400 hover:underline font-mono"
        onClick={() => setIsLoginForm((v) => !v)}
      >
        {isLoginForm
          ? "New user? Create an account"
          : "Already have an account? Login"}
      </p>

    </div>
  </div>
</div>



  )
}
export default Login



