'use client';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import GearRecommendations from '@/components/Gear/GearRecommendations';
import BudgetStarterKits from '@/components/Gear/BudgetStarterKits';
import { Fish, Target, Star, Shield, Zap } from 'lucide-react';

export default function GearPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 gear-background"></div>
      <div className="absolute inset-0 page-overlay"></div>
      <div className="relative z-10">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Fish className="h-16 w-16 text-blue-600 mr-4" />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Fishing Gear Guide
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Expert recommendations for Rhode Island fishing equipment
              </p>
            </div>
          </div>
        </div>

        {/* Gear Recommendations */}
        <section className="mb-12">
          <GearRecommendations />
        </section>

        {/* Why Our Recommendations */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Why Our Gear Recommendations Matter
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Species Specific</h3>
                <p className="text-sm text-gray-600">
                  Gear recommendations tailored to specific Rhode Island fish species and their behaviors.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Tested & Proven</h3>
                <p className="text-sm text-gray-600">
                  All recommendations based on real-world testing in Rhode Island waters by local anglers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fish className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Local Expertise</h3>
                <p className="text-sm text-gray-600">
                  Recommendations from Rhode Island fishing guides and experienced local anglers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                <p className="text-sm text-gray-600">
                  Only recommending gear that can handle Rhode Island's challenging fishing conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gear Categories Overview */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Saltwater Fishing Gear</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Corrosion-resistant materials essential for saltwater</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Heavier tackle for larger fish and stronger currents</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Multiple rod setups for different techniques</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Quality drag systems for powerful fish like stripers</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Freshwater Fishing Gear</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Lighter tackle suitable for trout and bass</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Fly fishing equipment for rivers and streams</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Versatile spinning gear for multiple species</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Finesse presentations for pressured waters</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Budget-Friendly Starter Kits */}
        <section className="mb-12">
          <BudgetStarterKits />
        </section>
      </main>
      
      <Footer />
      </div>
    </div>
  );
}
