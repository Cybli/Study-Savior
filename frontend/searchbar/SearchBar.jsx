import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { MapPin } from 'lucide-react';

export function SearchBar({ locations = [], onResultClick }) {
  const [query, setQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    // console.log("Locations prop:", locations);
    if (!query.trim()) { // If the query is empty, show no locations
      setFilteredLocations([]);
      return;
    }

    const timeout = setTimeout(() => {
      if (!Array.isArray(locations)) return;

      const lowerQuery = query.toLowerCase();

      // If either the 
      const results = locations.filter(loc =>
        loc.name_location?.toLowerCase().includes(lowerQuery) ||
        loc.hall_location?.toLowerCase().includes(lowerQuery)
      );

      setFilteredLocations(results);
    }, 100);
    // Makes it wait a 100ms before populating results so they don't constantly change while you're typing
    // Not sure if 100ms is the aesthetically optimal amount, but I figure it's not bad

    // Cleanup function cancels previous timeout
    return () => clearTimeout(timeout);

  }, [query, locations]);

  return ( // bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col z-1000 border-2 border-black
    <div className="absolute top-2.75 right-14 w-80 bg-white shadow-2xl rounded-lg p-3 z-1000 border-2 border-black">

      {/* Search Input */}
      <div className="flex items-center border-2 border-gray-500 rounded-lg px-2 py-1">
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search Study Locations"
          className="w-full outline-none text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Only show results if user typed something */}
      {query.trim() && filteredLocations.length > 0 && (
        <div className="mt-3 max-h-48 overflow-y-auto border-t pt-2">
          {filteredLocations.map(location => (
            <div
              key={location.id_location}
              onClick={() => {
                onResultClick(location);
                setQuery('');
                setFilteredLocations([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
            >
              <div className="flex items-center">
                <MapPin size={18} className="text-gray-500 mr-2" />
                <div>
                  <div className="font-semibold">
                    {location.name_location}
                  </div>
                  <div className="text-xs text-gray-500">
                    {location.hall_location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}