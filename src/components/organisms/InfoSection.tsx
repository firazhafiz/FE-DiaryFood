"use client";

import React from "react";
import InfoFeature from "../molecules/InfoFeature";
import { FaBlender, FaListAlt, FaSmile } from "react-icons/fa";

const InfoSection = () => (
  <div
    className="bg-gradient-to-r from-yellow-50"
    style={{
      backgroundImage:
        "linear-gradient(to right, #FFFBEB, var(--custom-orange, #ff725e) 100%)",
    }}
  >
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl py-8 my-8 flex flex-col md:flex-row justify-around items-center">
      <InfoFeature
        icon={<FaBlender />}
        title="Mudah!"
        description="Mudah Mencari dan membuat artikelnya"
      />
      <InfoFeature
        icon={<FaListAlt />}
        title="Beragam!"
        description="Banyak pilihan artikel yang disediakan"
      />
      <InfoFeature
        icon={<FaSmile />}
        title="Menarik!"
        description="Banyak pilihan artikel menarik"
      />
    </div>
  </div>
);

export default InfoSection;
