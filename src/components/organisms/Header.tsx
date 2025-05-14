import React from "react";
import NavbarHome from "./NavbarHome";
import Hero from "../atoms/Hero";

const Header: React.FC = () => {
  return (
    <div>
      <NavbarHome />
      <Hero />
    </div>
  );
};

export default Header;
