import React, { useState } from "react";
import { FilterItem } from "@/components/atoms/FilterSidebar";

interface FilterCategory {
  name: string;
  options: string[];
}

interface FilterControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: FilterItem[];
  onFilterChange: (filters: FilterItem[]) => void;
}

const FilterControlModal: React.FC<FilterControlModalProps> = ({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
}) => {
  const [activeTab, setActiveTab] = useState("Pola Makan");

  // Comprehensive filter categories
  const filterCategories: FilterCategory[] = [
    {
      name: "Pola Makan",
      options: [
        "Vegetarian",
        "Bebas Susu",
        "Bebas Gula",
        "Vegan",
        "Pescatarian",
        "Keto",
        "Paleo",
      ],
    },
    {
      name: "Alergi",
      options: [
        "Bebas Gluten",
        "Kacang-Kacangan",
        "Seafood",
        "Telur",
        "Susu",
        "Kedelai",
        "Gandum",
      ],
    },
    {
      name: "Masakan Internasional",
      options: [
        "Indonesia",
        "Italia",
        "Timur Tengah",
        "India",
        "Korea",
        "Jepang",
        "Thailand",
        "Prancis",
        "Spanyol",
        "Meksiko",
        "Amerika",
        "China",
      ],
    },
    {
      name: "Masakan Daerah",
      options: [
        "Jawa Timur",
        "Palembang",
        "Medan",
        "Padang",
        "Manado",
        "Bali",
        "Aceh",
        "Jogja",
        "Sunda",
        "Betawi",
        "Makassar",
      ],
    },
    {
      name: "Goals",
      options: [
        "Penurunan Berat Badan",
        "Protein Aktif",
        "Bulking",
        "Detox",
        "Rendah Lemak",
        "Tinggi Serat",
        "Menyehatkan Jantung",
      ],
    },
    {
      name: "Waktu Persiapan",
      options: [
        "Kurang dari 15 menit",
        "15-30 menit",
        "30-60 menit",
        "Lebih dari 60 menit",
      ],
    },
  ];

  if (!isOpen) return null;

  const isFilterSelected = (category: string, value: string): boolean => {
    return selectedFilters.some(
      (filter) => filter.category === category && filter.value === value
    );
  };

  const handleFilterChange = (
    category: string,
    value: string,
    checked: boolean
  ) => {
    let updatedFilters: FilterItem[];

    if (checked) {
      updatedFilters = [...selectedFilters, { category, value }];
    } else {
      updatedFilters = selectedFilters.filter(
        (filter) => !(filter.category === category && filter.value === value)
      );
    }

    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div onClick={onClose} className="absolute inset-0 bg-black/20"></div>

      <div className="relative bg-white/40 backdrop-blur-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] border border-white/30">
        {/* Header with decorative element */}
        <div className="relative flex justify-between items-center p-5 border-b border-white/30 backdrop-blur-sm bg-gradient-to-r from-white/30 to-white/5">
          <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-[color:var(--custom-orange)] to-transparent rounded-full"></div>
          <h2 className="text-base font-bold text-gray-800 flex items-center">
            <span className="text-[color:var(--custom-orange)] mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
            </span>
            Filter Resep
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={clearAllFilters}
              className="text-gray-500 text-xs hover:text-[color:var(--custom-orange)] transition-colors duration-200 font-medium flex items-center gap-1"
            >
              <span className="hidden md:inline">Hapus Semua</span>
              <span className="md:hidden">Clear</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-800 hover:text-[color:var(--custom-orange)] transition-colors duration-200 p-1 rounded-full hover:bg-gray-100/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex h-[70vh] overflow-hidden">
          {/* Sidebar filter categories with glass effect */}
          <div className="w-1/3 md:w-1/4 bg-white/20 backdrop-blur-lg p-4 overflow-y-auto border-r border-white/30">
            {filterCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveTab(category.name)}
                className={`w-full text-left px-4 py-2.5 mb-2 rounded-md transition-all duration-200 relative overflow-hidden text-sm font-medium flex items-center gap-2 ${
                  activeTab === category.name
                    ? "shadow-lg scale-[1.04] bg-gradient-to-r from-[color:var(--custom-orange)]/80 to-orange-400/80 text-white"
                    : "text-gray-700 hover:bg-white/40 hover:shadow-sm"
                }`}
                style={{ backdropFilter: "blur(8px)" }}
              >
                {activeTab === category.name && (
                  <span className="relative z-10 flex items-center justify-center w-5 h-5 mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                )}
                <span className="relative z-10">{category.name}</span>
                {activeTab === category.name && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[color:var(--custom-orange)]/80 to-orange-400/80 opacity-80 blur-[1px] z-0"></span>
                )}
              </button>
            ))}
          </div>

          {/* Options for selected category with glass effect */}
          <div className="w-2/3 md:w-3/4 p-6 overflow-y-auto bg-white/30 backdrop-blur-md">
            <h3 className="text-base font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-200/60">
              {activeTab}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
              {filterCategories
                .find((category) => category.name === activeTab)
                ?.options.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-3 py-2 px-3 rounded-md transition-colors duration-200 text-sm font-normal ${
                      isFilterSelected(activeTab, option)
                        ? "bg-orange-100/80"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isFilterSelected(activeTab, option)}
                        onChange={(e) =>
                          handleFilterChange(
                            activeTab,
                            option,
                            e.target.checked
                          )
                        }
                        className="w-5 h-5 accent-[color:var(--custom-orange)] opacity-15 absolute"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isFilterSelected(activeTab, option)
                            ? "border-[color:var(--custom-orange)] bg-[color:var(--custom-orange)]"
                            : "border-gray-300"
                        }`}
                      >
                        {isFilterSelected(activeTab, option) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 p-4 flex justify-between items-center bg-white/30 backdrop-blur-md">
          <div className="text-xs text-gray-600">
            {selectedFilters.length > 0 ? (
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1.5 text-[color:var(--custom-orange)]"
                >
                  <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                </svg>
                <span className="font-medium">{selectedFilters.length}</span>{" "}
                filter terpilih
              </span>
            ) : (
              <span className="text-gray-400">
                Tidak ada filter yang dipilih
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300/70 rounded-full text-gray-700 hover:bg-gray-100/70 transition-colors duration-200 text-xs"
            >
              Batal
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-[color:var(--custom-orange)] to-orange-400 text-white rounded-full hover:shadow-md hover:shadow-orange-200/50 transition-all duration-200 flex items-center font-medium text-xs"
            >
              <span>Terapkan</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1.5"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControlModal;
