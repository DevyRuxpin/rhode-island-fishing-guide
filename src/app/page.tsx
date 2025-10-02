'use client';

import { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { rhodeIslandFishingLocations } from '@/data/rhodeIslandLocations';
import { rhodeIslandFishSpecies } from '@/data/rhodeIslandFishSpecies';
import { Fish, Brain, BarChart3, Waves, Wrench, BookOpen } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    locations: rhodeIslandFishingLocations.length,
    fishSpecies: rhodeIslandFishSpecies.length,
    saltwaterLocations: rhodeIslandFishingLocations.filter(l => l.type === 'saltwater').length,
    freshwaterLocations: rhodeIslandFishingLocations.filter(l => l.type === 'freshwater').length,
  };

  return (
    <div className="min-h-screen relative text-gray-900" suppressHydrationWarning>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: 'url("/images/backgrounds/background.jpg")'}}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/90"></div>
      <div className="relative z-10">
      <Header />
      
      <main className="container mx-auto px-4 py-8" suppressHydrationWarning>
        {/* Hero Section */}
        <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/30" suppressHydrationWarning>
            <Fish className="h-4 w-4 mr-2" suppressHydrationWarning />
            Rhode Island's #1 Fishing Guide
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8)'}}>
            Rhode Island Fishing Guide
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)'}}>
            Your comprehensive AI-powered fishing assistant for Rhode Island waters. 
            Get advanced recommendations, find the best spots, and improve your fishing success with real-time data.
          </p>
          {/* Interactive Hero Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Quick AI Recommendation */}
                <div className="bg-gradient-to-br from-purple-600/90 to-purple-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20" onClick={() => window.location.href = '/ai-recommendations'}>
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 mr-3" suppressHydrationWarning />
                <h3 className="text-xl font-bold">Get AI Advice</h3>
              </div>
              <p className="text-purple-100 text-sm mb-4">Ask our AI expert about Rhode Island fishing conditions, techniques, and gear recommendations.</p>
              <div className="flex items-center text-purple-200 text-sm">
                <span>Try it now</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Fish Species Guide */}
            <div className="bg-gradient-to-br from-blue-600/90 to-blue-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20" onClick={() => window.location.href = '/fish-species'}>
              <div className="flex items-center mb-4">
                <Fish className="h-8 w-8 mr-3" suppressHydrationWarning />
                <h3 className="text-xl font-bold">Fish Species</h3>
              </div>
              <p className="text-blue-100 text-sm mb-4">Explore 23+ fish species found in Rhode Island waters with detailed information, images, and locations.</p>
              <div className="flex items-center text-blue-200 text-sm">
                <span>Browse species</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Gear Recommendations */}
                <div className="bg-gradient-to-br from-green-600/90 to-green-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20" onClick={() => window.location.href = '/gear'}>
              <div className="flex items-center mb-4">
                <Wrench className="h-8 w-8 mr-3" suppressHydrationWarning />
                <h3 className="text-xl font-bold">Shop Gear</h3>
              </div>
              <p className="text-green-100 text-sm mb-4">Browse our curated starter kits with real, purchasable gear for every skill level and fishing type.</p>
              <div className="flex items-center text-green-200 text-sm">
                <span>View gear kits</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Stats with Animations */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="text-center p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/80 shadow-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stats.locations}</div>
                  <div className="text-sm text-gray-800 font-medium">Total Locations</div>
                </div>
                <div className="text-center p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/80 shadow-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">{stats.fishSpecies}</div>
                  <div className="text-sm text-gray-800 font-medium">Fish Species</div>
                </div>
                <div className="text-center p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/80 shadow-xl">
                  <div className="text-2xl font-bold text-cyan-600 mb-1">{stats.saltwaterLocations}</div>
                  <div className="text-sm text-gray-800 font-medium">Saltwater</div>
                </div>
                <div className="text-center p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/80 shadow-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{stats.freshwaterLocations}</div>
                  <div className="text-sm text-gray-800 font-medium">Freshwater</div>
                </div>
              </div>
        </div>

        {/* Featured Fishing Spots */}
        <section id="locations" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8)'}}>
              Featured Fishing Spots
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)'}}>
              Discover Rhode Island's most popular fishing destinations. Each location offers unique opportunities and stunning natural beauty.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Narragansett Bay */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-black/95 to-black/98 z-10"></div>
              <div className="h-64 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/images/backgrounds/ganset.jpg")'}}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <h3 className="text-2xl font-bold mb-2" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.9)'}}>Narragansett Bay</h3>
                <p className="text-white mb-3" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.9)'}}>Rhode Island's premier saltwater fishing destination with world-class striped bass, fluke, and bluefish</p>
                <div className="flex items-center text-sm" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.95)'}}>
                  <Fish className="h-4 w-4 mr-2" suppressHydrationWarning />
                  <span>Striped Bass, Fluke, Bluefish, Tautog</span>
                </div>
              </div>
            </div>

            {/* Block Island */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-black/95 to-black/98 z-10"></div>
              <div className="h-64 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/images/backgrounds/ptjudith.jpg")'}}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <h3 className="text-2xl font-bold mb-2" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.9)'}}>Block Island</h3>
                <p className="text-white mb-3" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.9)'}}>Rhode Island's premier offshore fishing destination with diverse opportunities</p>
                <div className="flex items-center text-sm" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.95)'}}>
                  <Fish className="h-4 w-4 mr-2" suppressHydrationWarning />
                  <span>Striped Bass, Cod, Pollock, Tautog</span>
                </div>
              </div>
            </div>

            {/* Lincoln Woods */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-black/95 to-black/98 z-10"></div>
              <div className="h-64 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/images/backgrounds/linc-woods.jpg")'}}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <h3 className="text-2xl font-bold mb-2" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.9)'}}>Lincoln Woods</h3>
                <p className="text-white mb-3" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.9)'}}>Popular Rhode Island freshwater destination with excellent bass fishing and beautiful hiking trails</p>
                <div className="flex items-center text-sm" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.95)'}}>
                  <Fish className="h-4 w-4 mr-2" suppressHydrationWarning />
                  <span>Largemouth Bass, Smallmouth Bass, Pickerel</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8)'}}>
              Advanced Features
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)'}}>
              Our AI-powered system provides comprehensive fishing intelligence to maximize your success on Rhode Island waters.
            </p>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <a href="/ai-recommendations" className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" suppressHydrationWarning />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized fishing recommendations based on location, season, and conditions.
              </p>
              <div className="mt-4 text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                Get Started →
              </div>
            </a>
            
            <a href="/reports" className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-8 w-8 text-white" suppressHydrationWarning />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fishing Reports</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-generated fishing reports with current conditions and predictions.
              </p>
              <div className="mt-4 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                View Reports →
              </div>
            </a>
            
            <a href="/fish-species" className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Fish className="h-8 w-8 text-white" suppressHydrationWarning />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fish Species Guide</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive guide to all fish species found in Rhode Island waters.
              </p>
              <div className="mt-4 text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                Explore Species →
              </div>
            </a>
            
            <a href="/gear" className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Wrench className="h-8 w-8 text-white" suppressHydrationWarning />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gear Guide</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive gear recommendations for Rhode Island fishing conditions.
              </p>
              <div className="mt-4 text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                Shop Gear →
              </div>
            </a>
            
            <a href="/journal" className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-white" suppressHydrationWarning />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fishing Journal</h3>
              <p className="text-gray-600 leading-relaxed">
                Document your fishing adventures and build your personal catch gallery.
              </p>
              <div className="mt-4 text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">
                Start Journal →
              </div>
            </a>
        </div>
        </section>
      </main>
      
      <Footer />
      </div>
    </div>
  );
}
