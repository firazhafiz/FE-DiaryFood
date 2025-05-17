import React, { useState } from "react";
import FilterControlModal from "@/components/molecules/FilterControlModal";

export interface FilterItem {
  category: string;
  value: string;
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterItem[]) => void;
  selectedFilters: FilterItem[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange,
  selectedFilters,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (
    category: string,
    value: string,
    checked: boolean
  ) => {
    let updatedFilters: FilterItem[];

    if (checked) {
      // Add filter
      updatedFilters = [...selectedFilters, { category, value }];
    } else {
      // Remove filter
      updatedFilters = selectedFilters.filter(
        (filter) => !(filter.category === category && filter.value === value)
      );
    }

    onFilterChange(updatedFilters);
  };

  const isFilterSelected = (category: string, value: string): boolean => {
    return selectedFilters.some(
      (filter) => filter.category === category && filter.value === value
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <aside className="w-full md:w-64 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 md:mb-0">
        <h2
          className="text-lg font-bold mb-4 text-gray-800 cursor-pointer flex items-center transition-colors hover:text-[color:var(--custom-orange)]"
          onClick={openModal}
        >
          <span className="relative">
            Filters
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[color:var(--custom-orange)]"></span>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </h2>
        {/* Example filter groups */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2 text-sm">
            Pola Makan
          </h3>
          <div className="flex flex-col text-gray-500 font-medium gap-4">
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Pola Makan", "Vegetarian")}
                onChange={(e) =>
                  handleFilterChange(
                    "Pola Makan",
                    "Vegetarian",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Vegetarian
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Pola Makan", "Bebas Susu")}
                onChange={(e) =>
                  handleFilterChange(
                    "Pola Makan",
                    "Bebas Susu",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Bebas Susu
            </label>
            <span
              onClick={openModal}
              className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1 hover:underline"
            >
              Lebih Banyak
            </span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2 text-sm">Alergi</h3>
          <div className="flex flex-col text-gray-500 font-medium  gap-4">
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Alergi", "Bebas Gluten")}
                onChange={(e) =>
                  handleFilterChange("Alergi", "Bebas Gluten", e.target.checked)
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Bebas Gluten
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Alergi", "Kacang-Kacangan")}
                onChange={(e) =>
                  handleFilterChange(
                    "Alergi",
                    "Kacang-Kacangan",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Kacang-Kacangan
            </label>
            <span
              onClick={openModal}
              className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1 hover:underline"
            >
              Lebih Banyak
            </span>
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
                checked={isFilterSelected("Masakan Internasional", "Indonesia")}
                onChange={(e) =>
                  handleFilterChange(
                    "Masakan Internasional",
                    "Indonesia",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Indonesia
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Masakan Internasional", "Italia")}
                onChange={(e) =>
                  handleFilterChange(
                    "Masakan Internasional",
                    "Italia",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Italia
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected(
                  "Masakan Internasional",
                  "Timur Tengah"
                )}
                onChange={(e) =>
                  handleFilterChange(
                    "Masakan Internasional",
                    "Timur Tengah",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Timur Tengah
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Masakan Internasional", "India")}
                onChange={(e) =>
                  handleFilterChange(
                    "Masakan Internasional",
                    "India",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              India
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Masakan Internasional", "Korea")}
                onChange={(e) =>
                  handleFilterChange(
                    "Masakan Internasional",
                    "Korea",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Korea
            </label>
            <span
              onClick={openModal}
              className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1 hover:underline"
            >
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
                checked={isFilterSelected("Masakan Daerah", "Jawa Timur")}
                onChange={(e) =>
                  handleFilterChange(
                    "Masakan Daerah",
                    "Jawa Timur",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Jawa Timur
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Masakan Daerah", "Palembang")}
                onChange={(e) =>
                  handleFilterChange(
                    "Masakan Daerah",
                    "Palembang",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Palembang
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Masakan Daerah", "Medan")}
                onChange={(e) =>
                  handleFilterChange(
                    "Masakan Daerah",
                    "Medan",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Medan
            </label>
            <span
              onClick={openModal}
              className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1 hover:underline"
            >
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
                checked={isFilterSelected("Goals", "Penurunan Berat Badan")}
                onChange={(e) =>
                  handleFilterChange(
                    "Goals",
                    "Penurunan Berat Badan",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Penurunan Berat Badan
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Goals", "Protein Aktif")}
                onChange={(e) =>
                  handleFilterChange("Goals", "Protein Aktif", e.target.checked)
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Protein Aktif
            </label>
            <span
              onClick={openModal}
              className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1 hover:underline"
            >
              Lebih Banyak
            </span>
          </div>
        </div>
      </aside>

      <FilterControlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedFilters={selectedFilters}
        onFilterChange={onFilterChange}
      />
    </>
  );
};

export default FilterSidebar;
