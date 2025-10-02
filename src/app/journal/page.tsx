'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { JournalEntry, FishCaught } from '@/types/fishing';
import { journalService } from '@/services/journalService';
import { rhodeIslandFishingLocations } from '@/data/rhodeIslandLocations';
import { rhodeIslandFishSpecies } from '@/data/rhodeIslandFishSpecies';
import { Plus, BookOpen, Camera, MapPin, Calendar, Fish, X, Eye, Edit, Trash2 } from 'lucide-react';

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState<'new' | 'entries' | 'gallery'>('new');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [fishCaught, setFishCaught] = useState<FishCaught[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    content: '',
    weather: '',
    conditions: '',
    fishCaught: '',
    notes: '',
    fishImages: [] as File[]
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setJournalEntries(journalService.getJournalEntries());
    setFishCaught(journalService.getFishCaught());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      fishImages: [...prev.fishImages, ...files]
    }));

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fishImages: prev.fishImages.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert images to base64
      const base64Images: string[] = [];
      for (const file of formData.fishImages) {
        const base64 = await journalService.fileToBase64(file);
        base64Images.push(base64);
      }

      // Create journal entry
      const entry: JournalEntry = {
        id: journalService.generateId(),
        date: journalService.formatDate(new Date()),
        location: formData.location,
        title: formData.title,
        content: formData.content,
        fishImages: base64Images,
        weather: formData.weather,
        conditions: formData.conditions,
        fishCaught: formData.fishCaught.split(',').map(s => s.trim()).filter(Boolean),
        notes: formData.notes
      };

      // Save journal entry
      journalService.saveJournalEntry(entry);

      // Create fish caught entries
      for (let i = 0; i < base64Images.length; i++) {
        const fishCaughtEntry: FishCaught = {
          id: journalService.generateId(),
          image: base64Images[i],
          species: formData.fishCaught.split(',')[i]?.trim() || 'Unknown',
          location: formData.location,
          date: entry.date,
          journalEntryId: entry.id
        };
        journalService.addFishCaught(fishCaughtEntry);
      }

      // Reset form
      setFormData({
        title: '',
        location: '',
        content: '',
        weather: '',
        conditions: '',
        fishCaught: '',
        notes: '',
        fishImages: []
      });
      setImagePreviews([]);

      // Reload data
      loadData();
      setActiveTab('entries');

      alert('Journal entry saved successfully!');
    } catch (error) {
      console.error('Error saving journal entry:', error);
      alert('Error saving journal entry. Please try again.');
    }
  };

  const viewEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const deleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      journalService.deleteJournalEntry(id);
      loadData();
    }
  };

  const deleteFish = (id: string) => {
    if (confirm('Are you sure you want to delete this fish from your gallery?')) {
      journalService.deleteFishCaught(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 journal-background"></div>
      <div className="absolute inset-0 page-overlay"></div>
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/30">
              <BookOpen className="h-4 w-4 mr-2" />
              Your Personal Fishing Journal
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8)'}}>
              Fishing Journal
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)'}}>
              Record your fishing adventures, upload photos of your catches, and build your personal fishing memory book.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-xl">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
                    activeTab === 'new' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Entry
                </button>
                <button
                  onClick={() => setActiveTab('entries')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
                    activeTab === 'entries' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Journal ({journalEntries.length})
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
                    activeTab === 'gallery' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Fish Gallery ({fishCaught.length})
                </button>
              </div>
            </div>
          </div>

          {/* New Entry Form */}
          {activeTab === 'new' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">New Journal Entry</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Entry Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Great day at Narragansett Bay"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a location</option>
                        {rhodeIslandFishingLocations.map(location => (
                          <option key={location.id} value={location.name}>
                            {location.name} ({location.type})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Journal Entry *</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your fishing experience, techniques used, what worked, what didn't..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Weather</label>
                      <input
                        type="text"
                        name="weather"
                        value={formData.weather}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Sunny, 75°F, light wind"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Water Conditions</label>
                      <input
                        type="text"
                        name="conditions"
                        value={formData.conditions}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Clear, calm, low tide"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fish Caught</label>
                    <input
                      type="text"
                      name="fishCaught"
                      value={formData.fishCaught}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Striped Bass, Fluke (separate multiple species with commas)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fish Photos</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any additional thoughts, tips, or observations..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Save Journal Entry
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Journal Entries */}
          {activeTab === 'entries' && (
            <div className="max-w-6xl mx-auto">
              {journalEntries.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Journal Entries Yet</h3>
                  <p className="text-white/80 mb-6">Start documenting your fishing adventures!</p>
                  <button
                    onClick={() => setActiveTab('new')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Entry
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {journalEntries.map(entry => (
                    <div key={entry.id} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                      {entry.fishImages.length > 0 && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={entry.fishImages[0]}
                            alt="Fish catch"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(entry.date).toLocaleDateString()}
                          <MapPin className="h-4 w-4 ml-4 mr-1" />
                          {entry.location}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{entry.title}</h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {entry.content.substring(0, 150)}...
                        </p>
                        
                        {entry.fishCaught.length > 0 && (
                          <div className="flex items-center text-sm text-blue-600 mb-4">
                            <Fish className="h-4 w-4 mr-1" />
                            {entry.fishCaught.join(', ')}
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewEntry(entry)}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </button>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Fish Gallery */}
          {activeTab === 'gallery' && (
            <div className="max-w-6xl mx-auto">
              {fishCaught.length === 0 ? (
                <div className="text-center py-12">
                  <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Fish Photos Yet</h3>
                  <p className="text-white/80 mb-6">Upload photos of your catches to build your gallery!</p>
                  <button
                    onClick={() => setActiveTab('new')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Catch
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {fishCaught.map(fish => (
                    <div key={fish.id} className="relative group bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={fish.image}
                          alt={`${fish.species} caught at ${fish.location}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                        <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-sm font-semibold">{fish.species}</div>
                          <div className="text-xs">{fish.location}</div>
                          <div className="text-xs">{new Date(fish.date).toLocaleDateString()}</div>
                          {fish.size && <div className="text-xs">Size: {fish.size}</div>}
                          {fish.weight && <div className="text-xs">Weight: {fish.weight}</div>}
                        </div>
                        
                        <button
                          onClick={() => deleteFish(fish.id)}
                          className="absolute top-2 right-2 bg-red-500/80 text-white rounded-full p-1 hover:bg-red-600/80 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Journal Entry Modal */}
          {isModalOpen && selectedEntry && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedEntry.title}</h2>
                      <div className="flex items-center text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(selectedEntry.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedEntry.location}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {selectedEntry.fishImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {selectedEntry.fishImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Fish catch ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                      ))}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Journal Entry</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedEntry.content}</p>
                    </div>

                    {selectedEntry.fishCaught.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Fish Caught</h3>
                        <div className="flex items-center text-blue-600">
                          <Fish className="h-5 w-5 mr-2" />
                          {selectedEntry.fishCaught.join(', ')}
                        </div>
                      </div>
                    )}

                    {(selectedEntry.weather || selectedEntry.conditions) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedEntry.weather && (
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Weather</h3>
                            <p className="text-gray-700">{selectedEntry.weather}</p>
                          </div>
                        )}
                        {selectedEntry.conditions && (
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Water Conditions</h3>
                            <p className="text-gray-700">{selectedEntry.conditions}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedEntry.notes && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Additional Notes</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedEntry.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
