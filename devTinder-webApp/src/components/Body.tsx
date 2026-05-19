import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./NavBar";
import Foter from "./Foter";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Foter />
    </div>
  );
};

export default Body;
