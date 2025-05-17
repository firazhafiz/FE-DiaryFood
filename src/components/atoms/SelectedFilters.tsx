import React from "react";

interface FilterItem {
  category: string;
  value: string;
}

interface SelectedFiltersProps {
  selectedFilters: FilterItem[];
  totalRecipes: number;
  onRemoveFilter: (filter: FilterItem) => void;
  onClearAll?: () => void;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  selectedFilters,
  totalRecipes,
  onRemoveFilter,
  onClearAll,
}) => {
  if (selectedFilters.length === 0) return null;

  return (
    <div className="w-full bg-white/40 backdrop-blur-md p-4 mb-6 rounded-xl shadow-lg border border-white/30 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-medium text-gray-700 text-sm">Filter Terpilih</h3>
          <span className="text-xs text-gray-500">{totalRecipes} resep</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs shadow border border-gray-200/60 hover:shadow-md transition-all"
            >
              <span className="text-gray-700 font-medium">{filter.value}</span>
              <button
                onClick={() => onRemoveFilter(filter)}
                className="text-gray-400 hover:text-[color:var(--custom-orange)] focus:outline-none px-1"
                title="Hapus filter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
          ))}
        </div>
      </div>
      {onClearAll && (
        <button
          onClick={onClearAll}
          className="mt-2 md:mt-0 px-4 py-2 bg-gradient-to-r from-[color:var(--custom-orange)] to-orange-400 text-white rounded-full text-xs font-semibold shadow hover:shadow-orange-200/50 transition-all"
        >
          Bersihkan Filter
        </button>
      )}
    </div>
  );
};

export default SelectedFilters;
