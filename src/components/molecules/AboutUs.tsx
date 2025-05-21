import React from "react";

interface AboutUsSectionProps {
  image: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  children: React.ReactNode;
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  image,
  imageAlt = "About image",
  imagePosition = "left",
  children,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        imagePosition === "right" ? "md:flex-row-reverse" : ""
      } items-center gap-10 my-14`}
    >
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src={image}
          alt={imageAlt}
          className="rounded-2xl shadow-lg object-cover max-h-72 md:w-[90%]"
        />
      </div>
      <div className="md:w-1/2 w-full text-gray-800 text-base">{children}</div>
    </div>
  );
};

export default AboutUsSection;
