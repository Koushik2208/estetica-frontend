import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-[390px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for Product!"
        className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
};

export default SearchBar;
