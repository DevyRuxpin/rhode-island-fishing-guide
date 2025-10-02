'use client';

import { useState } from 'react';
import { Fish, Zap, Target, Anchor, Wrench, Star, MapPin, Clock, Thermometer, Wind } from 'lucide-react';

interface GearCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: GearItem[];
  description: string;
}

interface GearItem {
  name: string;
  brand: string;
  description: string;
  price: string;
  bestFor: string[];
  rating: number;
  pros: string[];
  cons: string[];
  whereToBuy: string[];
  riSpecific: string;
}

const gearCategories: GearCategory[] = [
  {
    id: 'rods',
    name: 'Fishing Rods',
    icon: <Zap className="h-6 w-6" />,
    description: 'Essential rods for Rhode Island fishing conditions',
    items: [
      {
        name: 'Ugly Stik GX2 Spinning Rod',
        brand: 'Shakespeare',
        description: 'Durable, versatile rod perfect for Rhode Island fishing. Built to handle both freshwater and light saltwater conditions.',
        price: '$50-80',
        bestFor: ['Striped Bass', 'Bluefish', 'Fluke', 'Largemouth Bass', 'Chain Pickerel'],
        rating: 4.5,
        pros: ['Extremely durable', 'Great value', 'Works in salt and fresh water', 'Good for beginners'],
        cons: ['Not the most sensitive', 'Heavier than premium rods'],
        whereToBuy: ['Walmart', 'Bass Pro Shops', 'Cabelas', 'Local tackle shops'],
        riSpecific: 'Perfect for Narragansett Bay and freshwater ponds. Can handle the varied conditions from Block Island to inland waters.'
      },
      {
        name: 'Shimano Teramar TMS-X80M',
        brand: 'Shimano',
        description: 'Premium spinning rod designed for serious saltwater anglers targeting big fish in Rhode Island waters.',
        price: '$150-200',
        bestFor: ['Striped Bass', 'Tautog', 'Black Sea Bass', 'Bluefish'],
        rating: 4.8,
        pros: ['Excellent sensitivity', 'Lightweight', 'Corrosion resistant', 'Great for jigging'],
        cons: ['Higher price point', 'May be too light for heavy surf'],
        whereToBuy: ['Bass Pro Shops', 'Cabelas', 'Tackle Direct', 'Local tackle shops'],
        riSpecific: 'Ideal for Block Island and deep water fishing. Excellent for tautog fishing on rocky bottom.'
      },
      {
        name: 'St. Croix Premier Spinning Rod',
        brand: 'St. Croix',
        description: 'High-quality rod perfect for freshwater fishing in Rhode Island ponds and rivers.',
        price: '$100-150',
        bestFor: ['Trout', 'Bass', 'Pickerel', 'Yellow Perch', 'Crappie'],
        rating: 4.6,
        pros: ['Excellent sensitivity', 'Lightweight', 'Great action', 'Made in USA'],
        cons: ['Not suitable for saltwater', 'Higher price'],
        whereToBuy: ['Bass Pro Shops', 'Cabelas', 'Dick\'s Sporting Goods', 'Local tackle shops'],
        riSpecific: 'Perfect for Scituate Reservoir, Meshanticut Lake, and other freshwater locations.'
      },
      {
        name: 'Penn Battle III Spinning Combo',
        brand: 'Penn',
        description: 'Complete rod and reel combo designed for saltwater fishing in Rhode Island.',
        price: '$120-160',
        bestFor: ['Striped Bass', 'Bluefish', 'Fluke', 'Scup', 'Black Sea Bass'],
        rating: 4.7,
        pros: ['Complete setup', 'Saltwater ready', 'Good drag system', 'Great value'],
        cons: ['Reel may need upgrading later', 'Rod could be more sensitive'],
        whereToBuy: ['Bass Pro Shops', 'Cabelas', 'Amazon', 'Local tackle shops'],
        riSpecific: 'Excellent starter setup for Narragansett Bay fishing. Ready to fish right out of the box.'
      }
    ]
  },
  {
    id: 'reels',
    name: 'Fishing Reels',
    icon: <Wrench className="h-6 w-6" />,
    description: 'Reliable reels for Rhode Island fishing conditions',
    items: [
      {
        name: 'Shimano Stradic FL Spinning Reel',
        brand: 'Shimano',
        description: 'Premium spinning reel with excellent drag and smooth operation for serious anglers.',
        price: '$200-250',
        bestFor: ['Striped Bass', 'Bluefish', 'Fluke', 'Tautog', 'Black Sea Bass'],
        rating: 4.9,
        pros: ['Smooth drag', 'Corrosion resistant', 'Lightweight', 'Excellent line capacity'],
        cons: ['Expensive', 'May be overkill for beginners'],
        whereToBuy: ['Bass Pro Shops', 'Cabelas', 'Tackle Direct', 'Local tackle shops'],
        riSpecific: 'Perfect for Block Island and deep water fishing. Can handle large striped bass and bluefish.'
      },
      {
        name: 'Penn Fierce III Spinning Reel',
        brand: 'Penn',
        description: 'Durable spinning reel designed for saltwater conditions with good drag system.',
        price: '$80-120',
        bestFor: ['Striped Bass', 'Bluefish', 'Fluke', 'Scup'],
        rating: 4.4,
        pros: ['Saltwater ready', 'Good drag', 'Durable construction', 'Good value'],
        cons: ['Heavier than premium reels', 'Not as smooth as high-end models'],
        whereToBuy: ['Walmart', 'Bass Pro Shops', 'Cabelas', 'Amazon'],
        riSpecific: 'Great for Narragansett Bay fishing. Can handle the salt and sand of Rhode Island beaches.'
      },
      {
        name: 'Daiwa BG Spinning Reel',
        brand: 'Daiwa',
        description: 'Solid spinning reel with good drag and smooth operation for the price.',
        price: '$100-140',
        bestFor: ['Striped Bass', 'Bluefish', 'Fluke', 'Tautog'],
        rating: 4.6,
        pros: ['Good drag system', 'Smooth operation', 'Saltwater ready', 'Good value'],
        cons: ['Heavier than some competitors', 'Limited line capacity on smaller sizes'],
        whereToBuy: ['Bass Pro Shops', 'Cabelas', 'Tackle Direct', 'Local tackle shops'],
        riSpecific: 'Excellent for Rhode Island saltwater fishing. Good balance of performance and price.'
      }
    ]
  },
  {
    id: 'lures',
    name: 'Lures & Baits',
    icon: <Target className="h-6 w-6" />,
    description: 'Effective lures for Rhode Island fish species',
    items: [
      {
        name: 'Bucktail Jigs (1-4 oz)',
        brand: 'Various',
        description: 'Essential lures for Rhode Island fishing, especially effective for fluke and bass.',
        price: '$5-15',
        bestFor: ['Fluke', 'Striped Bass', 'Bluefish', 'Black Sea Bass'],
        rating: 4.8,
        pros: ['Versatile', 'Effective in current', 'Good for multiple species', 'Inexpensive'],
        cons: ['Can snag on rocks', 'Requires proper technique'],
        whereToBuy: ['Local tackle shops', 'Bass Pro Shops', 'Cabelas', 'Amazon'],
        riSpecific: 'Essential for fluke fishing in Narragansett Bay. Different weights for different depths and currents.'
      },
      {
        name: 'Soft Plastic Swimbaits',
        brand: 'Berkley, Zoom, Strike King',
        description: 'Versatile soft plastics that work for both freshwater and saltwater fishing.',
        price: '$3-8',
        bestFor: ['Striped Bass', 'Bluefish', 'Largemouth Bass', 'Smallmouth Bass'],
        rating: 4.7,
        pros: ['Versatile', 'Natural action', 'Multiple sizes', 'Works in various conditions'],
        cons: ['Can tear easily', 'Need proper hooks'],
        whereToBuy: ['Walmart', 'Bass Pro Shops', 'Cabelas', 'Local tackle shops'],
        riSpecific: 'Great for bass fishing in Rhode Island ponds and striped bass in the bay.'
      },
      {
        name: 'Diamond Jigs (2-6 oz)',
        brand: 'SPRO, Tsunami',
        description: 'Heavy metal jigs perfect for deep water fishing and strong currents.',
        price: '$8-20',
        bestFor: ['Striped Bass', 'Bluefish', 'Cod', 'Pollock', 'Tautog'],
        rating: 4.6,
        pros: ['Heavy for deep water', 'Good in strong current', 'Attracts multiple species', 'Durable'],
        cons: ['Can be expensive', 'Heavy for light tackle'],
        whereToBuy: ['Local tackle shops', 'Bass Pro Shops', 'Cabelas', 'Tackle Direct'],
        riSpecific: 'Perfect for Block Island and deep water fishing. Essential for tautog fishing on rocky bottom.'
      },
      {
        name: 'Topwater Poppers',
        brand: 'Rapala, Heddon, Rebel',
        description: 'Exciting topwater lures that create surface action and attract aggressive fish.',
        price: '$6-12',
        bestFor: ['Striped Bass', 'Bluefish', 'Largemouth Bass', 'Smallmouth Bass'],
        rating: 4.5,
        pros: ['Exciting fishing', 'Good for aggressive fish', 'Visible strikes', 'Fun to use'],
        cons: ['Weather dependent', 'May not work in all conditions'],
        whereToBuy: ['Walmart', 'Bass Pro Shops', 'Cabelas', 'Local tackle shops'],
        riSpecific: 'Great for early morning and evening fishing in Rhode Island waters.'
      },
      {
        name: 'Live Bait (Sandworms, Clams, Squid)',
        brand: 'Local Bait Shops',
        description: 'Natural baits that are highly effective for Rhode Island fishing.',
        price: '$5-15',
        bestFor: ['Striped Bass', 'Fluke', 'Tautog', 'Black Sea Bass', 'Scup'],
        rating: 4.9,
        pros: ['Most natural', 'Highly effective', 'Works year-round', 'Attracts all species'],
        cons: ['Need to keep alive', 'Can be messy', 'More expensive'],
        whereToBuy: ['Local bait shops', 'Marinas', 'Some tackle shops'],
        riSpecific: 'Essential for Rhode Island fishing. Sandworms are particularly effective for fluke and bass.'
      }
    ]
  },
  {
    id: 'tackle',
    name: 'Tackle & Accessories',
    icon: <Anchor className="h-6 w-6" />,
    description: 'Essential tackle and accessories for Rhode Island fishing',
    items: [
      {
        name: 'Circle Hooks (2/0-8/0)',
        brand: 'Gamakatsu, Mustad, Owner',
        description: 'Essential hooks for live bait fishing that reduce fish mortality.',
        price: '$3-8',
        bestFor: ['Striped Bass', 'Fluke', 'Tautog', 'Black Sea Bass'],
        rating: 4.8,
        pros: ['Better for fish survival', 'Good hook-up ratio', 'Less likely to gut hook', 'Required for some species'],
        cons: ['Requires different technique', 'May not work with all baits'],
        whereToBuy: ['Local tackle shops', 'Bass Pro Shops', 'Cabelas', 'Amazon'],
        riSpecific: 'Required for striped bass fishing in Rhode Island. Better for catch and release.'
      },
      {
        name: 'Fishing Line (Monofilament, Braid, Fluorocarbon)',
        brand: 'PowerPro, Berkley, Seaguar',
        description: 'Quality fishing line suitable for Rhode Island fishing conditions.',
        price: '$10-25',
        bestFor: ['All Species'],
        rating: 4.7,
        pros: ['Strong', 'Low stretch', 'Good knot strength', 'Resistant to abrasion'],
        cons: ['Can be expensive', 'Requires proper care'],
        whereToBuy: ['Walmart', 'Bass Pro Shops', 'Cabelas', 'Local tackle shops'],
        riSpecific: 'Braided line is excellent for Rhode Island fishing due to rocks and structure.'
      },
      {
        name: 'Sinkers & Weights (1/4 oz - 8 oz)',
        brand: 'Various',
        description: 'Various weights for different fishing conditions and depths.',
        price: '$2-8',
        bestFor: ['All Species'],
        rating: 4.6,
        pros: ['Essential for bottom fishing', 'Various weights', 'Inexpensive', 'Versatile'],
        cons: ['Can snag on rocks', 'Need different sizes'],
        whereToBuy: ['Local tackle shops', 'Walmart', 'Bass Pro Shops', 'Cabelas'],
        riSpecific: 'Heavier weights needed for Rhode Island due to strong currents and deep water.'
      },
      {
        name: 'Leader Material (20-50 lb)',
        brand: 'Seaguar, Berkley, Ande',
        description: 'Strong leader material for toothy fish and abrasive conditions.',
        price: '$5-15',
        bestFor: ['Bluefish', 'Striped Bass', 'Tautog', 'Black Sea Bass'],
        rating: 4.5,
        pros: ['Abrasion resistant', 'Strong', 'Clear in water', 'Good knot strength'],
        cons: ['Can be expensive', 'Requires proper knots'],
        whereToBuy: ['Local tackle shops', 'Bass Pro Shops', 'Cabelas', 'Amazon'],
        riSpecific: 'Essential for bluefish and tautog fishing in Rhode Island. Prevents bite-offs.'
      }
    ]
  },
  {
    id: 'clothing',
    name: 'Fishing Clothing & Safety',
    icon: <Fish className="h-6 w-6" />,
    description: 'Essential clothing and safety gear for Rhode Island fishing',
    items: [
      {
        name: 'Fishing Waders (Neoprene or Breathable)',
        brand: 'Hodgman, Simms, Frogg Toggs',
        description: 'Essential for shore fishing and wading in Rhode Island waters.',
        price: '$50-300',
        bestFor: ['Shore Fishing', 'Wading', 'Cold Weather'],
        rating: 4.6,
        pros: ['Keeps you dry', 'Extends fishing season', 'Allows access to more spots', 'Warm in cold weather'],
        cons: ['Can be expensive', 'Need proper fit', 'Requires care'],
        whereToBuy: ['Bass Pro Shops', 'Cabelas', 'Dick\'s Sporting Goods', 'Amazon'],
        riSpecific: 'Essential for Rhode Island shore fishing. Neoprene for winter, breathable for summer.'
      },
      {
        name: 'Fishing Vest or Tackle Bag',
        brand: 'Plano, Flambeau, Orvis',
        description: 'Organized storage for tackle and accessories while fishing.',
        price: '$30-100',
        bestFor: ['Organization', 'Convenience', 'Accessibility'],
        rating: 4.5,
        pros: ['Keeps tackle organized', 'Easy access', 'Multiple compartments', 'Durable'],
        cons: ['Can be bulky', 'May not hold everything'],
        whereToBuy: ['Bass Pro Shops', 'Cabelas', 'Dick\'s Sporting Goods', 'Amazon'],
        riSpecific: 'Essential for Rhode Island fishing. Need to carry various tackle for different conditions.'
      },
      {
        name: 'Polarized Sunglasses',
        brand: 'Costa, Maui Jim, Oakley',
        description: 'Essential for spotting fish and protecting eyes from UV rays.',
        price: '$20-200',
        bestFor: ['Fish Spotting', 'Eye Protection', 'Comfort'],
        rating: 4.7,
        pros: ['Reduces glare', 'Protects eyes', 'Helps spot fish', 'Improves visibility'],
        cons: ['Can be expensive', 'Need proper fit', 'Can fog up'],
        whereToBuy: ['Bass Pro Shops', 'Cabelas', 'Dick\'s Sporting Goods', 'Amazon'],
        riSpecific: 'Essential for Rhode Island fishing. Helps spot fish in the clear waters and reduces glare.'
      },
      {
        name: 'Life Jacket (PFD)',
        brand: 'Mustang, Stearns, Onyx',
        description: 'Essential safety gear for boat fishing and wading in deep water.',
        price: '$30-150',
        bestFor: ['Safety', 'Boat Fishing', 'Deep Water'],
        rating: 4.8,
        pros: ['Life saving', 'Required by law', 'Comfortable', 'Multiple sizes'],
        cons: ['Can be bulky', 'May restrict movement'],
        whereToBuy: ['Bass Pro Shops', 'Cabelas', 'Dick\'s Sporting Goods', 'Amazon'],
        riSpecific: 'Required by law in Rhode Island for boat fishing. Essential for safety.'
      }
    ]
  }
];

