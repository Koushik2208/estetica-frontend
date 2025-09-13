import { useState } from "react";
import { Bell, User } from "lucide-react"; // or any icons you prefer
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const handleSearch = (value) => {
    setQuery(value);
    console.log("Search query:", value);
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-6 py-3 sticky top-0 z-10">
      {/* Left: Brand */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-indigo-600">Estetica</span>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-6">
        <SearchBar value={query} onChange={handleSearch} />
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center space-x-5">
        <button className="relative p-1 hover:text-indigo-600">
          <Bell className="w-5 h-5" />
          {/* notification dot */}
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-orange-500"></span>
        </button>

        <button className="flex items-center space-x-2 hover:text-indigo-600">
          <User className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Profile</span>
        </button>
      </div>
    </header>
  );
}
