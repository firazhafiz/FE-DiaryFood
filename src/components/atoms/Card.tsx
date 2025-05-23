import React from "react";
import { FiStar } from "react-icons/fi";
import Link from "next/link";

interface CardProps {
  id: number;
  nama: string;
  photoResep: string;
  time: string | number;
  category: string;
  isFree?: boolean;
  rating?: number;
  user?: {
    name: string;
    photo: string;
  };
  price?: number;
  slug?: string; // for navigation
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
    avatar: "/assets/images/image_login.jpg",
  },
  price,
  slug,
}) => {
  // Define the navigation path
  const navPath = slug ? `/recipe-detail?recipe=${slug}` : "#";

  // For debugging
  const handleClick = () => {
    console.log("Navigating to:", navPath);
    console.log("Slug value:", slug);
  };

  return (
    <Link href={`/recipe-detail?id=${id}`} className="block" onClick={handleClick}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-[250px] h-[320px] flex flex-col cursor-pointer hover:scale-[1] active:scale-95">
        <img src={image} alt={title} className="w-full h-36 object-cover" />
        <div className="flex-1 flex flex-col justify-between p-4 pb-2 h-full">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className={isFree ? "text-green-500 font-semibold text-xs" : "text-red-500 font-semibold text-xs"}>{isFree ? "Free" : "Paid"}</span>
              {!isFree && <span className="text-red-500 font-semibold text-xs">{formatRupiah(price)}</span>}
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <FiStar className="inline" fill="#FFD700" />
                <span className="text-gray-700 font-medium text-xs">{rating}</span>
              </div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-3">{nama}</h3>
            <div className="flex items-center mb-5">
              <span className="font-bold text-[color:var(--custom-orange)] text-base">{formatTime(time)}</span>
            </div>
          </div>
          <div className="flex items-center pt-2 border-t border-gray-200 gap-2">
            <img src={user?.photo} alt={user?.name} width={24} height={24} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-gray-800 text-xs font-medium">{user?.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
