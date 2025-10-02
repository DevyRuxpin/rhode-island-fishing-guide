'use client';

import { useState } from 'react';
import { Brain, Fish, MapPin, Clock, Droplets, Wind, Sun, Download } from 'lucide-react';
import { AIService } from '@/services/aiService';
import { FishingScenario, FishingRecommendation } from '@/types/fishing';
import { rhodeIslandFishingLocations } from '@/data/rhodeIslandLocations';
import { rhodeIslandFishSpecies } from '@/data/rhodeIslandFishSpecies';

export default function AIRecommendationEngine() {
  const [scenario, setScenario] = useState<FishingScenario>({
    id: '1',
    question: '',
    context: {
      location: '',
      fishSpecies: '',
      timeOfDay: '',
      season: '',
      weather: '',
      experience: 'beginner'
    },
    response: {} as FishingRecommendation
  });

  const [recommendation, setRecommendation] = useState<FishingRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const aiService = AIService.getInstance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await aiService.generateFishingRecommendation(scenario);
      setRecommendation(result);
    } catch (error) {
      console.error('Failed to generate recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setScenario(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContextChange = (field: string, value: string) => {
    setScenario(prev => ({
      ...prev,
      context: {
        ...prev.context,
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Brain className="h-8 w-8 text-purple-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">AI Fishing Recommendation Engine</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your fishing question or scenario?
          </label>
          <textarea
            value={scenario.question}
            onChange={(e) => handleInputChange('question', e.target.value)}
            placeholder="e.g., 'I want to catch striped bass from shore in the early morning during spring. What should I use?'"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        {/* Context Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Location
            </label>
            <select
              value={scenario.context.location || ''}
              onChange={(e) => handleContextChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a location</option>
              {rhodeIslandFishingLocations
                .sort((a, b) => {
                  // Sort by type first (saltwater, then freshwater), then by name
                  if (a.type !== b.type) {
                    return a.type === 'saltwater' ? -1 : 1;
                  }
                  return a.name.localeCompare(b.name);
                })
                .map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name} ({location.type === 'saltwater' ? 'Saltwater' : 'Freshwater'})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Fish className="h-4 w-4 inline mr-1" />
              Target Fish Species
            </label>
            <select
              value={scenario.context.fishSpecies || ''}
              onChange={(e) => handleContextChange('fishSpecies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a species</option>
              {rhodeIslandFishSpecies
                .sort((a, b) => {
                  // Sort by type first (saltwater, then freshwater), then by name
                  if (a.type !== b.type) {
                    return a.type === 'saltwater' ? -1 : 1;
                  }
                  return a.name.localeCompare(b.name);
                })
                .map((species) => (
                  <option key={species.id} value={species.name}>
                    {species.name} ({species.type === 'saltwater' ? 'Saltwater' : 'Freshwater'})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              Time of Day
            </label>
            <select
              value={scenario.context.timeOfDay || ''}
              onChange={(e) => handleContextChange('timeOfDay', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select time</option>
              <option value="Early Morning">Early Morning (5-8 AM)</option>
              <option value="Morning">Morning (8-12 PM)</option>
              <option value="Afternoon">Afternoon (12-5 PM)</option>
              <option value="Evening">Evening (5-8 PM)</option>
              <option value="Night">Night (8 PM - 5 AM)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Season
            </label>
            <select
              value={scenario.context.season || ''}
              onChange={(e) => handleContextChange('season', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select season</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Wind className="h-4 w-4 inline mr-1" />
              Weather Conditions
            </label>
            <select
              value={scenario.context.weather || ''}
              onChange={(e) => handleContextChange('weather', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select weather</option>
              <option value="Clear">Clear</option>
              <option value="Partly Cloudy">Partly Cloudy</option>
              <option value="Overcast">Overcast</option>
              <option value="Rainy">Rainy</option>
              <option value="Windy">Windy</option>
              <option value="Stormy">Stormy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              value={scenario.context.experience || 'beginner'}
              onChange={(e) => handleContextChange('experience', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Brain className="h-5 w-5 mr-2 animate-spin" />
              Generating Recommendation...
            </>
          ) : (
            <>
              <Brain className="h-5 w-5 mr-2" />
              Get AI Recommendation
            </>
          )}
        </button>
      </form>

      {/* Recommendation Results */}
      {recommendation && (
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Brain className="h-6 w-6 text-purple-600 mr-2" />
            AI Recommendation
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Times</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.recommendations.bestTimes.map((time, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Recommended Lures</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.recommendations.lures.map((lure, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {lure}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Baits</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.recommendations.bait.map((bait, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {bait}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Techniques</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.recommendations.techniques.map((technique, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {technique}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Pro Tips</h4>
              <div className="flex flex-wrap gap-2">
                {recommendation.recommendations.tips.map((tip, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {tip}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Reasoning</h4>
              <p className="text-gray-700 text-sm bg-white p-3 rounded border">
                {recommendation.reasoning}
              </p>
            </div>

            {/* AI Expert Response Section */}
            {recommendation.detailedReport && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  AI Expert Response
                </h4>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-purple-100 rounded-full p-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Rhode Island Fishing Expert</h5>
                      <p className="text-sm text-gray-600">AI-powered local fishing intelligence</p>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {recommendation.detailedReport}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center pt-4 border-t border-blue-200">
                    <span className="text-sm text-gray-500">
                      Generated: {new Date().toLocaleString()}
                    </span>
                    <button
                      onClick={() => {
                        const blob = new Blob([recommendation.detailedReport], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `rhode-island-fishing-advice-${recommendation.location.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Save Advice
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Confidence: {Math.round(recommendation.confidence * 100)}%</span>
              <span>Location: {recommendation.location}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
