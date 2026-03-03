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

  return (
    <div className="absolute top-4 right-14 z-[2000]">

      {/* Search Input */}
      <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-80 border border-gray-200 focus-within:ring-2 focus-within:ring-orange-500 transition">
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search Study Locations"
          className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Only show results if user typed something */}
      {query.trim() && filteredLocations.length > 0 && (
        <div className="mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto divide-y divide-gray-100 scrollbar-none">
          {filteredLocations.map(location => (
            <div
              key={location.id_location}
              onClick={() => {
                onResultClick(location);
                setQuery('');
                setFilteredLocations([]);
              }}
              className="p-3 hover:bg-orange-50 cursor-pointer transition text-sm"
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