import { FishSpecies } from '@/types/fishing';

export const rhodeIslandFishSpecies: FishSpecies[] = [
  // SALTWATER SPECIES
  {
    id: 'striped-bass',
    name: 'Striped Bass',
    scientificName: 'Morone saxatilis',
    type: 'saltwater',
    description: 'Rhode Island\'s most prized game fish, known for their powerful fights and excellent table fare. These migratory fish follow the coastline seasonally.',
    habitat: 'Narragansett Bay, Block Island Sound, coastal waters, estuaries. Migrates seasonally along the coast.',
    size: { min: 20, max: 60, average: 32 },
    season: { start: 'April', end: 'November' },
    regulations: {
      sizeLimit: 28,
      possessionLimit: 1,
      seasonDates: 'May 1 - December 31'
    },
    bestLures: ['Bucktail Jigs', 'Swimbaits', 'Topwater Plugs', 'Diving Plugs', 'Soft Plastic Jerkbaits'],
    bestBait: ['Live Eels', 'Live Bunker', 'Live Mackerel', 'Cut Bunker', 'Sandworms'],
    bestTimes: ['Early Morning', 'Late Evening', 'Incoming Tide', 'Spring and Fall Migration'],
    techniques: ['Trolling', 'Casting', 'Live Lining', 'Jigging', 'Surf Casting'],
    image: '/images/fish/striped-bass.svg',
    locations: ['Narragansett Bay', 'Block Island', 'Sakonnet River', 'Pawcatuck River', 'Coastal waters']
  },
  {
    id: 'fluke-summer-flounder',
    name: 'Fluke (Summer Flounder)',
    scientificName: 'Paralichthys dentatus',
    type: 'saltwater',
    description: 'Popular flatfish known for excellent eating quality and challenging fishing. Both eyes are on the left side of the body.',
    habitat: 'Narragansett Bay, Block Island Sound, sandy and muddy bottoms in bays and coastal waters.',
    size: { min: 12, max: 30, average: 18 },
    season: { start: 'May', end: 'October' },
    regulations: {
      sizeLimit: 18,
      possessionLimit: 4,
      seasonDates: 'May 1 - September 30'
    },
    bestLures: ['Bucktail Jigs', 'Gulp Baits', 'Squid Strips', 'Minnow Imitations'],
    bestBait: ['Live Killifish', 'Squid', 'Sandworms', 'Minnows', 'Gulp Swimming Mullet'],
    bestTimes: ['Incoming Tide', 'Early Morning', 'Late Afternoon', 'Summer Months'],
    techniques: ['Drifting', 'Jigging', 'Bottom Fishing', 'Trolling'],
    image: '/images/fish/fluke.svg',
    locations: ['Narragansett Bay', 'Block Island Sound', 'Coastal waters']
  },
  {
    id: 'tautog-blackfish',
    name: 'Tautog (Blackfish)',
    scientificName: 'Tautoga onitis',
    type: 'saltwater',
    description: 'Structure-loving fish that provides excellent winter fishing opportunities. Known for their strong fight and excellent eating quality.',
    habitat: 'Rocky structure, wrecks, artificial reefs, jetties, and bridge pilings.',
    size: { min: 14, max: 25, average: 18 },
    season: { start: 'October', end: 'May' },
    regulations: {
      sizeLimit: 16,
      possessionLimit: 3,
      seasonDates: 'October 15 - April 30'
    },
    bestLures: ['Jigs', 'Rigs with Hooks', 'Soft Plastic Crabs'],
    bestBait: ['Green Crabs', 'Hermit Crabs', 'Sandworms', 'Clams'],
    bestTimes: ['Incoming Tide', 'Early Morning', 'Late Afternoon', 'Winter Months'],
    techniques: ['Bottom Fishing', 'Jigging', 'Structure Fishing'],
    image: '/images/fish/tautog.svg',
    locations: ['Block Island', 'Coastal waters', 'Rocky structure', 'Wrecks']
  },
  {
    id: 'bluefish',
    name: 'Bluefish',
    scientificName: 'Pomatomus saltatrix',
    type: 'saltwater',
    description: 'Aggressive predator known for their powerful strikes and acrobatic fights. Often travel in schools and create feeding frenzies.',
    habitat: 'Block Island, coastal waters, bays, and offshore areas.',
    size: { min: 12, max: 40, average: 20 },
    season: { start: 'June', end: 'October' },
    regulations: {
      sizeLimit: 15,
      possessionLimit: 10,
      seasonDates: 'June 1 - October 31'
    },
    bestLures: ['Topwater Plugs', 'Metal Jigs', 'Swimbaits', 'Popper Plugs', 'Spoons'],
    bestBait: ['Live Bunker', 'Live Mackerel', 'Cut Bait', 'Squid'],
    bestTimes: ['Early Morning', 'Late Evening', 'Incoming Tide', 'Summer Months'],
    techniques: ['Casting', 'Trolling', 'Jigging', 'Surf Casting'],
    image: '/images/fish/bluefish.svg',
    locations: ['Block Island', 'Narragansett Bay', 'Coastal waters']
  },
  {
    id: 'scup-porgy',
    name: 'Scup (Porgy)',
    scientificName: 'Stenotomus chrysops',
    type: 'saltwater',
    description: 'Abundant panfish that provides excellent eating and fun fishing for all skill levels. Often found around piers and rocky areas.',
    habitat: 'Narragansett Bay, sandy and rocky bottoms in bays and coastal waters.',
    size: { min: 6, max: 18, average: 10 },
    season: { start: 'May', end: 'October' },
    regulations: {
      sizeLimit: 10,
      possessionLimit: 30,
      seasonDates: 'May 1 - October 31'
    },
    bestLures: ['Small Jigs', 'Sabiki Rigs', 'Small Plugs'],
    bestBait: ['Sandworms', 'Squid', 'Clams', 'Small Pieces of Bait'],
    bestTimes: ['Incoming Tide', 'Early Morning', 'Late Afternoon', 'Summer Months'],
    techniques: ['Bottom Fishing', 'Jigging', 'Drifting'],
    image: '/images/fish/scup.svg',
    locations: ['Narragansett Bay', 'Block Island', 'Coastal waters']
  },
  {
    id: 'black-sea-bass',
    name: 'Black Sea Bass',
    scientificName: 'Centropristis striata',
    type: 'saltwater',
    description: 'Excellent eating fish that congregates around structure and reefs. Known for their distinctive dark coloration.',
    habitat: 'Rocky reefs, wrecks, artificial structure, and offshore areas.',
    size: { min: 12, max: 24, average: 16 },
    season: { start: 'May', end: 'September' },
    regulations: {
      sizeLimit: 15,
      possessionLimit: 7,
      seasonDates: 'May 15 - September 30'
    },
    bestLures: ['Bucktail Jigs', 'Soft Plastic Jigs', 'Small Plugs'],
    bestBait: ['Squid', 'Clams', 'Sandworms', 'Small Fish'],
    bestTimes: ['Incoming Tide', 'Early Morning', 'Late Afternoon', 'Summer Months'],
    techniques: ['Bottom Fishing', 'Jigging', 'Structure Fishing'],
    image: '/images/fish/black-sea-bass.svg',
    locations: ['Offshore waters', 'Wrecks', 'Artificial reefs']
  },
  {
    id: 'winter-flounder',
    name: 'Winter Flounder',
    scientificName: 'Pseudopleuronectes americanus',
    type: 'saltwater',
    description: 'Cold-water flatfish that provides excellent winter fishing opportunities. Both eyes are on the right side of the body.',
    habitat: 'Narragansett Bay, shallow coastal waters, and estuaries during winter.',
    size: { min: 12, max: 20, average: 14 },
    season: { start: 'November', end: 'March' },
    regulations: {
      sizeLimit: 12,
      possessionLimit: 2,
      seasonDates: 'November 1 - March 31'
    },
    bestLures: ['Small Jigs', 'Bucktail Jigs'],
    bestBait: ['Sandworms', 'Bloodworms', 'Clams', 'Small Pieces of Bait'],
    bestTimes: ['Incoming Tide', 'Early Morning', 'Late Afternoon', 'Winter Months'],
    techniques: ['Bottom Fishing', 'Jigging', 'Still Fishing'],
    image: '/images/fish/winter-flounder.svg',
    locations: ['Narragansett Bay', 'Shallow coastal waters']
  },
  {
    id: 'weakfish-squeteague',
    name: 'Weakfish (Squeteague)',
    scientificName: 'Cynoscion regalis',
    type: 'saltwater',
    description: 'Excellent table fish with a distinctive yellow spot on the tail. Known for their delicate mouth structure.',
    habitat: 'Narragansett Bay, estuaries, and coastal waters during migration.',
    size: { min: 12, max: 30, average: 18 },
    season: { start: 'May', end: 'October' },
    regulations: {
      sizeLimit: 16,
      possessionLimit: 1,
      seasonDates: 'May 1 - October 31'
    },
    bestLures: ['Soft Plastic Jigs', 'Bucktail Jigs', 'Small Plugs'],
    bestBait: ['Live Minnows', 'Squid', 'Sandworms', 'Cut Bait'],
    bestTimes: ['Early Morning', 'Late Evening', 'Incoming Tide', 'Summer Months'],
    techniques: ['Casting', 'Jigging', 'Still Fishing'],
    image: '/images/fish/weakfish.svg',
    locations: ['Narragansett Bay', 'Estuaries', 'Coastal waters']
  },
  {
    id: 'atlantic-cod',
    name: 'Atlantic Cod',
    scientificName: 'Gadus morhua',
    type: 'saltwater',
    description: 'Traditional New England fish that provides excellent eating and challenging offshore fishing.',
    habitat: 'Deep offshore waters, rocky bottoms, and offshore reefs.',
    size: { min: 18, max: 48, average: 24 },
    season: { start: 'December', end: 'March' },
    regulations: {
      sizeLimit: 22,
      possessionLimit: 10,
      seasonDates: 'Year-round with restrictions'
    },
    bestLures: ['Heavy Jigs', 'Cod Rigs', 'Large Plugs'],
    bestBait: ['Clams', 'Squid', 'Sea Worms', 'Cut Fish'],
    bestTimes: ['Early Morning', 'Late Afternoon', 'Winter Months'],
    techniques: ['Bottom Fishing', 'Jigging', 'Deep Water Fishing'],
    image: '/images/fish/cod.svg',
    locations: ['Offshore waters', 'Cox\'s Ledge', 'Deep water areas']
  },
  {
    id: 'pollock',
    name: 'Pollock',
    scientificName: 'Pollachius pollachius',
    type: 'saltwater',
    description: 'Fast-swimming fish that provides excellent sport and table fare. Often found with cod.',
    habitat: 'Offshore waters, rocky bottoms, and deep water areas.',
    size: { min: 15, max: 36, average: 20 },
    season: { start: 'December', end: 'March' },
    regulations: {
      sizeLimit: 19,
      possessionLimit: 10,
      seasonDates: 'Year-round with restrictions'
    },
    bestLures: ['Heavy Jigs', 'Large Plugs', 'Metal Jigs'],
    bestBait: ['Squid', 'Clams', 'Cut Fish', 'Sea Worms'],
    bestTimes: ['Early Morning', 'Late Afternoon', 'Winter Months'],
    techniques: ['Bottom Fishing', 'Jigging', 'Deep Water Fishing'],
    image: '/images/fish/pollock.svg',
    locations: ['Offshore waters', 'Cox\'s Ledge', 'Deep water areas']
  },
  // FRESHWATER SPECIES
  {
    id: 'brown-trout',
    name: 'Brown Trout',
    scientificName: 'Salmo trutta',
    type: 'freshwater',
    description: 'Prized freshwater game fish known for their intelligence and fighting ability. Excellent table fare.',
    habitat: 'Cold, clear streams and rivers with good oxygen levels. Stocked in various ponds.',
    size: { min: 8, max: 24, average: 14 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 9,
      possessionLimit: 5,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Spinners', 'Spoons', 'Small Plugs', 'Nymphs', 'Streamers'],
    bestBait: ['Live Worms', 'PowerBait', 'Salmon Eggs', 'Minnows'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Fall'],
    techniques: ['Fly Fishing', 'Spinning', 'Drift Fishing', 'Still Fishing'],
    image: '/images/fish/brown-trout.svg',
    locations: ['Wood River', 'Pawcatuck River', 'Various stocked ponds']
  },
  {
    id: 'rainbow-trout',
    name: 'Rainbow Trout',
    scientificName: 'Oncorhynchus mykiss',
    type: 'freshwater',
    description: 'Popular stocked trout species known for their acrobatic jumps and bright colors.',
    habitat: 'Cold streams, rivers, and stocked ponds throughout Rhode Island.',
    size: { min: 8, max: 20, average: 12 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 9,
      possessionLimit: 5,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Spinners', 'Spoons', 'Small Plugs', 'Nymphs', 'Dry Flies'],
    bestBait: ['PowerBait', 'Live Worms', 'Salmon Eggs', 'Corn'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring Stocking Season'],
    techniques: ['Fly Fishing', 'Spinning', 'Still Fishing', 'Trolling'],
    image: '/images/fish/rainbow-trout.svg',
    locations: ['Various stocked ponds', 'Wood River', 'Pawcatuck River']
  },
  {
    id: 'largemouth-bass',
    name: 'Largemouth Bass',
    scientificName: 'Micropterus salmoides',
    type: 'freshwater',
    description: 'Most popular freshwater game fish in Rhode Island, known for aggressive strikes and excellent fighting ability.',
    habitat: 'Ponds, lakes, and slow-moving rivers with vegetation and structure.',
    size: { min: 8, max: 24, average: 14 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 12,
      possessionLimit: 5,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Plastic Worms', 'Jigs', 'Crankbaits', 'Topwater Plugs', 'Spinnerbaits'],
    bestBait: ['Live Minnows', 'Nightcrawlers', 'Crayfish', 'Frogs'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Fall'],
    techniques: ['Casting', 'Trolling', 'Still Fishing', 'Jigging'],
    image: '/images/fish/largemouth-bass.svg',
    locations: ['Lower Rochambeau Pond', 'Pascoag Reservoir', 'Most freshwater ponds']
  },
  {
    id: 'smallmouth-bass',
    name: 'Smallmouth Bass',
    scientificName: 'Micropterus dolomieu',
    type: 'freshwater',
    description: 'Aggressive fighter known for their bronze coloration and acrobatic jumps.',
    habitat: 'Clear, rocky rivers and lakes with good current and structure.',
    size: { min: 8, max: 20, average: 12 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 12,
      possessionLimit: 5,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Tubes', 'Jigs', 'Crankbaits', 'Spinners', 'Topwater Plugs'],
    bestBait: ['Live Minnows', 'Nightcrawlers', 'Crayfish', 'Hellgrammites'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Fall'],
    techniques: ['Casting', 'Drift Fishing', 'Jigging', 'Trolling'],
    image: '/images/fish/smallmouth-bass.svg',
    locations: ['Wood River', 'Pawcatuck River', 'Some larger ponds']
  },
  {
    id: 'chain-pickerel',
    name: 'Chain Pickerel',
    scientificName: 'Esox niger',
    type: 'freshwater',
    description: 'Aggressive predator with distinctive chain-like markings. Known for their explosive strikes.',
    habitat: 'Weedy areas of lakes, ponds, and slow-moving streams.',
    size: { min: 12, max: 30, average: 18 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 15,
      possessionLimit: 5,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Spinnerbaits', 'Spoons', 'Plugs', 'Jigs', 'Soft Plastics'],
    bestBait: ['Live Minnows', 'Nightcrawlers', 'Small Fish', 'Frogs'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Fall'],
    techniques: ['Casting', 'Trolling', 'Still Fishing', 'Jigging'],
    image: '/images/fish/chain-pickerel.svg',
    locations: ['Lower Rochambeau Pond', 'Most freshwater ponds', 'Weedy areas']
  },
  {
    id: 'yellow-perch',
    name: 'Yellow Perch',
    scientificName: 'Perca flavescens',
    type: 'freshwater',
    description: 'Popular panfish known for their excellent eating quality and schooling behavior.',
    habitat: 'Ponds, lakes, and slow-moving rivers with vegetation.',
    size: { min: 6, max: 15, average: 9 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 8,
      possessionLimit: 50,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Small Jigs', 'Spinners', 'Small Plugs'],
    bestBait: ['Live Minnows', 'Nightcrawlers', 'Small Pieces of Bait'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Fall'],
    techniques: ['Still Fishing', 'Jigging', 'Drift Fishing'],
    image: '/images/fish/yellow-perch.svg',
    locations: ['Lower Rochambeau Pond', 'Most freshwater ponds', 'Pascoag Reservoir']
  },
  {
    id: 'white-perch',
    name: 'White Perch',
    scientificName: 'Morone americana',
    type: 'freshwater',
    description: 'Excellent eating fish that can be found in both freshwater and brackish waters.',
    habitat: 'Ponds, lakes, rivers, and estuaries with moderate current.',
    size: { min: 6, max: 12, average: 8 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 8,
      possessionLimit: 50,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Small Jigs', 'Spinners', 'Small Plugs'],
    bestBait: ['Live Minnows', 'Nightcrawlers', 'Small Pieces of Bait'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Fall'],
    techniques: ['Still Fishing', 'Jigging', 'Drift Fishing'],
    image: '/images/fish/white-perch.svg',
    locations: ['Narragansett Bay tributaries', 'Pawcatuck River', 'Some ponds']
  },
  {
    id: 'bluegill',
    name: 'Bluegill',
    scientificName: 'Lepomis macrochirus',
    type: 'freshwater',
    description: 'Popular panfish known for their aggressive nature and excellent table fare.',
    habitat: 'Ponds, lakes, and slow-moving rivers with vegetation and structure.',
    size: { min: 4, max: 12, average: 7 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 6,
      possessionLimit: 50,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Small Jigs', 'Spinners', 'Small Plugs', 'Flies'],
    bestBait: ['Live Worms', 'Small Minnows', 'Crickets', 'Small Pieces of Bait'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Summer'],
    techniques: ['Still Fishing', 'Fly Fishing', 'Jigging'],
    image: '/images/fish/bluegill.svg',
    locations: ['Lower Rochambeau Pond', 'Most freshwater ponds', 'Pascoag Reservoir']
  },
  {
    id: 'pumpkinseed',
    name: 'Pumpkinseed',
    scientificName: 'Lepomis gibbosus',
    type: 'freshwater',
    description: 'Colorful panfish with distinctive orange and blue markings. Popular with children.',
    habitat: 'Ponds, lakes, and slow-moving rivers with vegetation.',
    size: { min: 4, max: 10, average: 6 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 6,
      possessionLimit: 50,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Small Jigs', 'Spinners', 'Small Plugs', 'Flies'],
    bestBait: ['Live Worms', 'Small Minnows', 'Crickets', 'Small Pieces of Bait'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Summer'],
    techniques: ['Still Fishing', 'Fly Fishing', 'Jigging'],
    image: '/images/fish/pumpkinseed.svg',
    locations: ['Lower Rochambeau Pond', 'Most freshwater ponds', 'Pascoag Reservoir']
  },
  {
    id: 'american-eel',
    name: 'American Eel',
    scientificName: 'Anguilla rostrata',
    type: 'freshwater',
    description: 'Unique fish that migrates between freshwater and saltwater. Excellent eating when properly prepared.',
    habitat: 'Rivers, streams, and estuaries with access to the ocean.',
    size: { min: 12, max: 48, average: 24 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 9,
      possessionLimit: 25,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Eel Rigs', 'Jigs', 'Spoons'],
    bestBait: ['Live Minnows', 'Nightcrawlers', 'Cut Bait', 'Worms'],
    bestTimes: ['Early Morning', 'Late Evening', 'Night', 'Spring and Fall'],
    techniques: ['Still Fishing', 'Jigging', 'Bottom Fishing'],
    image: '/images/fish/american-eel.svg',
    locations: ['Wood River', 'Pawcatuck River', 'Estuaries']
  },
  {
    id: 'brook-trout',
    name: 'Brook Trout',
    scientificName: 'Salvelinus fontinalis',
    type: 'freshwater',
    description: 'Rhode Island\'s state fish and native trout species. Known for their beautiful coloration.',
    habitat: 'Cold, clear streams and rivers with good oxygen levels.',
    size: { min: 6, max: 18, average: 10 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 9,
      possessionLimit: 5,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Spinners', 'Spoons', 'Small Plugs', 'Nymphs', 'Dry Flies'],
    bestBait: ['Live Worms', 'PowerBait', 'Salmon Eggs', 'Minnows'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Fall'],
    techniques: ['Fly Fishing', 'Spinning', 'Drift Fishing', 'Still Fishing'],
    image: '/images/fish/brook-trout.svg',
    locations: ['Wood River', 'Pawcatuck River', 'Cold streams']
  },
  {
    id: 'northern-pike',
    name: 'Northern Pike',
    scientificName: 'Esox lucius',
    type: 'freshwater',
    description: 'Large predatory fish known for their aggressive strikes and excellent fighting ability.',
    habitat: 'Large lakes and rivers with vegetation and structure.',
    size: { min: 20, max: 48, average: 30 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 28,
      possessionLimit: 1,
      seasonDates: 'April 1 - October 31'
    },
    bestLures: ['Large Spinnerbaits', 'Spoons', 'Plugs', 'Jigs', 'Large Soft Plastics'],
    bestBait: ['Large Live Minnows', 'Nightcrawlers', 'Large Fish', 'Frogs'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Fall'],
    techniques: ['Casting', 'Trolling', 'Still Fishing', 'Jigging'],
    image: '/images/fish/northern-pike.svg',
    locations: ['Some larger ponds', 'Pawcatuck River', 'Wood River']
  },
  {
    id: 'carp',
    name: 'Carp',
    scientificName: 'Cyprinus carpio',
    type: 'freshwater',
    description: 'Large, powerful fish known for their strong fight and ability to grow to impressive sizes.',
    habitat: 'Ponds, lakes, and slow-moving rivers with soft bottoms.',
    size: { min: 15, max: 40, average: 25 },
    season: { start: 'April', end: 'October' },
    regulations: {
      sizeLimit: 0,
      possessionLimit: 0,
      seasonDates: 'Year-round (catch and release recommended)'
    },
    bestLures: ['Corn', 'Dough Balls', 'Boilies'],
    bestBait: ['Corn', 'Dough Balls', 'Boilies', 'Bread', 'Worms'],
    bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring and Fall'],
    techniques: ['Still Fishing', 'Bottom Fishing'],
    image: '/images/fish/carp.svg',
    locations: ['Some ponds and rivers', 'Urban waters']
  }
];
