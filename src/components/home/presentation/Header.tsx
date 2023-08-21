import React from "react";
import SearchIcon from "../../ui/SearchIcon";
import ArrowDown from "../../ui/ArrowDown";

interface HeaderProps {
  dropdownRef: any;
  setOptionsOpen: (isOpen: boolean) => void;
  setFilterCountry: (value: string | null) => void;
  optionsOpen: boolean;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  dropdownRef,
  setOptionsOpen,
  setFilterCountry,
  optionsOpen,
  children,
}) => {
  return (
    <header className="px-4 lg:px-52 md:px-20 2xl:px-80">
      <div className="flex items-center justify-between pb-4 gap-x-2 lg:gap-x-20">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOptionsOpen(!optionsOpen)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            Filters
            <ArrowDown />
          </button>
          {optionsOpen && <div className="absolute z-40">{children}</div>}
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for country"
            onChange={(e) => setFilterCountry(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
