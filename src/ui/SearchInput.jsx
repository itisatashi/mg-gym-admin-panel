import { useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useUrlParams } from "../hooks/useUrlParams";

function SearchInput({ paramName = "search", placeholder = "Search..." }) {
  const { getParam, setParam } = useUrlParams();
  const [query, setQuery] = useState(getParam(paramName));

  useEffect(() => {
    const timer = setTimeout(() => {
      setParam(paramName, query);
    }, 3000);

    return () => clearTimeout(timer);
  }, [query, paramName, setParam]);

  return (
    <div className="flex items-center gap-2 input w-64">
      <HiMagnifyingGlass />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none flex-1"
      />
    </div>
  );
}

export default SearchInput;
