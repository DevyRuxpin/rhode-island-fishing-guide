'use client';

import dynamic from 'next/dynamic';
import { FishingLocation } from '@/types/fishing';

// Dynamically import the map component to avoid SSR issues
const FishingMapClient = dynamic(
  () => import('./FishingMapClientFixed'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    )
  }
);

interface FishingMapWrapperProps {
  onLocationSelect?: (location: FishingLocation) => void;
}

export default function FishingMapWrapper({ onLocationSelect }: FishingMapWrapperProps) {
  return <FishingMapClient onLocationSelect={onLocationSelect} />;
}