export default function GearRecommendations() {
  const [selectedCategory, setSelectedCategory] = useState<string>('rods');
  const [selectedItem, setSelectedItem] = useState<GearItem | null>(null);

  const currentCategory = gearCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Category Selection */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Rhode Island Fishing Gear Guide</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {gearCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="text-blue-600">{category.icon}</div>
                <div className="text-sm font-medium text-center">{category.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Category Description */}
      {currentCategory && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-gray-700 text-center">{currentCategory.description}</p>
        </div>
      )}

      {/* Gear Items Grid */}
      {currentCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
              onClick={() => setSelectedItem(item)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-green-600">{item.price}</span>
                  <span className="text-sm text-gray-500">Click for details</span>
                </div>
                
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Best for:</div>
                  <div className="flex flex-wrap gap-1">
                    {item.bestFor.slice(0, 3).map((fish, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {fish}
                      </span>
                    ))}
                    {item.bestFor.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{item.bestFor.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedItem.name}</h2>
                  <p className="text-lg text-gray-600 mb-2">{selectedItem.brand}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{selectedItem.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{selectedItem.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 mb-6">{selectedItem.description}</p>

                  <h3 className="text-lg font-semibold mb-3">Rhode Island Specific</h3>
                  <div className="flex items-start space-x-2 mb-6">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <p className="text-gray-700">{selectedItem.riSpecific}</p>
                  </div>

                  <h3 className="text-lg font-semibold mb-3">Best For</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedItem.bestFor.map((fish, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {fish}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Pros</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedItem.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold mb-3">Cons</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedItem.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">✗</span>
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold mb-3">Where to Buy</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedItem.whereToBuy.map((store, idx) => (
                      <div key={idx} className="p-2 bg-gray-50 rounded text-sm text-center">
                        {store}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}