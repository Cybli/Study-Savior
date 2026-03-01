import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationSidebar } from './popups/LocationSidebar';
import API_URL from './config';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker icons breaking in Vite builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  /*To use:
      To use information stored in a location use location.NAME_OF_COLUMN_IN_DATABASE
      For example:
          To get the name of a location use location.name_location
  */

  //Fetch locations from backend
  useEffect(() => {
    //TODO: REPLACE WITH BACKEND 
    //TODO: USE HTTPS FOR ENCRYPTION SENDING USER PASSWORDS
    fetch(`${API_URL}/locations`)
      .then(res => res.json())            //Gather information in json format
      .then(data => {
        setLocations(data);  //Store data in setLocations
      })
      .catch(err => console.error('Failed to fetch locations:', err));
  }, []);

  useEffect(() => {
    // Return map a single time
    if (map.current) return;

    // OSU Coordinates set
    const osuCoords = [44.5646, -123.2800];
    const zoomLevel = 15;

    // Init map
    map.current = L.map(mapContainer.current).setView(osuCoords, zoomLevel);
    // Add OSM tile layer (z = zoom, x = horizontal tile coordinate, y = vertical tile coordinate)
    // Values automatically updated by leaflet as the user pans and zooms
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      // Required by OSM's license, adds copyright to bottom right of page
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      // Sets the number of tiles/columns kept when panning
      keepBuffer: 100
    }).addTo(map.current);
  }, []);

  // Add location markers to map
  useEffect(() => {
    if (!map.current || locations.length === 0) return; //Check if map exists and there are locations
    //Wait for map to load
    map.current.whenReady(() => {
      //For each location in the database
      locations.forEach(location => {
        if (!location.lat || !location.lng) return; //Check if there are latitude and longitude in the db
        const marker = L.marker([location.lat, location.lng]).addTo(map.current); //Create a marker and add it to the map
        
        // Add click event to show location in sidebar
        marker.on('click', () => {
          setSelectedLocation(location);
        });
      });
    });
  }, [locations]);

  return(
    <div className="w-full h-screen flex flex-col">
      <div className="bg-linear-to-r from-orange-600 to-orange-500 p-4 shadow-lg">
        <h1 className="text-white text-3xl font-bold">Study Savior</h1>
        <p className="text-orange-100">OSU Campus Study Locations</p>
      </div>
      <div className="relative flex-1">
        <div 
          ref={mapContainer} 
          className="w-full h-full"
        />
        {selectedLocation && (
          <LocationSidebar 
            location={selectedLocation} 
            onClose={() => setSelectedLocation(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default App