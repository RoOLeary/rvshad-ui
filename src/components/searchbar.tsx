import { useState } from 'react';
import { Search } from 'lucide-react'; 
import { useSearchItemsMutation } from '../services/search/search';
import { useDebounce } from '../hooks/use-debounce';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchItems, { data, isLoading }] = useSearchItemsMutation();

  // Debounced search function
  const debouncedTriggerSearch = useDebounce((query: string) => {
    if (query.trim()) {
      const formattedValue = query.replace(/\s+/g, '+'); // Replace spaces with '+'
      searchItems(formattedValue); // Trigger the API call
    }
  }, 500); // 500ms debounce delay

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value); // Update the input value with formatted value
    debouncedTriggerSearch(value); // Trigger the debounced API call
  };
  

  return (
    <div className="header-searchform relative">
      <form className="relative min-w-[420px]">
        <input
          type="text"
          placeholder="Search the Universe"
          value={searchQuery}
          className="min-w-[420px] p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleInputChange}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </form>

      {/* Loading Indicator */}
      {isLoading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}

      {/* Results as a List */}
      {data?.entities?.length > 0 && (
        <ul className="border border-gray-300 rounded-md absolute bg-white w-full">
          {data.entities.map((entity) => (
            <li
              key={entity.id}
              className="p-2 border-b last:border-b-0 hover:bg-gray-100"
            >
              <a
                href={`/library/${(entity.type == 'Entity') ? 'entities' : 'studies'}/${entity.id}`}
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {entity.name} 
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* No Results */}
      {data?.entities?.length === 0 && searchQuery && (
        <p className="text-sm text-gray-500 mt-2">No results found.</p>
      )}
    </div>
  );
};

export default SearchBar;
