import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

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
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.current);

    // Add marker at OSU campus (placeholder)
    const marker = L.marker(osuCoords).addTo(map.current);
    marker.bindPopup(
      "<b>Oregon State University</b><br>Corvallis, Oregon<br>"
    ).openPopup();

  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 shadow-lg">
        <h1 className="text-white text-3xl font-bold">Study Savior</h1>
        <p className="text-orange-100">OSU Campus Study Locations</p>
      </div>
      <div
        ref={mapContainer}
        className="w-full flex-1"
        style={{ height: '100%' }}
      />
    </div>
  );
}

export default App