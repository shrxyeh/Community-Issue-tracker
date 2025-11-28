import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const defaultCenter = [20.5937, 78.9629]; // India center

  const handleConfirm = () => {
    if (position) {
      const locationString = `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`;
      onLocationSelect(locationString);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">Click on the map to select location</p>
      <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
        <MapContainer
          center={defaultCenter}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
      {position && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Selected: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
          </p>
          <button
            type="button"
            onClick={handleConfirm}
            className="btn btn-primary text-sm"
          >
            Confirm Location
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
