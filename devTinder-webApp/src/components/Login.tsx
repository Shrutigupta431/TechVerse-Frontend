import React, { useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants/url";
const Login = () => {
  const [emailId, setEmailId] = useState("shruu@gmail.com");
  const [password, setPassword] = useState("Shruu@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    
    try {
      const res = await axios.post(
       BASE_URL + "/login",
        { password, emailId },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/")
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="flex justify-center p-5">
      <div className="card card-side bg-base-100 shadow-sm">
        <figure>
          <img src={logo} alt="Logo" className="w-100 h-100 object-contain" />
        </figure>
        <div className="card-body">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend font-bold text-xl ">
              Login
            </legend>

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-neutral mt-4" onClick={handleLogin}>
              Login
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
