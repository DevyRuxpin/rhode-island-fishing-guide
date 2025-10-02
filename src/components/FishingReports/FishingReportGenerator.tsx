'use client';

import { useState } from 'react';
import { BarChart3, MapPin, Calendar, Download, RefreshCw } from 'lucide-react';
import { AIService } from '@/services/aiService';
import { rhodeIslandFishingLocations } from '@/data/rhodeIslandLocations';

export default function FishingReportGenerator() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const aiService = AIService.getInstance();

  const locations = rhodeIslandFishingLocations
    .sort((a, b) => {
      // Sort by type first (saltwater, then freshwater), then by name
      if (a.type !== b.type) {
        return a.type === 'saltwater' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    })
    .map(location => location.name);

  const generateReport = async () => {
    if (!selectedLocation) return;
    
    setLoading(true);
    try {
      const generatedReport = await aiService.generateFishingReport(selectedLocation, reportDate);
      setReport(generatedReport);
    } catch (error) {
      console.error('Failed to generate report:', error);
      setReport('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `fishing-report-${selectedLocation.toLowerCase().replace(/\s+/g, '-')}-${reportDate}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">AI Fishing Report Generator</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Select Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a location</option>
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
              <Calendar className="h-4 w-4 inline mr-1" />
              Report Date
            </label>
            <input
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={generateReport}
          disabled={loading || !selectedLocation}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <BarChart3 className="h-5 w-5 mr-2" />
              Generate Fishing Report
            </>
          )}
        </button>
      </div>

      {report && (
        <div className="bg-gray-50 rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Fishing Report - {selectedLocation}
            </h3>
            <button
              onClick={downloadReport}
              className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
          
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-gray-700 font-mono text-sm leading-relaxed">
              {report}
            </pre>
          </div>
        </div>
      )}

      {/* Report Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">AI Generated</h4>
          <p className="text-sm text-gray-600">Powered by advanced AI for accurate predictions</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">Real-Time Data</h4>
          <p className="text-sm text-gray-600">Based on current conditions and historical patterns</p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">Downloadable</h4>
          <p className="text-sm text-gray-600">Save reports for offline reference</p>
        </div>
      </div>
    </div>
  );
}
