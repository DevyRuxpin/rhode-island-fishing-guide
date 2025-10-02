'use client';

import { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { rhodeIslandFishSpecies } from '@/data/rhodeIslandFishSpecies';
import { FishSpecies } from '@/types/fishing';
import { Fish, Search, Filter, Calendar, Ruler, AlertTriangle } from 'lucide-react';

export default function FishSpeciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'freshwater' | 'saltwater'>('all');
  const [selectedSpecies, setSelectedSpecies] = useState<FishSpecies | null>(null);

  const filteredSpecies = rhodeIslandFishSpecies.filter(species => {
    const matchesSearch = species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         species.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || species.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 fish-species-background"></div>
      <div className="absolute inset-0 page-overlay"></div>
      <div className="relative z-10">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Fish className="h-16 w-16 text-green-600 mr-4" />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Rhode Island Fish Species
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Comprehensive guide to fish species in Rhode Island waters
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="h-4 w-4 inline mr-1" />
                Search Species
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or scientific name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="h-4 w-4 inline mr-1" />
                Filter by Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'freshwater' | 'saltwater')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Species</option>
                <option value="freshwater">Freshwater</option>
                <option value="saltwater">Saltwater</option>
              </select>
            </div>
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSpecies.map((species) => (
                <div
                  key={species.id}
                  onClick={() => setSelectedSpecies(species)}
                  className="card-background rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
                >
              {/* Fish Image */}
              <div className="mb-4">
                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {species.image ? (
                    <img 
                      src={species.image} 
                      alt={species.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="flex flex-col items-center justify-center text-gray-500"><Fish class="h-8 w-8 mb-2" /><span class="text-sm">${species.name}</span></div>`;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Fish className="h-8 w-8 mb-2" />
                      <span className="text-sm">{species.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{species.name}</h3>
                  <p className="text-sm text-gray-600 italic">{species.scientificName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  species.type === 'saltwater' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {species.type}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{species.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Ruler className="h-4 w-4 mr-2" />
                  <span>Size: {species.size.min}" - {species.size.max}"</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Season: {species.season.start} - {species.season.end}</span>
                </div>
              </div>

              {/* Locations */}
              {species.locations && species.locations.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Found in:</h4>
                  <div className="flex flex-wrap gap-1">
                    {species.locations.slice(0, 3).map((location, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {location}
                      </span>
                    ))}
                    {species.locations.length > 3 && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        +{species.locations.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Best Baits:</h4>
                <div className="flex flex-wrap gap-1">
                  {species.bestBait.slice(0, 3).map((bait, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                      {bait}
                    </span>
                  ))}
                  {species.bestBait.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      +{species.bestBait.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Species Detail Modal */}
        {selectedSpecies && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedSpecies.name}</h2>
                    <p className="text-gray-600 italic">{selectedSpecies.scientificName}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSpecies(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Fish Image */}
                {selectedSpecies.image && (
                  <div className="mb-6">
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src={selectedSpecies.image} 
                        alt={selectedSpecies.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="flex flex-col items-center justify-center text-gray-500"><Fish class="h-16 w-16 mb-4" /><span class="text-lg font-medium">${selectedSpecies.name}</span></div>`;
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">Type:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedSpecies.type === 'saltwater' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {selectedSpecies.type}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Habitat:</span>
                        <span className="ml-2 text-gray-600">{selectedSpecies.habitat}</span>
                      </div>
                      <div>
                        <span className="font-medium">Size Range:</span>
                        <span className="ml-2 text-gray-600">
                          {selectedSpecies.size.min}" - {selectedSpecies.size.max}" 
                          (Average: {selectedSpecies.size.average}")
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Season:</span>
                        <span className="ml-2 text-gray-600">
                          {selectedSpecies.season.start} - {selectedSpecies.season.end}
                        </span>
                      </div>
                      {selectedSpecies.locations && selectedSpecies.locations.length > 0 && (
                        <div>
                          <span className="font-medium">Found in:</span>
                          <div className="ml-2 mt-1 flex flex-wrap gap-1">
                            {selectedSpecies.locations.map((location, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {location}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Regulations */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                      Regulations
                    </h3>
                    <div className="space-y-3">
                      {selectedSpecies.regulations.sizeLimit && (
                        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                          <span className="font-medium">Size Limit:</span>
                          <span className="ml-2">{selectedSpecies.regulations.sizeLimit}"</span>
                        </div>
                      )}
                      {selectedSpecies.regulations.possessionLimit && (
                        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                          <span className="font-medium">Possession Limit:</span>
                          <span className="ml-2">{selectedSpecies.regulations.possessionLimit} fish</span>
                        </div>
                      )}
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                        <span className="font-medium">Season Dates:</span>
                        <span className="ml-2">{selectedSpecies.regulations.seasonDates}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fishing Information */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Lures</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecies.bestLures.map((lure, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {lure}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Baits</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecies.bestBait.map((bait, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {bait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Times</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecies.bestTimes.map((time, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Techniques</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecies.techniques.map((technique, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {technique}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedSpecies.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Species Count */}
        <div className="text-center text-gray-600">
          Showing {filteredSpecies.length} of {rhodeIslandFishSpecies.length} species
        </div>
      </main>
      
      <Footer />
      </div>
    </div>
  );
}
