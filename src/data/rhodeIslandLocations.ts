import { FishingLocation } from '@/types/fishing';

export const rhodeIslandFishingLocations: FishingLocation[] = [
  {
    id: 'narragansett-bay',
    name: 'Narragansett Bay',
    type: 'saltwater',
    coordinates: { lat: 41.5801, lng: -71.4774 },
    description: 'The heart of Rhode Island fishing, offering diverse saltwater opportunities year-round.',
    amenities: ['Boat Ramps', 'Parking', 'Restrooms', 'Bait Shops', 'Fishing Piers'],
    fishSpecies: ['Striped Bass', 'Bluefish', 'Fluke', 'Scup', 'Black Sea Bass', 'Tautog', 'Cod', 'Pollock'],
    bestTimes: ['Early Morning', 'Evening', 'Incoming Tide', 'Spring to Fall'],
    accessInfo: 'Multiple access points including Newport, Warwick, and Providence. Public boat ramps available.',
    regulations: [
      'Striped Bass: 28" minimum, 1 fish per day',
      'Fluke: 18" minimum, 4 fish per day',
      'Scup: 10" minimum, 30 fish per day',
      'Black Sea Bass: 15" minimum, 7 fish per day'
    ],
    images: []
  },
  {
    id: 'block-island',
    name: 'Block Island',
    type: 'saltwater',
    coordinates: { lat: 41.1720, lng: -71.5586 },
    description: 'Renowned for its excellent fishing opportunities and beautiful scenery.',
    amenities: ['Ferry Access', 'Boat Rentals', 'Bait Shops', 'Restaurants', 'Accommodations'],
    fishSpecies: ['Striped Bass', 'Bluefish', 'Fluke', 'Blackfish', 'Cod', 'Pollock', 'Bonito', 'False Albacore'],
    bestTimes: ['Early Morning', 'Late Afternoon', 'Incoming Tide', 'Summer Months'],
    accessInfo: 'Accessible by ferry from Point Judith or private boat. Limited parking on island.',
    regulations: [
      'Striped Bass: 28" minimum, 1 fish per day',
      'Fluke: 18" minimum, 4 fish per day',
      'Cod: 22" minimum, 10 fish per day'
    ],
    images: []
  },
  {
    id: 'sakonnet-river',
    name: 'Sakonnet River',
    type: 'saltwater',
    coordinates: { lat: 41.5034, lng: -71.2106 },
    description: 'Excellent estuary fishing with strong tidal currents and diverse habitat.',
    amenities: ['Public Access', 'Parking', 'Boat Ramp', 'Fishing Pier'],
    fishSpecies: ['Striped Bass', 'Bluefish', 'Fluke', 'Scup', 'Tautog', 'Weakfish'],
    bestTimes: ['Incoming Tide', 'Early Morning', 'Late Evening', 'Spring to Fall'],
    accessInfo: 'Public access at various points along the river. Boat ramp available.',
    regulations: [
      'Striped Bass: 28" minimum, 1 fish per day',
      'Fluke: 18" minimum, 4 fish per day'
    ],
    images: []
  },
  {
    id: 'wood-river',
    name: 'Wood River',
    type: 'freshwater',
    coordinates: { lat: 41.4800, lng: -71.7800 },
    description: 'Premier freshwater trout fishing in Rhode Island with excellent water quality.',
    amenities: ['Public Access', 'Parking', 'Restrooms', 'Fishing Access Points'],
    fishSpecies: ['Brown Trout', 'Rainbow Trout', 'Brook Trout', 'Smallmouth Bass', 'Largemouth Bass'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall', 'Overcast Days'],
    accessInfo: 'Multiple public access points along the river. Some areas require walking.',
    regulations: [
      'Trout: 9" minimum, 5 fish per day',
      'Bass: 12" minimum, 5 fish per day',
      'Catch and release encouraged for large trout'
    ],
    images: []
  },
  {
    id: 'pawcatuck-river',
    name: 'Pawcatuck River',
    type: 'freshwater',
    coordinates: { lat: 41.4000, lng: -71.8500 },
    description: 'Border river with excellent bass fishing and seasonal trout stocking.',
    amenities: ['Public Access', 'Parking', 'Boat Launch'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Brown Trout', 'Rainbow Trout'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Access points along the river. Some areas have boat launches.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Trout: 9" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'scituate-reservoir',
    name: 'Scituate Reservoir',
    type: 'freshwater',
    coordinates: { lat: 41.8000, lng: -71.6500 },
    description: 'Large freshwater reservoir with excellent bass and pickerel fishing.',
    amenities: ['Boat Launch', 'Parking', 'Restrooms'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Yellow Perch', 'White Perch'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Boat launch available. Shore fishing limited due to water supply restrictions.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day',
      'No swimming allowed'
    ],
    images: []
  },
  {
    id: 'watch-hill',
    name: 'Watch Hill',
    type: 'saltwater',
    coordinates: { lat: 41.3120, lng: -71.8580 },
    description: 'Historic fishing location with excellent surf fishing opportunities.',
    amenities: ['Public Beach Access', 'Parking', 'Bait Shop'],
    fishSpecies: ['Striped Bass', 'Bluefish', 'Fluke', 'Scup', 'Blackfish'],
    bestTimes: ['Early Morning', 'Late Evening', 'Incoming Tide', 'Fall Migration'],
    accessInfo: 'Public beach access. Limited parking during peak season.',
    regulations: [
      'Striped Bass: 28" minimum, 1 fish per day',
      'Fluke: 18" minimum, 4 fish per day'
    ],
    images: []
  },
  {
    id: 'warwick-cove',
    name: 'Warwick Cove',
    type: 'saltwater',
    coordinates: { lat: 41.7000, lng: -71.4000 },
    description: 'Protected cove with excellent fishing for various species year-round.',
    amenities: ['Public Access', 'Parking', 'Boat Ramp', 'Fishing Pier'],
    fishSpecies: ['Striped Bass', 'Bluefish', 'Fluke', 'Scup', 'Tautog', 'Winter Flounder'],
    bestTimes: ['Incoming Tide', 'Early Morning', 'Late Evening', 'Year-round'],
    accessInfo: 'Public boat ramp and fishing pier available. Good parking.',
    regulations: [
      'Striped Bass: 28" minimum, 1 fish per day',
      'Fluke: 18" minimum, 4 fish per day'
    ],
    images: []
  },
  // Northern Rhode Island Freshwater Locations
  {
    id: 'lower-rochambeau-pond',
    name: 'Lower Rochambeau Pond',
    type: 'freshwater',
    coordinates: { lat: 41.9200, lng: -71.4300 },
    description: 'Popular local fishing pond in Lincoln, RI with excellent bass and panfish opportunities.',
    amenities: ['Public Access', 'Parking', 'Shore Fishing', 'Picnic Areas'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Pumpkinseed'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall', 'Overcast Days'],
    accessInfo: 'Easy shore access with parking available. Popular with local families.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day',
      'No motorized boats allowed'
    ],
    images: []
  },
  {
    id: 'upper-rochambeau-pond',
    name: 'Upper Rochambeau Pond',
    type: 'freshwater',
    coordinates: { lat: 41.9300, lng: -71.4250 },
    description: 'Connected to Lower Rochambeau Pond, offers additional fishing opportunities with similar species.',
    amenities: ['Public Access', 'Parking', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Pumpkinseed'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited shore access. Best accessed via Lower Rochambeau Pond.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day',
      'No motorized boats allowed'
    ],
    images: []
  },
  {
    id: 'george-washington-memorial-campground-pond',
    name: 'George Washington Memorial Campground Pond',
    type: 'freshwater',
    coordinates: { lat: 41.9000, lng: -71.4500 },
    description: 'Small but productive pond in Chepachet with good bass and panfish fishing.',
    amenities: ['Public Access', 'Parking', 'Shore Fishing', 'Campground'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Access through campground. Day use available.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'wallum-lake',
    name: 'Wallum Lake',
    type: 'freshwater',
    coordinates: { lat: 42.0000, lng: -71.8000 },
    description: 'Large lake on the Rhode Island-Massachusetts border with excellent fishing opportunities.',
    amenities: ['Boat Launch', 'Parking', 'Shore Access', 'Restrooms'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Yellow Perch', 'White Perch', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Boat launch available. Good shore fishing opportunities.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day',
      'Check MA/RI regulations as lake spans both states'
    ],
    images: []
  },
  {
    id: 'pascoag-reservoir',
    name: 'Pascoag Reservoir',
    type: 'freshwater',
    coordinates: { lat: 41.9500, lng: -71.7000 },
    description: 'Large reservoir with excellent bass fishing and seasonal trout stocking.',
    amenities: ['Boat Launch', 'Parking', 'Shore Access', 'Restrooms'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Rainbow Trout', 'Brown Trout', 'Yellow Perch'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Public boat launch and shore access available.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Trout: 9" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'chepachet-river',
    name: 'Chepachet River',
    type: 'freshwater',
    coordinates: { lat: 41.8800, lng: -71.7000 },
    description: 'Small river with good trout fishing and seasonal stocking.',
    amenities: ['Public Access', 'Parking', 'Shore Fishing'],
    fishSpecies: ['Brown Trout', 'Rainbow Trout', 'Brook Trout', 'Smallmouth Bass', 'Chain Pickerel'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring Stocking Season', 'Overcast Days'],
    accessInfo: 'Multiple access points along the river. Some walking required.',
    regulations: [
      'Trout: 9" minimum, 5 fish per day',
      'Bass: 12" minimum, 5 fish per day',
      'Check seasonal closures'
    ],
    images: []
  },
  {
    id: 'blackstone-river',
    name: 'Blackstone River',
    type: 'freshwater',
    coordinates: { lat: 41.8500, lng: -71.4000 },
    description: 'Major river flowing through Northern Rhode Island with diverse fishing opportunities.',
    amenities: ['Public Access', 'Parking', 'Shore Fishing', 'Boat Access'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Brown Trout', 'Rainbow Trout', 'White Perch'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Multiple access points. Some areas have boat launches.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Trout: 9" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'captain-roger-wheeler-beach-pond',
    name: 'Captain Roger Wheeler Beach Pond',
    type: 'freshwater',
    coordinates: { lat: 41.7200, lng: -71.3800 },
    description: 'Small pond near the beach with good bass and panfish fishing.',
    amenities: ['Public Access', 'Parking', 'Shore Fishing', 'Beach Access'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Easy access with parking available.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'tucker-pond',
    name: 'Tucker Pond',
    type: 'freshwater',
    coordinates: { lat: 41.9500, lng: -71.5500 },
    description: 'Small productive pond in Glocester with good bass fishing.',
    amenities: ['Public Access', 'Parking', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Check local regulations.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'stump-pond',
    name: 'Stump Pond',
    type: 'freshwater',
    coordinates: { lat: 41.9000, lng: -71.6000 },
    description: 'Small pond with good bass and pickerel fishing opportunities.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Primarily shore fishing.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  // Additional Northern Rhode Island Freshwater Locations
  {
    id: 'meshanticut-lake',
    name: 'Meshanticut Lake',
    type: 'freshwater',
    coordinates: { lat: 41.7200, lng: -71.4200 },
    description: 'Popular urban lake in Cranston with excellent bass and panfish fishing.',
    amenities: ['Public Access', 'Parking', 'Shore Fishing', 'Picnic Areas', 'Restrooms'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Crappie', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall', 'Overcast Days'],
    accessInfo: 'Multiple access points around the lake with ample parking.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day',
      'Perch: No size limit, 50 fish per day'
    ],
    images: []
  },
  {
    id: 'scituate-reservoir-north',
    name: 'Scituate Reservoir',
    type: 'freshwater',
    coordinates: { lat: 41.7800, lng: -71.6800 },
    description: 'Large reservoir providing drinking water and excellent fishing opportunities.',
    amenities: ['Public Access', 'Boat Launch', 'Parking', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Brown Trout', 'Rainbow Trout', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall', 'Cooler Months'],
    accessInfo: 'Public boat launch available. Shore fishing at designated areas.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Trout: 9" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'johnson-pond',
    name: 'Johnson Pond',
    type: 'freshwater',
    coordinates: { lat: 41.8500, lng: -71.4500 },
    description: 'Hidden gem in Johnston with excellent bass fishing and peaceful surroundings.',
    amenities: ['Public Access', 'Parking', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Primarily shore fishing with some parking available.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'spring-grove-pond',
    name: 'Spring Grove Pond',
    type: 'freshwater',
    coordinates: { lat: 41.7300, lng: -71.4500 },
    description: 'Small productive pond with good bass and panfish action.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Check local access regulations.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'barden-reservoir',
    name: 'Barden Reservoir',
    type: 'freshwater',
    coordinates: { lat: 41.8200, lng: -71.6500 },
    description: 'Scenic reservoir with excellent fishing for bass and trout.',
    amenities: ['Public Access', 'Boat Launch', 'Parking', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Brown Trout', 'Rainbow Trout', 'Chain Pickerel', 'Yellow Perch'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall', 'Cooler Months'],
    accessInfo: 'Public boat launch and shore fishing access available.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Trout: 9" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'tarkiln-pond',
    name: 'Tarkiln Pond',
    type: 'freshwater',
    coordinates: { lat: 41.8800, lng: -71.5500 },
    description: 'Small pond with good bass and pickerel fishing opportunities.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Primarily shore fishing.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'brown-pond',
    name: 'Brown Pond',
    type: 'freshwater',
    coordinates: { lat: 41.7600, lng: -71.4800 },
    description: 'Small pond with excellent bass fishing and peaceful environment.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Check local regulations.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'white-pond',
    name: 'White Pond',
    type: 'freshwater',
    coordinates: { lat: 41.8300, lng: -71.4800 },
    description: 'Clear water pond with excellent visibility and good bass fishing.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Primarily shore fishing.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'cumberland-pond',
    name: 'Cumberland Pond',
    type: 'freshwater',
    coordinates: { lat: 41.9700, lng: -71.4200 },
    description: 'Small pond in Cumberland with good bass and panfish fishing.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Check local access regulations.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'pawtuxet-river',
    name: 'Pawtuxet River',
    type: 'freshwater',
    coordinates: { lat: 41.7600, lng: -71.4000 },
    description: 'River system with excellent fishing for bass, pickerel, and panfish.',
    amenities: ['Public Access', 'Shore Fishing', 'Multiple Access Points'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Brown Bullhead', 'White Sucker'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall', 'After Rain'],
    accessInfo: 'Multiple access points along the river with parking available.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'hunt-river',
    name: 'Hunt River',
    type: 'freshwater',
    coordinates: { lat: 41.7200, lng: -71.4500 },
    description: 'Small river with good bass and pickerel fishing opportunities.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Check local regulations.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'moshassuck-river',
    name: 'Moshassuck River',
    type: 'freshwater',
    coordinates: { lat: 41.8200, lng: -71.4200 },
    description: 'Urban river with surprisingly good fishing for bass and panfish.',
    amenities: ['Public Access', 'Shore Fishing', 'Urban Access'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Multiple access points in urban areas with limited parking.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'wanskuck-river',
    name: 'Wanskuck River',
    type: 'freshwater',
    coordinates: { lat: 41.8400, lng: -71.4400 },
    description: 'Small river with good bass and pickerel fishing in urban setting.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Check local regulations.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'north-east-pond',
    name: 'North East Pond',
    type: 'freshwater',
    coordinates: { lat: 41.9500, lng: -71.5500 },
    description: 'Small pond with excellent bass fishing and peaceful surroundings.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Primarily shore fishing.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'south-east-pond',
    name: 'South East Pond',
    type: 'freshwater',
    coordinates: { lat: 41.9400, lng: -71.5400 },
    description: 'Small pond with good bass and pickerel fishing opportunities.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Check local access regulations.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'burrillville-ponds',
    name: 'Burrillville Ponds Complex',
    type: 'freshwater',
    coordinates: { lat: 41.9800, lng: -71.6800 },
    description: 'Multiple interconnected ponds with excellent bass and trout fishing.',
    amenities: ['Public Access', 'Boat Launch', 'Parking', 'Shore Fishing', 'Hiking Trails'],
    fishSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Brown Trout', 'Rainbow Trout', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall', 'Cooler Months'],
    accessInfo: 'Public boat launch and multiple shore access points available.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Trout: 9" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'glocester-ponds',
    name: 'Glocester Ponds',
    type: 'freshwater',
    coordinates: { lat: 41.9200, lng: -71.6200 },
    description: 'Multiple ponds in Glocester with good bass and panfish fishing.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Check local regulations for specific ponds.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'foster-ponds',
    name: 'Foster Ponds',
    type: 'freshwater',
    coordinates: { lat: 41.8600, lng: -71.7200 },
    description: 'Multiple small ponds with excellent bass and pickerel fishing.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Primarily shore fishing.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'scituate-ponds',
    name: 'Scituate Ponds',
    type: 'freshwater',
    coordinates: { lat: 41.7800, lng: -71.6500 },
    description: 'Multiple ponds with good bass and trout fishing opportunities.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Brown Trout', 'Rainbow Trout', 'Chain Pickerel', 'Yellow Perch'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall', 'Cooler Months'],
    accessInfo: 'Limited access. Check local regulations.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Trout: 9" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  },
  {
    id: 'west-greenwich-ponds',
    name: 'West Greenwich Ponds',
    type: 'freshwater',
    coordinates: { lat: 41.6400, lng: -71.6800 },
    description: 'Multiple ponds with excellent bass and panfish fishing.',
    amenities: ['Public Access', 'Shore Fishing'],
    fishSpecies: ['Largemouth Bass', 'Chain Pickerel', 'Yellow Perch', 'Bluegill', 'Brown Bullhead'],
    bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall'],
    accessInfo: 'Limited access. Check local regulations.',
    regulations: [
      'Bass: 12" minimum, 5 fish per day',
      'Pickerel: 15" minimum, 5 fish per day'
    ],
    images: []
  }
];
