'use client';

import { useState } from 'react';
import { ExternalLink, ShoppingCart, CheckCircle, Star, DollarSign } from 'lucide-react';

interface StarterKitItem {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: string;
  url: string;
  rating: number;
  features: string[];
}

interface StarterKit {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  items: StarterKitItem[];
  totalPrice: string;
  bestFor: string;
  color: string;
}

const budgetStarterKits: StarterKit[] = [
  {
    id: 'beginner-freshwater',
    name: 'Beginner Freshwater Kit',
    priceRange: '$120-150',
    description: 'Perfect for getting started with Rhode Island freshwater fishing',
    level: 'beginner',
    color: 'green',
    bestFor: 'Getting started with bass, trout, and panfish',
    totalPrice: '$135',
    items: [
      {
        id: 'ugly-stik-freshwater',
        name: 'Ugly Stik GX2 Freshwater Combo',
        brand: 'Shakespeare',
        description: '6\'6" Medium spinning rod and reel combo - perfect for freshwater beginners',
        price: '$59.99',
        url: 'https://www.amazon.com/dp/B0015T8J1K',
        rating: 4.6,
        features: ['Great for beginners', 'Handles freshwater well', 'Durable construction']
      },
      {
        id: 'plano-tackle-box-fw',
        name: 'Plano 3600 Tackle Box',
        brand: 'Plano',
        description: 'Compact tackle storage perfect for freshwater fishing',
        price: '$15.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.4,
        features: ['Compact size', 'Adjustable dividers', 'Lightweight']
      },
      {
        id: 'berkley-worms',
        name: 'Berkley PowerBait Worms',
        brand: 'Berkley',
        description: 'Soft plastic worms - bass fishing essential',
        price: '$8.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.5,
        features: ['Great action', 'Multiple colors', 'Bass favorite']
      },
      {
        id: 'eagle-claw-hooks',
        name: 'Eagle Claw Worm Hooks',
        brand: 'Eagle Claw',
        description: '2/0-4/0 worm hooks for soft plastics',
        price: '$6.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.3,
        features: ['Sharp points', 'Good value', 'Multiple sizes']
      },
      {
        id: 'mono-line',
        name: 'Berkley Trilene Monofilament',
        brand: 'Berkley',
        description: '10lb monofilament line - 300 yards',
        price: '$12.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.4,
        features: ['Good stretch', 'Easy to handle', 'Great for beginners']
      },
      {
        id: 'split-shot',
        name: 'Split Shot Sinkers',
        brand: 'Various',
        description: 'Assorted split shot sinkers for freshwater',
        price: '$4.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.2,
        features: ['Easy to adjust', 'Multiple sizes', 'Good for finesse']
      },
      {
        id: 'bobbers',
        name: 'Clip-on Bobbers',
        brand: 'Various',
        description: 'Assorted bobbers for live bait fishing',
        price: '$7.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.3,
        features: ['Easy to use', 'Multiple sizes', 'Great for beginners']
      },
      {
        id: 'powerbait',
        name: 'Berkley PowerBait Dough',
        brand: 'Berkley',
        description: 'Trout fishing dough bait',
        price: '$5.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.6,
        features: ['Effective for trout', 'Easy to use', 'Long lasting']
      }
    ]
  },
  {
    id: 'beginner-saltwater',
    name: 'Beginner Saltwater Kit',
    priceRange: '$180-220',
    description: 'Perfect for getting started with Rhode Island saltwater fishing',
    level: 'beginner',
    color: 'blue',
    bestFor: 'Getting started with stripers, fluke, and bluefish',
    totalPrice: '$195',
    items: [
      {
        id: 'ugly-stik-gx2',
        name: 'Ugly Stik GX2 Spinning Combo',
        brand: 'Shakespeare',
        description: '7ft Medium-Heavy spinning rod and reel combo - perfect for beginners',
        price: '$69.99',
        url: 'https://www.amazon.com/dp/B0015T8J1K',
        rating: 4.6,
        features: ['Durable construction', 'Great for beginners', 'Handles saltwater well']
      },
      {
        id: 'plano-tackle-box',
        name: 'Plano 3700 Tackle Box',
        brand: 'Plano',
        description: 'Essential tackle storage with adjustable dividers',
        price: '$19.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.4,
        features: ['Adjustable dividers', 'Durable construction', 'Waterproof']
      },
      {
        id: 'bucktail-jigs',
        name: 'Bucktail Jigs Assortment',
        brand: 'Various',
        description: '1-4oz bucktail jigs for fluke and striped bass',
        price: '$24.99',
        url: 'https://www.amazon.com/dp/B08N5XJ8QZ',
        rating: 4.3,
        features: ['Multiple weights', 'Great for fluke', 'Versatile']
      },
      {
        id: 'mustad-hooks',
        name: 'Mustad Circle Hooks Assortment',
        brand: 'Mustad',
        description: '2/0-4/0 circle hooks for live bait fishing',
        price: '$12.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.5,
        features: ['Circle hooks', 'Sharp points', 'Corrosion resistant']
      },
      {
        id: 'braided-line',
        name: 'PowerPro Braided Line',
        brand: 'PowerPro',
        description: '20lb braided line - 150 yards',
        price: '$24.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.7,
        features: ['Super strong', 'No stretch', 'Long lasting']
      },
      {
        id: 'sinkers',
        name: 'Bank Sinkers Assortment',
        brand: 'Various',
        description: '1-4oz bank sinkers for bottom fishing',
        price: '$18.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.2,
        features: ['Multiple sizes', 'Good for current', 'Heavy duty']
      },
      {
        id: 'swivels',
        name: 'Ball Bearing Swivels',
        brand: 'Various',
        description: 'Size 2-4 ball bearing swivels to prevent line twist',
        price: '$8.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.4,
        features: ['Prevents line twist', 'Strong construction', 'Smooth action']
      },
      {
        id: 'soft-plastics',
        name: 'Soft Plastic Lures Kit',
        brand: 'Berkley',
        description: 'Assortment of soft plastic swimbaits and worms',
        price: '$15.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.3,
        features: ['Multiple colors', 'Realistic action', 'Versatile']
      }
    ]
  },
  {
    id: 'intermediate-freshwater',
    name: 'Intermediate Freshwater Kit',
    priceRange: '$320-380',
    description: 'Step up your freshwater fishing game with quality gear',
    level: 'intermediate',
    color: 'blue',
    bestFor: 'Serious bass and trout fishing',
    totalPrice: '$345',
    items: [
      {
        id: 'st-croix-premier',
        name: 'St. Croix Premier Spinning Rod',
        brand: 'St. Croix',
        description: '7ft Medium action spinning rod - excellent sensitivity',
        price: '$159.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.8,
        features: ['Excellent sensitivity', 'Lightweight', 'Great warranty']
      },
      {
        id: 'penn-battle-iii',
        name: 'Penn Battle III Spinning Reel',
        brand: 'Penn',
        description: '3000 size spinning reel with smooth drag',
        price: '$89.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.6,
        features: ['Smooth drag', 'Corrosion resistant', 'Great value']
      },
      {
        id: 'seaguar-fluorocarbon',
        name: 'Seaguar Fluorocarbon Leader',
        brand: 'Seaguar',
        description: '15lb fluorocarbon leader material',
        price: '$24.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.7,
        features: ['Invisible underwater', 'Abrasion resistant', 'Low stretch']
      },
      {
        id: 'zoom-worms',
        name: 'Zoom Super Fluke Kit',
        brand: 'Zoom',
        description: 'Soft plastic jerkbaits in multiple colors',
        price: '$18.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.5,
        features: ['Great action', 'Multiple colors', 'Bass favorite']
      },
      {
        id: 'rapala-crankbaits',
        name: 'Rapala Crankbait Kit',
        brand: 'Rapala',
        description: 'Assortment of diving crankbaits',
        price: '$34.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.4,
        features: ['Realistic action', 'Quality hooks', 'Multiple depths']
      },
      {
        id: 'gamakatsu-hooks',
        name: 'Gamakatsu Worm Hooks',
        brand: 'Gamakatsu',
        description: '2/0-4/0 worm hooks for soft plastics',
        price: '$16.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.8,
        features: ['Ultra sharp', 'Strong construction', 'Perfect for worms']
      }
    ]
  },
  {
    id: 'intermediate-saltwater',
    name: 'Intermediate Saltwater Kit',
    priceRange: '$380-450',
    description: 'Serious saltwater fishing gear for Rhode Island waters',
    level: 'intermediate',
    color: 'cyan',
    bestFor: 'Targeting stripers, fluke, and bluefish consistently',
    totalPrice: '$415',
    items: [
      {
        id: 'st-croix-mojo-saltwater',
        name: 'St. Croix Mojo Saltwater Rod',
        brand: 'St. Croix',
        description: '7\'6" Medium-Heavy spinning rod designed for saltwater',
        price: '$179.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.7,
        features: ['Saltwater rated', 'Excellent sensitivity', 'Corrosion resistant']
      },
      {
        id: 'penn-battle-iii-4000',
        name: 'Penn Battle III Spinning Reel',
        brand: 'Penn',
        description: '4000 size spinning reel with smooth drag for saltwater',
        price: '$99.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.6,
        features: ['Smooth drag', 'Corrosion resistant', 'Great value']
      },
      {
        id: 'powerpro-braided-30lb',
        name: 'PowerPro Spectra Braided Line',
        brand: 'PowerPro',
        description: '30lb braided line - 300 yards',
        price: '$34.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.7,
        features: ['Super strong', 'No stretch', 'Long casting']
      },
      {
        id: 'seaguar-fluorocarbon-salt',
        name: 'Seaguar Blue Label Fluorocarbon',
        brand: 'Seaguar',
        description: '40lb fluorocarbon leader material',
        price: '$28.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.6,
        features: ['Abrasion resistant', 'Low stretch', 'Clear underwater']
      },
      {
        id: 'mustad-circle-hooks',
        name: 'Mustad Circle Hooks',
        brand: 'Mustad',
        description: '3/0-5/0 circle hooks for live bait',
        price: '$16.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.5,
        features: ['Circle hooks', 'Sharp points', 'Corrosion resistant']
      },
      {
        id: 'spark-plugs',
        name: 'SPRO Bucktail Jigs',
        brand: 'SPRO',
        description: '2-4oz bucktail jigs for fluke and stripers',
        price: '$24.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.4,
        features: ['Quality bucktail', 'Great action', 'Multiple weights']
      },
      {
        id: 'bank-sinkers-heavy',
        name: 'Bank Sinkers Heavy Duty',
        brand: 'Various',
        description: '2-6oz bank sinkers for strong current',
        price: '$19.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.3,
        features: ['Heavy duty', 'Good for current', 'Multiple sizes']
      },
      {
        id: 'ball-bearing-swivels-large',
        name: 'Ball Bearing Swivels Large',
        brand: 'Various',
        description: 'Size 4-6 ball bearing swivels',
        price: '$12.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.4,
        features: ['Prevents line twist', 'Strong construction', 'Smooth action']
      }
    ]
  },
  {
    id: 'advanced-freshwater',
    name: 'Advanced Freshwater Kit',
    priceRange: '$480-550',
    description: 'Professional-grade freshwater gear for serious anglers',
    level: 'advanced',
    color: 'purple',
    bestFor: 'Expert bass and trout fishing with premium gear',
    totalPrice: '$515',
    items: [
      {
        id: 'g-loomis-freshwater',
        name: 'G. Loomis IMX Pro Spinning Rod',
        brand: 'G. Loomis',
        description: '7\' Medium action spinning rod - premium sensitivity',
        price: '$299.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.9,
        features: ['Exceptional sensitivity', 'Lightweight', 'Premium construction']
      },
      {
        id: 'shimano-stradic-freshwater',
        name: 'Shimano Stradic FL Spinning Reel',
        brand: 'Shimano',
        description: '2500 size spinning reel with smooth drag system',
        price: '$179.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.8,
        features: ['Smooth drag', 'Lightweight', 'Durable construction']
      },
      {
        id: 'seaguar-fluorocarbon-premium',
        name: 'Seaguar Tatsu Fluorocarbon',
        brand: 'Seaguar',
        description: '12lb fluorocarbon leader material',
        price: '$39.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.8,
        features: ['Ultra clear', 'Abrasion resistant', 'Low stretch']
      },
      {
        id: 'zoom-super-fluke-premium',
        name: 'Zoom Super Fluke Premium Kit',
        brand: 'Zoom',
        description: 'Premium soft plastic jerkbaits in multiple colors',
        price: '$24.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.6,
        features: ['Great action', 'Multiple colors', 'Bass favorite']
      },
      {
        id: 'megabass-crankbaits',
        name: 'Megabass Crankbait Collection',
        brand: 'Megabass',
        description: 'Premium diving crankbaits',
        price: '$49.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.7,
        features: ['Premium quality', 'Realistic action', 'Multiple depths']
      },
      {
        id: 'gamakatsu-hooks-premium',
        name: 'Gamakatsu G-Finesse Hooks',
        brand: 'Gamakatsu',
        description: 'Premium worm hooks for finesse fishing',
        price: '$22.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.9,
        features: ['Ultra sharp', 'Strong construction', 'Perfect for finesse']
      }
    ]
  },
  {
    id: 'advanced-saltwater',
    name: 'Advanced Saltwater Kit',
    priceRange: '$520-580',
    description: 'Professional-grade gear for serious Rhode Island fishing',
    level: 'advanced',
    color: 'red',
    bestFor: 'Expert anglers targeting trophy fish',
    totalPrice: '$545',
    items: [
      {
        id: 'shimano-teramar',
        name: 'Shimano Teramar TMS-X80M',
        brand: 'Shimano',
        description: '8ft Medium-Heavy spinning rod for serious saltwater fishing',
        price: '$199.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.9,
        features: ['Exceptional sensitivity', 'Lightweight', 'Corrosion resistant']
      },
      {
        id: 'shimano-stradic',
        name: 'Shimano Stradic FL Spinning Reel',
        brand: 'Shimano',
        description: '4000 size spinning reel with smooth drag system',
        price: '$179.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.8,
        features: ['Smooth drag', 'Lightweight', 'Durable construction']
      },
      {
        id: 'powerpro-braided',
        name: 'PowerPro Spectra Braided Line',
        brand: 'PowerPro',
        description: '30lb braided line - 300 yards',
        price: '$34.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.7,
        features: ['Super strong', 'No stretch', 'Long casting']
      },
      {
        id: 'owner-fluorocarbon',
        name: 'Owner Fluorocarbon Leader',
        brand: 'Owner',
        description: '50lb fluorocarbon leader material',
        price: '$29.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.6,
        features: ['Abrasion resistant', 'Low stretch', 'Clear']
      },
      {
        id: 'strike-king-lures',
        name: 'Strike King Pro Model Lures',
        brand: 'Strike King',
        description: 'Premium lure collection for various conditions',
        price: '$49.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.5,
        features: ['Professional quality', 'Multiple types', 'Great action']
      },
      {
        id: 'owner-hooks',
        name: 'Owner Circle Hooks',
        brand: 'Owner',
        description: '3/0-5/0 circle hooks for live bait',
        price: '$24.99',
        url: 'https://www.amazon.com/dp/B000BQN8G4',
        rating: 4.9,
        features: ['Ultra sharp', 'Strong', 'Perfect circle shape']
      }
    ]
  }
];

