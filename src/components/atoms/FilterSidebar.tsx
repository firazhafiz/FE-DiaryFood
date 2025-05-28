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
      <aside className="w-full md:w-64 bg-gradient-to-b from-gray-50 to-white rounded-2xl px-6 py-4 mb-6 md:mb-0">
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
            Dietary Pattern
          </h3>
          <div className="flex flex-col text-gray-500 font-medium gap-4">
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Dietary Pattern", "Vegetarian")}
                onChange={(e) =>
                  handleFilterChange(
                    "Dietary Pattern",
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
                checked={isFilterSelected("Dietary Pattern", "Dairy Free")}
                onChange={(e) =>
                  handleFilterChange(
                    "Dietary Pattern",
                    "Dairy Free",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Dairy Free
            </label>
            <span
              onClick={openModal}
              className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1 hover:underline"
            >
              More
            </span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2 text-sm">
            Allergies
          </h3>
          <div className="flex flex-col text-gray-500 font-medium  gap-4">
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Allergies", "Gluten Free")}
                onChange={(e) =>
                  handleFilterChange(
                    "Allergies",
                    "Gluten Free",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Gluten Free
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Allergies", "Nuts")}
                onChange={(e) =>
                  handleFilterChange("Allergies", "Nuts", e.target.checked)
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Nuts
            </label>
            <span
              onClick={openModal}
              className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1 hover:underline"
            >
              More
            </span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2 text-sm">
            International Cuisine
          </h3>
          <div className="flex flex-col text-gray-500 font-medium gap-4">
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("International Cuisine", "Indonesia")}
                onChange={(e) =>
                  handleFilterChange(
                    "International Cuisine",
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
                checked={isFilterSelected("International Cuisine", "Italy")}
                onChange={(e) =>
                  handleFilterChange(
                    "International Cuisine",
                    "Italy",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Italy
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected(
                  "International Cuisine",
                  "Middle East"
                )}
                onChange={(e) =>
                  handleFilterChange(
                    "International Cuisine",
                    "Middle East",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Middle East
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("International Cuisine", "India")}
                onChange={(e) =>
                  handleFilterChange(
                    "International Cuisine",
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
                checked={isFilterSelected("International Cuisine", "Korea")}
                onChange={(e) =>
                  handleFilterChange(
                    "International Cuisine",
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
              More
            </span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2 text-sm">
            Regional Cuisine
          </h3>
          <div className="flex flex-col gap-4 text-gray-500 font-medium ">
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Regional Cuisine", "East Java")}
                onChange={(e) =>
                  handleFilterChange(
                    "Regional Cuisine",
                    "East Java",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              East Java
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Regional Cuisine", "Palembang")}
                onChange={(e) =>
                  handleFilterChange(
                    "Regional Cuisine",
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
                checked={isFilterSelected("Regional Cuisine", "Medan")}
                onChange={(e) =>
                  handleFilterChange(
                    "Regional Cuisine",
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
              More
            </span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2 text-sm">Goals</h3>
          <div className="flex flex-col text-gray-500 font-medium  gap-4">
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Goals", "Weight Loss")}
                onChange={(e) =>
                  handleFilterChange("Goals", "Weight Loss", e.target.checked)
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Weight Loss
            </label>
            <label className="flex items-center gap-4 text-sm">
              <input
                type="checkbox"
                checked={isFilterSelected("Goals", "Active Protein")}
                onChange={(e) =>
                  handleFilterChange(
                    "Goals",
                    "Active Protein",
                    e.target.checked
                  )
                }
                className="accent-[color:var(--custom-orange)]"
              />{" "}
              Active Protein
            </label>
            <span
              onClick={openModal}
              className="text-xs text-[color:var(--custom-orange)] cursor-pointer mt-1 hover:underline"
            >
              More
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
