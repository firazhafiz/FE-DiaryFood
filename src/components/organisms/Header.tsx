import React, { Suspense } from "react";
import NavbarHome from "./NavbarHome";
import Hero from "../atoms/Hero";

const Header: React.FC = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <NavbarHome />
      </Suspense>
      <Hero />
    </div>
  );
};

export default Header;