export default function BudgetStarterKits() {
  const [selectedKit, setSelectedKit] = useState<StarterKit | null>(null);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          button: 'bg-green-600 hover:bg-green-700'
        };
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'cyan':
        return {
          bg: 'bg-cyan-100',
          text: 'text-cyan-800',
          border: 'border-cyan-200',
          button: 'bg-cyan-600 hover:bg-cyan-700'
        };
      case 'purple':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-800',
          border: 'border-purple-200',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      case 'red':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          button: 'bg-red-600 hover:bg-red-700'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  const handleBuyKit = (kit: StarterKit) => {
    // Calculate total price and create a summary
    const totalPrice = kit.items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + price;
    }, 0);

    const kitSummary = `Rhode Island Fishing Starter Kit - ${kit.name}\n\n`;
    const itemsList = kit.items.map(item => 
      `• ${item.name} (${item.brand}) - ${item.price}\n  ${item.description}`
    ).join('\n\n');
    
    const summary = `${kitSummary}Total: $${totalPrice.toFixed(2)}\n\nItems:\n${itemsList}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(summary);
    
    // Show success message (you could add a toast notification here)
    alert(`Kit summary copied to clipboard! Total: $${totalPrice.toFixed(2)}\n\nYou can now paste this into your shopping cart or notes.`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Budget-Friendly Starter Kits
        </h2>
        <p className="text-gray-600 max-w-4xl mx-auto">
          Comprehensive gear kits for every Rhode Island fishing scenario - from freshwater ponds to saltwater bays. 
          Each kit includes everything you need with direct links to purchase. Choose from beginner to advanced levels 
          for both freshwater and saltwater fishing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {budgetStarterKits.map((kit) => {
          const colors = getColorClasses(kit.color);
          return (
            <div 
              key={kit.id} 
              className={`border-2 ${colors.border} rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer`}
              onClick={() => setSelectedKit(kit)}
            >
              <div className="text-center mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} mb-3`}>
                  <Star className="h-4 w-4 mr-1" />
                  {kit.level.charAt(0).toUpperCase() + kit.level.slice(1)} Level
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{kit.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">{kit.priceRange}</p>
                <p className="text-gray-600 text-sm">{kit.description}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {kit.items.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      {item.name}
                    </li>
                  ))}
                  {kit.items.length > 4 && (
                    <li className="text-gray-500 text-xs">
                      +{kit.items.length - 4} more items
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="text-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} mb-3 inline-block`}>
                  {kit.bestFor}
                </span>
                <div className="space-y-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedKit(kit);
                    }}
                    className="w-full text-sm bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyKit(kit);
                    }}
                    className={`w-full text-sm ${colors.button} text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Copy Kit List
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kit Details Modal */}
      {selectedKit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedKit.name}</h3>
                  <p className="text-gray-600">{selectedKit.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedKit(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {selectedKit.items.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <span className="text-lg font-bold text-green-600">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{item.rating}/5</span>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-900 mb-1">Features:</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {item.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Amazon
                    </a>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Total Kit Price</h4>
                    <p className="text-gray-600">All items combined</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedKit.items.reduce((sum, item) => {
                        return sum + parseFloat(item.price.replace('$', ''));
                      }, 0).toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-600">+ shipping & tax</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleBuyKit(selectedKit)}
                    className={`flex-1 ${getColorClasses(selectedKit.color).button} text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center`}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Copy Kit Shopping List
                  </button>
                  <button 
                    onClick={() => setSelectedKit(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-500 mt-6">
        <p>
          <strong>Note:</strong> Prices are approximate and may vary. 
          Click "Copy Kit Shopping List" to get a formatted list you can use for shopping.
          All links are to Amazon for convenience, but you can find these items at local tackle shops too!
        </p>
      </div>
    </div>
  );
}
