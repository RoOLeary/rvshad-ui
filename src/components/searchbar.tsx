/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Search, X } from 'lucide-react';
import { useSearchItemsMutation } from '../services/search/search';
import { useDebounce } from '../hooks/use-debounce';

const TABS = ['All', 'Entity', 'Document', 'Query', 'Study'];

export const SearchBar = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    type: '',
    category: '',
    tags: '',
    authors: '',
    sources: '',
  });

  const [selectedTab, setSelectedTab] = useState(TABS[0]); // Default to "All"
  const [hasSearched, setHasSearched] = useState(false);

  const [searchItems, { data, isLoading, isError }] = useSearchItemsMutation();

  const debouncedTriggerSearch = useDebounce(() => {
    if (filters.keyword.trim()) {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value.trim()) queryParams.append(key, value);
      });

      const queryString = queryParams.toString();
      console.log('Triggering search with query:', queryString);

      searchItems(queryString)
        .unwrap()
        .then((response) => {
          console.log('Search response:', response);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });

      setHasSearched(true);
    }
  }, 500);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
      debouncedTriggerSearch();
    },
    [debouncedTriggerSearch]
  );

  const handleInputPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = e.clipboardData.getData('text');
      setFilters((prev) => ({
        ...prev,
        keyword: pastedText,
      }));
      debouncedTriggerSearch();
    },
    [debouncedTriggerSearch]
  );

  const handleInputBlur = () => {
    if (!filters.keyword.trim()) {
      handleReset();
    }
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      type: '',
      category: '',
      tags: '',
      authors: '',
      sources: '',
    });
    setSelectedTab('All');
    searchItems('');
    setHasSearched(false);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const filterResults = (data: any) => {
    if (!data) return [];

    console.log('Raw API Response:', data);

    const allResults = Object.keys(data)
      .filter((key) => Array.isArray(data[key]) && data[key].length > 0)
      .flatMap((key) =>
        data[key].map((item: any) => ({
          id: item?.id,
          name: item?.name || 'Unnamed',
          type: ['ScienceArticle', 'Weblink', 'Technology'].includes(item?.type)
            ? 'Document'
            : item?.type || 'Unknown',
          url: item?.url || `/library/${key}/${item?.id}`,
        }))
      )
      .filter((item) => item.id && item.name);

    return selectedTab === 'All'
      ? allResults
      : allResults.filter((item) => item.type === selectedTab);
  };

  const filteredResults = filterResults(data);

  return (
    <div className="relative w-1/2 mx-auto">
      {/* Search Input */}
      <form className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleInputChange}
              onPaste={handleInputPaste}
              onBlur={handleInputBlur}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by keyword"
              aria-label="Search input"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={20} />
            </div>
            {filters.keyword && (
              <button
                type="button"
                onClick={handleReset}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Filter Tabs */}
      {filteredResults.length > 0 || hasSearched ? (
        <div className="mt-4 flex space-x-2 justify-center">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-grow text-center px-4 py-2 rounded-lg ${
                selectedTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              style={{ minWidth: '100px' }}
              aria-pressed={selectedTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>
      ) : null}

      {/* Results */}
      {isError ? (
        <p className="mt-2 text-sm text-red-500">Failed to fetch results. Please try again.</p>
      ) : (
        <CSSTransition
          in={filteredResults.length > 0}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ul
            className="absolute top-full left-0 w-full border border-gray-300 rounded-md bg-white mt-2 shadow-lg z-10 overflow-y-scroll"
            style={{ maxHeight: '300px' }}
            aria-live="polite"
            aria-busy={isLoading}
          >
            {filteredResults.map((entity) => (
              <li
                key={entity.id}
                className="p-2 border-b last:border-b-0 hover:bg-gray-100"
              >
                <span className="block text-sm text-gray-600">{entity.type}</span>
                <a
                  href={entity.url}
                  target={entity.url.startsWith('http') ? '_blank' : '_self'}
                  rel={entity.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-blue-500 hover:underline"
                >
                  {entity.name}
                </a>
              </li>
            ))}
          </ul>
        </CSSTransition>
      )}

      {/* No Results Found */}
      {hasSearched && !isLoading && filteredResults.length === 0 && (
        <p className="mt-2 text-sm text-gray-500 bg-white p-4 rounded-md">No items found.</p>
      )}
    </div>
  );
};

export default SearchBar;
