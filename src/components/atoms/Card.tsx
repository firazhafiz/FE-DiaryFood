import React from "react";
import { FiStar } from "react-icons/fi";

interface CardProps {
  title: string;
  image: string;
  time: string | number;
  category: string;
  isFree?: boolean;
  rating?: number;
  author?: {
    name: string;
    avatar: string;
  };
  price?: number;
}

function formatTime(time: string | number) {
  // Remove any 'min' or 'mins' (case-insensitive), trim, and add 'min' at the end
  let t = String(time)
    .replace(/\s*mins?/i, "")
    .trim();
  return `${t} min`;
}

function formatRupiah(price?: number) {
  if (!price) return "";
  return "Rp. " + price.toLocaleString("id-ID", { minimumFractionDigits: 0 });
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  time,
  category,
  isFree = true,
  rating = 4.5,
  author = {
    name: "Gadang Jatu Mahiswara",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  price,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-[270px] min-w-[220px] flex flex-col">
      <img src={image} alt={title} className="w-full h-36 object-cover" />
      <div className="flex-1 flex flex-col p-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span
            className={
              isFree
                ? "text-green-500 font-semibold text-xs"
                : "text-red-500 font-semibold text-xs"
            }
          >
            {isFree ? "Free" : "Paid"}
          </span>
          {!isFree && (
            <span className="text-red-500 font-semibold text-xs">
              {formatRupiah(price)}
            </span>
          )}
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <FiStar className="inline" fill="#FFD700" />
            <span className="text-gray-700 font-medium text-xs">{rating}</span>
          </div>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center mb-5">
          <span className="font-bold text-[color:var(--custom-orange)] text-base">
            {formatTime(time)}
          </span>
        </div>
        <div className="flex items-center pt-2 border-t gap-2">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-gray-800 text-xs font-medium">
            {author.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
