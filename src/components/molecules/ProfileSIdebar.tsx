import Link from "next/link";
import { Title } from "../atoms/Title";
import { FaBook, FaBookmark, FaCog, FaUser } from "react-icons/fa";

const ProfileSidebar = () => {
  return (
    <nav className="bg-white  w-1/5 px-6 h-screen fixed py-10">
      <div className="mb-8">
        <Title />
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#FF7A5C] text-white font-semibold">
          <FaUser /> Profile
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
          <FaBook /> My Recipe
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
          <FaBookmark /> Saved
        </Link>
        <Link href="/profile/setting" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
          <FaCog /> Settings
        </Link>
      </div>
    </nav>
  );
};

export default ProfileSidebar;
