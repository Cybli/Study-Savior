//Leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from "leaflet/dist/images/marker-icon.png";
import redMarkerIcon from "./assets/marker-icon-red.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png"; // Without this, it the icon will not properly display
import redMarkerIconRetina from "./assets/marker-icon-2x-red.png";
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

//Components
import { LocationSidebar } from './components/LocationSidebar';
import { SearchBar } from './components/SearchBar';
import { LoginForm } from './components/LoginForm';

//Non-component functions
import { useEffect, useRef, useState } from 'react';
import { Button } from '@headlessui/react'

//Constants
import API_URL from './config';

// Fix Leaflet marker icons breaking in Vite builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = L.icon({
  iconUrl: redMarkerIcon,
  iconRetinaUrl: redMarkerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],

});

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [user, setUser] = useState(null)
  const selectedMarker = useRef(null);

  /*To use:
      To use information stored in a location use location.NAME_OF_COLUMN_IN_DATABASE
      For example:
          To get the name of a location use location.name_location
  */

  //Fetch locations from backend
  useEffect(() => {
    //TODO: REPLACE WITH BACKEND 
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
    map.current = L.map(mapContainer.current, { zoomControl: false }).setView(osuCoords, zoomLevel);
    // Add OSM tile layer (z = zoom, x = horizontal tile coordinate, y = vertical tile coordinate)
    // Values automatically updated by leaflet as the user pans and zooms
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      // Required by OSM's license, adds copyright to bottom right of page
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      // Sets the number of tiles/columns kept when panning
      keepBuffer: 100
    }).addTo(map.current);

    // Moves zoom control to the top right, as top left led to it being below our location sidebar
    L.control.zoom({ position: 'topright' }).addTo(map.current);
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
          // Reset previous selected marker to default
          if (selectedMarker.current) {
            selectedMarker.current.setIcon(defaultIcon);
          }
          // Set new marker to red
          marker.setIcon(selectedIcon);
          selectedMarker.current = marker;
          setSelectedLocation(location);
        });
      });
    });
  }, [locations]);

  // Validate user's login
  useEffect(() => {
    fetch(`${API_URL}/me`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.username && data.id_user) {
          setUser({ id_user: data.id_user, username: data.username });
        }
      })
      .catch(() => {
        setUser(null)
        console.log("== Auth Failed")
      });
  }, []);

  const handleSearchResultClick = (location) => {
    setSelectedLocation(location);

    // Reset previous selected marker
    if (selectedMarker.current) {
      selectedMarker.current.setIcon(defaultIcon);
    }

    // Find and highlight the matching marker
    map.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        const pos = layer.getLatLng();
        if (pos.lat === location.lat && pos.lng === location.lng) {
          layer.setIcon(selectedIcon);
          selectedMarker.current = layer;
        }
      }
    });

    if (map.current && location.lat && location.lng) {
      map.current.flyTo([location.lat, location.lng], 19,
        {
          animate: true,
          duration: 1,
          // Makes it take a second panning, also not sure if this is the optimal timing, we can ask beta test users!
          easeLinearity: 0.1
          // Honestly not entirely sure if this option is doing anything? Feels about the same to me with it set at 1 or 0.1
          // Theoretically should make it smoother for pan and zoom using bezier curves though... so why not?
        }
      );
    }
  };

  async function handleLogout() {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    window.location.reload();
  }

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Banner */}
      <div className="bg-linear-to-r from-orange-600 to-orange-500 p-4 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-white text-3xl font-bold">Study Savior</h1>
          <p className="text-orange-100">OSU Campus Study Locations</p>
        </div>
        {/* User account corner */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 bg-orange-900/70 rounded-lg px-3 py-2">
                {/* User Icon svg */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
                <p className="text-white font-medium text-sm">{user.username}</p>
              </div>
              <Button
                onClick={handleLogout}
                className='cursor-pointer bg-white text-orange-500 font-semibold px-5 py-2 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-sm'
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <LoginForm/>
            </>
          )}
        </div>
      </div>
      <div className="relative flex-1">
        <div
          ref={mapContainer}
          className="w-full h-full"
        />
        {selectedLocation && (
          <LocationSidebar
            location={selectedLocation}
            user={user}
            onClose={() => {
              if (selectedMarker.current) {
                selectedMarker.current.setIcon(defaultIcon);
                selectedMarker.current = null;
              }
              setSelectedLocation(null);
            }}
          />
        )}
        <SearchBar
          locations={locations}
          onResultClick={handleSearchResultClick}
        />
      </div>
    </div>
  );
}

export default App