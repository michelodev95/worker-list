import { SortBy } from "../types.d";

interface Props {
  toggleColors: () => void;
  toggleSortByCountry: () => void;
  handleReset: () => void;
  sorting: string;
  showColors: boolean;
  deletedUsers: boolean;
}

const FiltersOptions = ({
  handleReset,
  toggleColors,
  toggleSortByCountry,
  sorting,
  showColors,
  deletedUsers,
}: Props) => {
  return (
    <div className="w-52 h-max mt-1 rounded-md shadow-xl z-20 bg-white border">
      <div className="flex flex-col space-y-4 p-2 items-start">
        <button
          onClick={toggleColors}
          className={`border w-full py-1 rounded-md ${
            showColors ? "border-blue-900" : ""
          }`}
        >
          Colums color
        </button>
        <button
          onClick={toggleSortByCountry}
          className={`border w-full py-1 rounded-md ${
            sorting === SortBy.COUNTRY ? "border-blue-900" : ""
          }`}
        >
          {sorting === SortBy.COUNTRY ? "No country order" : "Country order"}
        </button>
        <button
          onClick={handleReset}
          className={`border w-full py-1 rounded-md ${
            deletedUsers ? "" : "opacity-40"
          }`}
        >
          Reset users
        </button>
      </div>
    </div>
  );
};

export default FiltersOptions;
