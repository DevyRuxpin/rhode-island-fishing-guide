'use client';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import FishingReportGenerator from '@/components/FishingReports/FishingReportGenerator';
import { BarChart3, FileText, Calendar, MapPin } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 reports-background"></div>
      <div className="absolute inset-0 page-overlay"></div>
      <div className="relative z-10">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <BarChart3 className="h-16 w-16 text-blue-600 mr-4" />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Fishing Reports
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                AI-generated fishing reports with current conditions and predictions
              </p>
            </div>
          </div>
        </div>

        {/* Report Generator */}
        <section className="mb-12">
          <FishingReportGenerator />
        </section>

        {/* Report Features */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              What's Included in Our Reports
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Location Analysis</h3>
                <p className="text-sm text-gray-600">
                  Detailed analysis of specific Rhode Island fishing locations and their current conditions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Species Activity</h3>
                <p className="text-sm text-gray-600">
                  Current fish activity levels, migration patterns, and feeding behavior.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Seasonal Patterns</h3>
                <p className="text-sm text-gray-600">
                  Seasonal fishing patterns and predictions based on historical data.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Detailed Insights</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive fishing insights, tips, and recommendations for success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Reports */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Sample Report Structure
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Current Conditions</h3>
                <p className="text-sm text-gray-600">
                  Water temperature, weather conditions, tide information, and visibility reports.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Species Activity</h3>
                <p className="text-sm text-gray-600">
                  Detailed breakdown of which fish are active, where they're being caught, and current sizes.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Best Techniques</h3>
                <p className="text-sm text-gray-600">
                  Recommended fishing techniques, baits, lures, and equipment for current conditions.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Local Tips</h3>
                <p className="text-sm text-gray-600">
                  Rhode Island specific tips, regulations updates, and local fishing knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Report Benefits */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Save Time</h3>
              <p className="text-gray-600 text-sm">
                Get comprehensive fishing intelligence without spending hours researching conditions and patterns.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Improve Success</h3>
              <p className="text-gray-600 text-sm">
                Make informed decisions about where to fish, what to use, and when to go for maximum success.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Stay Current</h3>
              <p className="text-gray-600 text-sm">
                Access up-to-date information about Rhode Island fishing conditions and regulations.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      </div>
    </div>
  );
}
