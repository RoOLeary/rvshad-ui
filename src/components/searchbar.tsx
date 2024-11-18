import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Search, X } from 'lucide-react';
import { useSearchItemsMutation } from '../services/search/search';
import { useDebounce } from '../hooks/use-debounce';

export const SearchBar = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    type: '',
    category: '',
    tags: '',
    authors: '',
    sources: '',
  });

  const [selectedTab, setSelectedTab] = useState('All'); // Default tab is 'all'
  const [hasSearched, setHasSearched] = useState(false); // Track if a search was performed

  const [searchItems, { data, isLoading }] = useSearchItemsMutation();

  const debouncedTriggerSearch = useDebounce(() => {
    if (filters.keyword.trim()) {
      const queryParams = new URLSearchParams();

      if (filters.keyword) queryParams.append('query', filters.keyword);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.tags) queryParams.append('tags', filters.tags);
      if (filters.authors) queryParams.append('authors', filters.authors);
      if (filters.sources) queryParams.append('sources', filters.sources);

      const queryString = queryParams.toString();
      console.log(`Formatted query string: ${queryString}`);

      searchItems(queryString)
        .unwrap()
        .then((response) => {
          console.log('Search response:', response);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });

      setHasSearched(true); // Set search flag
    }
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const updatedFilters = { ...prev, [name]: value };
      console.log(`Filter updated: ${name} = ${value}`);
      debouncedTriggerSearch();
      return updatedFilters;
    });
  };

  const handleInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    setFilters((prev) => {
      const updatedFilters = { ...prev, keyword: pastedText };
      console.log(`Pasted text: ${pastedText}`);
      debouncedTriggerSearch();
      return updatedFilters;
    });
  };

  const handleInputBlur = () => {
    if (!filters.keyword.trim()) {
      console.log('Resetting search due to empty keyword');
      setFilters((prev) => ({
        ...prev,
        keyword: '',
      }));
      searchItems(''); // Reset the search
      setHasSearched(false); // Reset search flag
    }
  };

  const handleReset = () => {
    console.log('Resetting all filters');
    setFilters({
      keyword: '',
      type: '',
      category: '',
      tags: '',
      authors: '',
      sources: '',
    });
    searchItems(''); // Reset the search
    setHasSearched(false); // Reset search flag
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const filterResults = (data: any) => {
    if (!data) return [];
    console.log('Raw API Response:', data);
  
    const allResults = Object.keys(data)
      .filter((key) => Array.isArray(data[key]) && data[key].length > 0) // Only non-empty arrays
      .flatMap((key) =>
        data[key].map((item: any) => ({
          id: item?.id,
          name: item?.name || 'Unnamed',
          type: item?.type || 'Unknown',
          url: item?.url || `/library/${key}/${item?.id}`,
        }))
      )
      .filter((item) => item.id && item.name); // Ensure valid items
  
    // Map 'ScienceArticle', 'Weblink', and 'Technology' to 'Document'
    const resultsWithAdjustedTypes = allResults.map((item) => {
      if (['ScienceArticle', 'Weblink', 'Technology'].includes(item.type)) {
        return { ...item, type: 'Document' };
      }
      return item;
    });
  
    // Filter results based on the selected tab
    if (selectedTab === 'All') {
      return resultsWithAdjustedTypes;
    }
  
    return resultsWithAdjustedTypes.filter((item) => item.type === selectedTab);
  };
  
  

  const filteredResults = filterResults(data);

  return (
    <div className="relative w-1/2 mx-auto">
      <form className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleInputChange}
              onPaste={handleInputPaste} // Handle pasted text
              onBlur={handleInputBlur}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by keyword"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={20} />
            </div>
            {filters.keyword && (
              <button
                type="button"
                onClick={handleReset}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Tabs with Animation */}
      <CSSTransition
        in={filteredResults.length > 0 || hasSearched}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
       <div className="mt-4 flex space-x-2 justify-center fade-enter-done">
          {['All', 'Entity', 'Document', 'Query', 'Study', 'Inbox'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-grow text-center px-4 py-2 rounded-lg ${selectedTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              style={{ minWidth: '100px' }} // Ensures consistent button width
            >
              {tab}
            </button>
          ))}
        </div>
      </CSSTransition>

      {/* Results with Absolute Positioning */}
      <CSSTransition
        in={filteredResults.length > 0}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <ul
          className="absolute top-full left-0 w-full border border-gray-300 rounded-md bg-white mt-2 shadow-lg z-10 overflow-y-scroll"
          style={{ maxHeight: '300px' }} // Adjust height as needed
        >
          {filteredResults.map((entity) => (
            <li
              key={entity.id}
              className="p-2 border-b last:border-b-0 hover:bg-gray-100"
            >
              <span className="block text-sm text-gray-600">{entity.type}</span>
              <a
                href={entity.url}
                target={entity.url.startsWith('http') ? '_blank' : '_self'} // Open external links in a new tab
                rel={entity.url.startsWith('http') ? 'noopener noreferrer' : undefined} // Add security attributes for external links
                className="text-blue-500 hover:underline"
              >
                {entity.name}
              </a>
            </li>
          ))}
        </ul>
      </CSSTransition>



      {/* No items found */}
      <CSSTransition
        in={hasSearched && !isLoading && filteredResults.length === 0}
        timeout={250}
        classNames="fade"
        unmountOnExit
      >
        <p className="absolute top-full left-0 w-full border border-gray-300 rounded-md bg-white mt-2 shadow-lg z-10 fade-enter-done p-4">No items found.</p>
      </CSSTransition>
    </div>
  );
};

export default SearchBar;
