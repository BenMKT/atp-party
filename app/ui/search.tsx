'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// create a search component to filter the members based on user input

const Search = () => {
  // handle search input
  const handlesearch = (term: string) => {
    console.log(term);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        placeholder='Search member'
        onChange={(e) => {handlesearch(e.target.value)}}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <MagnifyingGlassIcon className="absolute w-5 h-5 left-3 top-1/4 text-gray-400 peer-focus:text-gray-800" />
    </div>
  );
};

export default Search;
