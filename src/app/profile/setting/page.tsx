import ProfileSidebar from "@/components/molecules/ProfileSIdebar";

const SettingPage = () => {
  return (
    <div className="flex bg-amber-50">
      <ProfileSidebar />
      <div className="w-4/5 ml-[20%] px-16 py-10">
        <div className="bg-white rounded-xl p-10  w-full mx-auto  flex flex-col  gap-8">
          <div className="  ">
            <h4 className="text-black font-semibold mb-2 ">Delete Account</h4>
            <div className="rounded-md bg-gray-500 p-3 flex justify-between items-center gap-8">
              <p className="text-white text-sm">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quaerat nihil porro corporis fuga soluta, culpa quod exercitationem, quidem quia voluptatibus expedita recusandae vero doloribus magni quo necessitatibus?
                Error, reprehenderit?
              </p>
              <button className="bg-[var(--custom-orange)] text-white py-1 px-4 h-fit rounded-md">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
