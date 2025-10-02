'use client';

import { useEffect, useState } from 'react';
import { FishingLocation } from '@/types/fishing';
import { MapPin, Fish, Info, Clock } from 'lucide-react';

interface FishingMapClientFixedProps {
  onLocationSelect?: (location: FishingLocation) => void;
}

export default function FishingMapClientFixed({ onLocationSelect }: FishingMapClientFixedProps) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import the map components only on client side
    const loadMap = async () => {
      try {
        setMapError(null);
        const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
        const L = await import('leaflet');
        
        // Fix for default markers in Next.js
        delete (L.default.Icon.Default.prototype as any)._getIconUrl;
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        const { rhodeIslandFishingLocations } = await import('@/data/rhodeIslandLocations');

        const MapComponent = () => {
          const [selectedLocation, setSelectedLocation] = useState<FishingLocation | null>(null);

          const handleLocationClick = (location: FishingLocation) => {
            setSelectedLocation(location);
            onLocationSelect?.(location);
          };

          const getMarkerIcon = (location: FishingLocation) => {
            const color = location.type === 'saltwater' ? '#3B82F6' : '#10B981';
            
            return L.default.divIcon({
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

          return (
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <MapContainer
                center={[41.6500, -71.5000]}
                zoom={9}
                minZoom={8}
                maxZoom={16}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
                zoomControl={true}
                scrollWheelZoom={true}
                doubleClickZoom={true}
                dragging={true}
                touchZoom={true}
                boxZoom={true}
                keyboard={true}
                whenReady={() => {
                  // Force map to redraw after initialization
                  setTimeout(() => {
                    const map = document.querySelector('.leaflet-container');
                    if (map) {
                      (map as any)._leaflet_map?.invalidateSize();
                    }
                  }, 100);
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={18}
                  subdomains={['a', 'b', 'c']}
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
        };

        setMapComponent(() => MapComponent);
      } catch (error) {
        console.error('Failed to load map:', error);
        setMapError('Failed to load map. Please refresh the page.');
      }
    };

    loadMap();
  }, [onLocationSelect]);

  if (mapError) {
    return (
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg bg-red-50 border border-red-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 font-semibold mb-2">Map Loading Error</div>
          <div className="text-red-500 text-sm mb-4">{mapError}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!isClient || !MapComponent) {
    return (
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-gray-600">Loading interactive map...</div>
        </div>
      </div>
    );
  }

  return <MapComponent />;
}
