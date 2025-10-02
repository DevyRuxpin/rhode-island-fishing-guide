'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { rhodeIslandFishingLocations } from '@/data/rhodeIslandLocations';
import { FishingLocation } from '@/types/fishing';
import { MapPin, Fish, Info, Clock } from 'lucide-react';

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface FishingMapClientProps {
  onLocationSelect?: (location: FishingLocation) => void;
}

export default function FishingMapClient({ onLocationSelect }: FishingMapClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<FishingLocation | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocationClick = (location: FishingLocation) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
  };

  const getMarkerIcon = (location: FishingLocation) => {
    const color = location.type === 'saltwater' ? '#3B82F6' : '#10B981';
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          border: 3px solid white;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">
          <span style="
            transform: rotate(45deg);
            color: white;
            font-size: 12px;
            font-weight: bold;
          ">F</span>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };

  if (!isClient) {
    return (
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[41.6500, -71.5000]}
        zoom={9}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {rhodeIslandFishingLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={getMarkerIcon(location)}
            eventHandlers={{
              click: () => handleLocationClick(location)
            }}
          >
            <Popup maxWidth={300} className="custom-popup">
              <div className="p-2">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold text-lg">{location.name}</h3>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    location.type === 'saltwater' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {location.type === 'saltwater' ? 'Saltwater' : 'Freshwater'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{location.description}</p>
                
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Fish className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Fish Species:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {location.fishSpecies.slice(0, 4).map((fish, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                        {fish}
                      </span>
                    ))}
                    {location.fishSpecies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                        +{location.fishSpecies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Best Times:</span>
                  </div>
                  <p className="text-xs text-gray-600">{location.bestTimes.join(', ')}</p>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Info className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Access:</span>
                  </div>
                  <p className="text-xs text-gray-600">{location.accessInfo}</p>
                </div>
                
                <button
                  onClick={() => handleLocationClick(location)}
                  className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
