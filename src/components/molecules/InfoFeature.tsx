"use client";

import React from "react";

interface InfoFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoFeature: React.FC<InfoFeatureProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center px-4">
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
    <p className="text-sm text-gray-500 text-center">{description}</p>
  </div>
);

export default InfoFeature;
