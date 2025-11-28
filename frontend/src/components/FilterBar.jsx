import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const categories = ['All', 'Electricity', 'Roads', 'Water', 'Waste', 'Safety'];
  const statuses = ['All', 'Pending', 'In-Progress', 'Resolved'];

  const handleClearFilters = () => {
    onFilterChange('search', '');
    onFilterChange('category', '');
    onFilterChange('status', '');
  };

  const hasActiveFilters = filters.search || filters.category || filters.status;

  return (
    <div className="card mb-8 animate-slide-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Filter Issues
        </h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="btn btn-secondary text-sm"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Search
          </label>
          <input
            type="text"
            placeholder="Search issues..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="input"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All' ? '' : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="input"
          >
            {statuses.map((status) => (
              <option key={status} value={status === 'All' ? '' : status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
