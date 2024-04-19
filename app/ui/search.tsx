'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// create a search component to filter the members based on user input

const Search = ({ placeholder }: { placeholder: string }) => {
  // get/access the search query params from the url
  const searchParams = useSearchParams();
  // get the current pathname
  const pathname = usePathname();
  // get the replace function from the useRouter hook
  const { replace } = useRouter();
  // handle search input and optimizing using a debounced callback to prevent multiple DB requests
  const handlesearch = useDebouncedCallback((term: string) => {
    // update or manipulate the URL query params using URLSearchParams web API
    const params = new URLSearchParams(searchParams);
    // reset the URL page param to 1 when the user types in the search input
    params.set('page', '1');
    // set the URL query param to the user input
    if (term) {
      params.set('query', term);
    } else {
      // remove the URL query param if the user input is empty
      params.delete('query');
    }
    // update the full URL using the pathname and updated search parameters
    replace(`${pathname}?${params.toString()}`);
  }, 700);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        placeholder={placeholder}
        // get the search query param from the URL ensuring the input field is always in sync with the URL
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => {
          handlesearch(e.target.value);
        }}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/4 h-5 w-5 text-gray-400 peer-focus:text-gray-800" />
    </div>
  );
};

export default Search;
