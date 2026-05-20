import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./NavBar";
import Foter from "./Foter";
import { BASE_URL } from "../utils/constants/url";
import axios from "axios";
import { addUser } from "../utils/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(store=>store.user);
  const fetchUser = async () => {
    try {
      if (userData) return ;
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Foter />
    </div>
  );
};

export default Body;
