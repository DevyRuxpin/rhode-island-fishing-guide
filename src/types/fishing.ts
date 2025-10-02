export interface FishingLocation {
  id: string;
  name: string;
  type: 'freshwater' | 'saltwater' | 'both';
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  amenities: string[];
  fishSpecies: string[];
  bestTimes: string[];
  accessInfo: string;
  regulations: string[];
  images?: string[];
}

export interface FishSpecies {
  id: string;
  name: string;
  scientificName: string;
  type: 'freshwater' | 'saltwater';
  description: string;
  habitat: string;
  size: {
    min: number;
    max: number;
    average: number;
  };
  season: {
    start: string;
    end: string;
  };
  regulations: {
    sizeLimit?: number;
    possessionLimit?: number;
    seasonDates: string;
  };
  bestLures: string[];
  bestBait: string[];
  bestTimes: string[];
  techniques: string[];
  image?: string;
  locations?: string[];
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  conditions: string;
  forecast: {
    date: string;
    high: number;
    low: number;
    conditions: string;
    windSpeed: number;
  }[];
}

export interface FishingRecommendation {
  scenario: string;
  location: string;
  fishSpecies: string;
  recommendations: {
    bestTimes: string[];
    lures: string[];
    bait: string[];
    techniques: string[];
    weatherConditions: string[];
    tips: string[];
  };
  confidence: number;
  reasoning: string;
}

export interface FishingScenario {
  id: string;
  question: string;
  context: {
    location?: string;
    fishSpecies?: string;
    timeOfDay?: string;
    season?: string;
    weather?: string;
    experience?: 'beginner' | 'intermediate' | 'advanced';
  };
  response: FishingRecommendation;
}

export interface Regulation {
  id: string;
  type: 'size' | 'possession' | 'season' | 'method' | 'area';
  fishSpecies: string;
  description: string;
  details: string;
  effectiveDate: string;
  expirationDate?: string;
  source: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  location: string;
  title: string;
  content: string;
  fishImages: string[]; // Base64 encoded images
  weather: string;
  conditions: string;
  fishCaught: string[];
  notes: string;
}

export interface FishCaught {
  id: string;
  image: string; // Base64 encoded image
  species: string;
  size?: string;
  weight?: string;
  location: string;
  date: string;
  journalEntryId: string;
}
