'use client';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AIRecommendationEngine from '@/components/AI/AIRecommendationEngine';
import { Brain, Target, Zap, TrendingUp } from 'lucide-react';

export default function AIRecommendationsPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 ai-background"></div>
      <div className="absolute inset-0 page-overlay"></div>
      <div className="relative z-10">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-16 w-16 text-purple-600 mr-4" />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                AI Fishing Recommendations
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Get personalized fishing advice powered by advanced AI
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized</h3>
              <p className="text-gray-600 text-sm">
                Get recommendations tailored to your location, target species, and experience level.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant</h3>
              <p className="text-gray-600 text-sm">
                Receive immediate, actionable advice based on current conditions and patterns.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Effective</h3>
              <p className="text-gray-600 text-sm">
                Improve your fishing success with data-driven recommendations and local expertise.
              </p>
            </div>
          </div>
        </div>

        {/* AI Recommendation Engine */}
        <section className="mb-12">
          <AIRecommendationEngine />
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              How Our AI Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Input Your Scenario</h3>
                <p className="text-sm text-gray-600">
                  Tell us about your fishing plans, location, target species, and conditions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">
                  Our AI analyzes Rhode Island fishing patterns, regulations, and seasonal behavior.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Generate Recommendations</h3>
                <p className="text-sm text-gray-600">
                  Get specific advice on baits, lures, techniques, and timing for your situation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Success</h3>
                <p className="text-sm text-gray-600">
                  Apply the recommendations and improve your fishing success on Rhode Island waters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Questions */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Sample Questions to Try
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Beginner Questions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• "I'm new to fishing. What should I try first at Narragansett Bay?"</li>
                    <li>• "What's the easiest fish to catch from shore in Rhode Island?"</li>
                    <li>• "What basic gear do I need to start fishing?"</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Seasonal Questions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• "What's the best fishing in Rhode Island during spring?"</li>
                    <li>• "Where can I catch striped bass in the fall migration?"</li>
                    <li>• "What fish are active during winter in Rhode Island?"</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Technique Questions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• "How do I fish for fluke from a boat?"</li>
                    <li>• "What's the best way to catch tautog around structure?"</li>
                    <li>• "How do I fly fish for trout in Rhode Island rivers?"</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Weather Questions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• "How does weather affect fishing in Rhode Island?"</li>
                    <li>• "Is it worth fishing during stormy weather?"</li>
                    <li>• "What's the best fishing during incoming weather fronts?"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      </div>
    </div>
  );
}
