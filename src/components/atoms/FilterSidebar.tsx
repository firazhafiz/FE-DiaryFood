import React from "react";

const FilterSidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 md:mb-0">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Filters</h2>
      {/* Example filter groups */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2 text-sm">Pola Makan</h3>
        <div className="flex flex-col text-gray-500 font-medium gap-4">
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              defaultChecked
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Vegetarian
          </label>
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Bebas Susu
          </label>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2 text-sm">Alergi</h3>
        <div className="flex flex-col text-gray-500 font-medium  gap-4">
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              defaultChecked
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Bebas Gluten
          </label>
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Kacang-Kacangan
          </label>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2 text-sm">
          Masakan Internasional
        </h3>
        <div className="flex flex-col text-gray-500 font-medium gap-4">
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              defaultChecked
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Indonesia
          </label>
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Italia
          </label>
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Timur Tengah
          </label>
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            India
          </label>
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Korea
          </label>
          <span className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1">
            Lebih Banyak
          </span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2 text-sm">
          Masakan Daerah
        </h3>
        <div className="flex flex-col gap-4 text-gray-500 font-medium ">
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              defaultChecked
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Jawa Timur
          </label>
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Palembang
          </label>
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Medan
          </label>
          <span className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1">
            Lebih Banyak
          </span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2 text-sm">Goals</h3>
        <div className="flex flex-col text-gray-500 font-medium  gap-4">
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              defaultChecked
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Penurunan Berat Badan
          </label>
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="accent-[color:var(--custom-orange)]"
            />{" "}
            Protein Aktif
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
