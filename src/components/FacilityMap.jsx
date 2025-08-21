import { useEffect, useRef } from 'react';
import L from 'leaflet';

// State coordinates mapping for Nigeria (approximate center points)
const stateCoordinates = {
  'Abia': [5.4527, 7.5248],
  'Adamawa': [9.3265, 12.3984],
  'Akwa Ibom': [4.9757, 7.8496],
  'Anambra': [6.2105, 7.0657],
  'Bauchi': [10.3144, 9.8442],
  'Bayelsa': [4.8678, 6.0699],
  'Benue': [7.3369, 8.5368],
  'Borno': [11.8311, 13.1517],
  'Cross River': [5.8702, 8.5987],
  'Delta': [5.7040, 5.8937],
  'Ebonyi': [6.2649, 8.0137],
  'Edo': [6.6342, 5.9304],
  'Ekiti': [7.7185, 5.3103],
  'Enugu': [6.4590, 7.5483],
  'FCT': [9.0765, 7.3986],
  'Gombe': [10.2896, 11.1673],
  'Imo': [5.5720, 7.0588],
  'Jigawa': [12.2280, 9.5616],
  'Kaduna': [10.5105, 7.4165],
  'Kano': [12.0001, 8.5920],
  'Katsina': [12.9816, 7.6223],
  'Kebbi': [12.4539, 4.1999],
  'Kogi': [7.7969, 6.6978],
  'Kwara': [8.9669, 4.3874],
  'Lagos': [6.5244, 3.3792],
  'Nasarawa': [8.4994, 8.1996],
  'Niger': [10.4011, 5.7050],
  'Ogun': [7.1475, 3.3617],
  'Ondo': [7.2504, 5.1957],
  'Osun': [7.6292, 4.1872],
  'Oyo': [8.1574, 3.6147],
  'Plateau': [9.2182, 9.5179],
  'Rivers': [4.8581, 7.0067],
  'Sokoto': [13.0059, 5.2476],
  'Taraba': [8.8937, 11.3602],
  'Yobe': [11.7383, 11.9662],
  'Zamfara': [12.1702, 6.6642]
};

function FacilityMap({ isDarkMode, facilities }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Only initialize map if facilities data exists
    if (facilities?.length > 0 && !mapRef.current) {
      const coordinates = facilities
        .filter(facility => facility.Latitude && facility.Longitude)
        .map(facility => [facility.Latitude, facility.Longitude]);

      const state = facilities[0]?.State;
      const center = stateCoordinates[state] || [9.0820, 8.6753]; // Fallback to Nigeria center
      const zoomLevel = coordinates.length > 0 ? 8 : 6;

      mapRef.current = L.map('map').setView(center, zoomLevel);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Adjust map bounds if multiple facilities
      if (coordinates.length > 1) {
        const bounds = L.latLngBounds(coordinates);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }

      // Invalidate size on initial load
      mapRef.current.invalidateSize();
    }

    // Remove existing markers if map exists
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) mapRef.current.removeLayer(layer);
      });

      // Add new markers for facilities
      facilities.forEach((facility) => {
        if (facility.Latitude && facility.Longitude) {
          L.marker([facility.Latitude, facility.Longitude])
            .addTo(mapRef.current)
            .bindPopup(`<b>${facility.Facility_Name}</b><br>${facility.State}, ${facility.LGA}`);
        }
      });

      // Apply dark mode filter
      mapRef.current.getContainer().style.filter = isDarkMode 
        ? 'invert(90%) hue-rotate(180deg) brightness(90%) contrast(110%)' 
        : 'none';
    }

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isDarkMode, facilities]);

  // Render map container with fixed dimensions
  return facilities?.length > 0 ? (
    <div id="map" className="map-container" style={{ height: '400px', width: '100%', position: 'relative', zIndex: 0 }}></div>
  ) : null;
}

export default FacilityMap;