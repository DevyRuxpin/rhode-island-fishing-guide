import { pipeline } from '@huggingface/transformers';
import { FishingRecommendation, FishingScenario } from '@/types/fishing';

interface WeatherData {
  temperature: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  conditions: string;
}

interface TideData {
  high: string;
  low: string;
  current: string;
  height: number;
  nextChange: string;
}

interface FishingConditions {
  waterTemp: number;
  clarity: string;
  oxygen: string;
  salinity: number;
  current: string;
}

export class AIService {
  private static instance: AIService;
  private model: any = null;
  private isInitialized = false;
  private expertKnowledge: any = null;

  private constructor() {
    this.initializeExpertKnowledge();
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private initializeExpertKnowledge(): void {
    this.expertKnowledge = {
      // Rhode Island specific fishing patterns
      seasonalPatterns: {
        spring: {
          stripedBass: {
            migration: 'March-May: Spring migration begins, fish move north along coast',
            hotspots: ['Narragansett Bay entrance', 'Block Island Sound', 'Beach access points'],
            techniques: ['Live lining bunker', 'Casting plugs', 'Surf casting'],
            waterTemp: '45-55°F optimal',
            notes: 'Pre-spawn fish are aggressive, focus on structure and drop-offs'
          },
          fluke: {
            season: 'May-September: Season opens May 1st',
            hotspots: ['Narragansett Bay', 'Block Island Sound', 'Coastal waters'],
            techniques: ['Drifting with bucktails', 'Live lining killies'],
            notes: 'Early season fish are often larger, focus on deeper water'
          }
        },
        summer: {
          stripedBass: {
            behavior: 'June-August: Resident fish in bays and estuaries',
            hotspots: ['Narragansett Bay', 'Sakonnet River', 'Pawcatuck River'],
            techniques: ['Live lining', 'Eel fishing at night', 'Topwater at dawn/dusk'],
            notes: 'Night fishing often produces largest fish, use live eels'
          },
          bluefish: {
            season: 'June-October: Peak summer months',
            hotspots: ['Block Island', 'Narragansett Bay', 'Coastal waters'],
            techniques: ['Casting plugs', 'Trolling', 'Chunking'],
            notes: 'Aggressive feeders, use wire leaders to prevent cut-offs'
          }
        },
        fall: {
          stripedBass: {
            migration: 'September-November: Fall migration south',
            hotspots: ['Block Island', 'Montauk Point area', 'Coastal waters'],
            techniques: ['Live lining', 'Eel fishing', 'Surf casting'],
            notes: 'Fall run produces largest fish of the year'
          },
          tautog: {
            season: 'October-April: Prime winter fishing',
            hotspots: ['Rocky structure', 'Wrecks', 'Jetties'],
            techniques: ['Bottom fishing with crabs', 'Jigging'],
            notes: 'Structure is key, green crabs are preferred bait'
          }
        },
        winter: {
          tautog: {
            behavior: 'December-March: Deep water structure fishing',
            hotspots: ['Deep wrecks', 'Rocky ledges', 'Bridge pilings'],
            techniques: ['Heavy tackle bottom fishing', 'Jigging'],
            notes: 'Cold weather requires patience, fish are less active'
          },
          cod: {
            season: 'December-March: Offshore fishing',
            hotspots: ['Cox\'s Ledge', 'South of Block Island'],
            techniques: ['Jigging', 'Bottom fishing'],
            notes: 'Weather dependent, check sea conditions'
          }
        }
      },
      
      // Location-specific expertise
      locationExpertise: {
        'narragansett bay': {
          characteristics: 'Large estuary with strong tidal influence',
          species: ['Striped Bass', 'Fluke', 'Bluefish', 'Scup', 'Tautog'],
          bestAccess: ['Warwick Cove', 'Conimicut Point', 'Bristol Harbor'],
          tides: 'Strong tidal influence, fish incoming and outgoing',
          structure: 'Drop-offs, channels, rocky areas',
          tips: ['Check tide charts', 'Multiple access points', 'Boat traffic considerations']
        },
        'block island': {
          characteristics: 'World-class fishing destination with diverse opportunities',
          species: ['Striped Bass', 'Bluefish', 'Fluke', 'Tautog', 'Cod', 'Pollock'],
          bestAccess: ['Ferry required', 'Limited parking', 'Charter boats available'],
          tides: 'Strong currents around island',
          structure: 'Rocky shores, ledges, deep water',
          tips: ['Plan for ferry schedule', 'Check weather conditions', 'Consider charter options']
        },
        'lower rochambeau pond': {
          characteristics: 'Popular local freshwater pond with easy access',
          species: ['Largemouth Bass', 'Smallmouth Bass', 'Chain Pickerel', 'Yellow Perch'],
          bestAccess: ['Shore fishing', 'Small boat access', 'Family friendly'],
          tides: 'No tidal influence - freshwater',
          structure: 'Weed beds, drop-offs, rocky areas',
          tips: ['Arrive early for parking', 'Great for beginners', 'Check local regulations']
        }
      },
      
      // Real-time conditions simulation
      currentConditions: {
        weather: {
          temperature: 65,
          windSpeed: 8,
          windDirection: 'SW',
          pressure: 30.15,
          visibility: 10,
          conditions: 'Partly Cloudy'
        },
        tides: {
          high: '8:42 AM',
          low: '2:18 PM',
          current: 'Outgoing',
          height: 2.8,
          nextChange: '1:15 PM'
        },
        waterConditions: {
          waterTemp: 58,
          clarity: 'Good',
          oxygen: 'High',
          salinity: 32.1,
          current: 'Moderate'
        }
      }
    };
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize a more sophisticated text generation pipeline
      this.model = await pipeline(
        'text-generation',
        'microsoft/DialoGPT-medium',
        { quantized: true }
      );
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize AI model:', error);
      // Enhanced rule-based recommendations with expert knowledge
      this.isInitialized = true;
    }
  }

  async generateFishingRecommendation(scenario: FishingScenario): Promise<FishingRecommendation> {
    await this.initialize();

    // Use enhanced expert system for recommendations
    return this.generateExpertRecommendation(scenario);
  }

  private generateExpertRecommendation(scenario: FishingScenario): FishingRecommendation {
    const { context } = scenario;
    const currentConditions = this.expertKnowledge.currentConditions;
    const season = this.getCurrentSeason();
    
    // Get expert knowledge for the target species
    const speciesKnowledge = this.getSpeciesExpertKnowledge(context.fishSpecies, season);
    const locationKnowledge = this.getLocationExpertKnowledge(context.location);
    
    // Build comprehensive recommendation
    const recommendation = {
      scenario: scenario.question,
      location: context.location || 'Rhode Island',
      fishSpecies: context.fishSpecies || 'Multiple species',
      recommendations: {
        bestTimes: this.getOptimalTimes(speciesKnowledge, locationKnowledge, currentConditions),
        lures: this.getOptimalLures(speciesKnowledge, season, currentConditions),
        bait: this.getOptimalBait(speciesKnowledge, season, currentConditions),
        techniques: this.getOptimalTechniques(speciesKnowledge, locationKnowledge, currentConditions),
        weatherConditions: this.getOptimalWeatherConditions(speciesKnowledge, currentConditions),
        tips: this.getExpertTips(speciesKnowledge, locationKnowledge, currentConditions, context.experience)
      },
      confidence: this.calculateConfidence(speciesKnowledge, locationKnowledge, currentConditions),
      reasoning: this.buildExpertReasoning(speciesKnowledge, locationKnowledge, currentConditions, season),
      detailedReport: this.generateDetailedRecommendationReport(scenario, speciesKnowledge, locationKnowledge, currentConditions, season)
    };

    return recommendation;
  }

  private getCurrentSeason(): string {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'fall';
    return 'winter';
  }

  private getSpeciesExpertKnowledge(species: string, season: string): any {
    if (!species) return null;
    
    const speciesLower = species.toLowerCase();
    const seasonalPatterns = this.expertKnowledge.seasonalPatterns[season];
    
    if (speciesLower.includes('striped bass') || speciesLower.includes('striper')) {
      return seasonalPatterns?.stripedBass || {
        behavior: 'Migratory game fish, follows bait schools',
        hotspots: ['Narragansett Bay', 'Block Island Sound', 'Coastal waters'],
        techniques: ['Live lining', 'Casting', 'Trolling'],
        notes: 'Rhode Island\'s premier game fish'
      };
    }
    
    if (speciesLower.includes('fluke') || speciesLower.includes('summer flounder')) {
      return seasonalPatterns?.fluke || {
        behavior: 'Bottom-dwelling flatfish, prefers sandy areas',
        hotspots: ['Narragansett Bay', 'Block Island Sound'],
        techniques: ['Drifting', 'Bottom fishing'],
        notes: 'Season opens May 1st, 18" minimum size'
      };
    }
    
    if (speciesLower.includes('tautog') || speciesLower.includes('blackfish')) {
      return seasonalPatterns?.tautog || {
        behavior: 'Structure-loving fish, excellent winter fishing',
        hotspots: ['Rocky structure', 'Wrecks', 'Jetties'],
        techniques: ['Bottom fishing', 'Jigging'],
        notes: 'Green crabs are preferred bait'
      };
    }
    
    if (speciesLower.includes('bluefish')) {
      return seasonalPatterns?.bluefish || {
        behavior: 'Aggressive predator, schooling fish',
        hotspots: ['Block Island', 'Coastal waters'],
        techniques: ['Casting', 'Trolling'],
        notes: 'Use wire leaders to prevent cut-offs'
      };
    }
    
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      return {
        behavior: 'Freshwater game fish, structure-oriented',
        hotspots: ['Ponds', 'Reservoirs', 'Rivers'],
        techniques: ['Casting', 'Still fishing', 'Topwater'],
        notes: 'Popular in Rhode Island\'s freshwater systems'
      };
    }
    
    return null;
  }

  private getLocationExpertKnowledge(location: string): any {
    if (!location) return null;
    
    const locationLower = location.toLowerCase();
    return this.expertKnowledge.locationExpertise[locationLower] || null;
  }

  private getOptimalTimes(speciesKnowledge: any, locationKnowledge: any, conditions: any): string[] {
    const times = [];
    
    if (speciesKnowledge) {
      // Add species-specific timing
      if (speciesKnowledge.behavior?.includes('night')) {
        times.push('Night fishing (10 PM - 2 AM)');
      }
      if (speciesKnowledge.behavior?.includes('dawn') || speciesKnowledge.behavior?.includes('dusk')) {
        times.push('Dawn and dusk feeding periods');
      }
    }
    
    // Add tide-based timing for saltwater locations
    if (locationKnowledge?.tides?.includes('tidal')) {
      times.push(`Incoming tide (${conditions.tides.nextChange})`);
      times.push('Outgoing tide for structure fishing');
    }
    
    // Add weather-based timing
    if (conditions.weather.windSpeed < 10) {
      times.push('Early morning calm conditions');
    }
    
    // Default times
    times.push('Early morning (6-8 AM)', 'Late evening (6-8 PM)');
    
    return [...new Set(times)]; // Remove duplicates
  }

  private getOptimalLures(speciesKnowledge: any, season: string, conditions: any): string[] {
    const lures = [];
    
    if (speciesKnowledge) {
      if (speciesKnowledge.techniques?.includes('casting')) {
        lures.push('Topwater plugs', 'Swimbaits', 'Jerkbaits');
      }
      if (speciesKnowledge.techniques?.includes('jigging')) {
        lures.push('Bucktail jigs', 'Soft plastic jigs', 'Metal jigs');
      }
      if (speciesKnowledge.techniques?.includes('trolling')) {
        lures.push('Trolling plugs', 'Tube and worm rigs');
      }
    }
    
    // Season-specific lures
    if (season === 'spring') {
      lures.push('Pre-spawn lures', 'Cold water presentations');
    } else if (season === 'summer') {
      lures.push('Topwater lures', 'Fast retrieves');
    } else if (season === 'fall') {
      lures.push('Feeding frenzy lures', 'Large profile baits');
    } else if (season === 'winter') {
      lures.push('Slow presentations', 'Deep diving lures');
    }
    
    return [...new Set(lures)];
  }

  private getOptimalBait(speciesKnowledge: any, season: string, conditions: any): string[] {
    const bait = [];
    
    if (speciesKnowledge) {
      if (speciesKnowledge.notes?.includes('green crabs')) {
        bait.push('Green crabs', 'Hermit crabs');
      }
      if (speciesKnowledge.notes?.includes('live eels')) {
        bait.push('Live eels', 'Live bunker');
      }
      if (speciesKnowledge.techniques?.includes('live lining')) {
        bait.push('Live bait', 'Live killifish');
      }
    }
    
    // Season-specific bait
    if (season === 'spring') {
      bait.push('Live bait', 'Pre-spawn baits');
    } else if (season === 'summer') {
      bait.push('Fresh bait', 'Live bait');
    } else if (season === 'fall') {
      bait.push('Large baits', 'Baitfish imitations');
    } else if (season === 'winter') {
      bait.push('Tough baits', 'Slow-moving baits');
    }
    
    return [...new Set(bait)];
  }

  private getOptimalTechniques(speciesKnowledge: any, locationKnowledge: any, conditions: any): string[] {
    const techniques = [];
    
    if (speciesKnowledge?.techniques) {
      techniques.push(...speciesKnowledge.techniques);
    }
    
    if (locationKnowledge?.characteristics?.includes('tidal')) {
      techniques.push('Tide-based fishing', 'Current breaks');
    }
    
    if (locationKnowledge?.structure) {
      techniques.push('Structure fishing', 'Drop-off presentations');
    }
    
    // Weather-based techniques
    if (conditions.weather.windSpeed > 15) {
      techniques.push('Heavy tackle fishing', 'Wind-resistant presentations');
    } else {
      techniques.push('Light tackle fishing', 'Finesse presentations');
    }
    
    return [...new Set(techniques)];
  }

  private getOptimalWeatherConditions(speciesKnowledge: any, conditions: any): string[] {
    const weather = [];
    
    // Current conditions analysis
    if (conditions.weather.windSpeed < 10) {
      weather.push('Light winds (excellent conditions)');
    } else if (conditions.weather.windSpeed < 20) {
      weather.push('Moderate winds (good conditions)');
    } else {
      weather.push('Strong winds (challenging conditions)');
    }
    
    if (conditions.weather.pressure > 30.2) {
      weather.push('High pressure (good fishing)');
    } else if (conditions.weather.pressure < 29.8) {
      weather.push('Low pressure (excellent fishing)');
    }
    
    if (conditions.weather.visibility > 8) {
      weather.push('Clear visibility');
    } else {
      weather.push('Limited visibility');
    }
    
    return weather;
  }

  private getExpertTips(speciesKnowledge: any, locationKnowledge: any, conditions: any, experience: string): string[] {
    const tips = [];
    
    // Species-specific tips
    if (speciesKnowledge?.notes) {
      tips.push(speciesKnowledge.notes);
    }
    
    // Location-specific tips
    if (locationKnowledge?.tips) {
      tips.push(...locationKnowledge.tips);
    }
    
    // Experience-based tips
    if (experience === 'beginner') {
      tips.push('Start with simple techniques', 'Focus on one species at a time', 'Use reliable tackle');
    } else if (experience === 'intermediate') {
      tips.push('Experiment with different presentations', 'Learn to read water conditions');
    } else if (experience === 'expert') {
      tips.push('Fine-tune your approach', 'Experiment with advanced techniques');
    }
    
    // Current conditions tips
    if (conditions.waterConditions.waterTemp < 50) {
      tips.push('Slow down your presentation in cold water');
    }
    
    if (conditions.tides.current === 'Outgoing') {
      tips.push('Focus on structure during outgoing tide');
    }
    
    return [...new Set(tips)];
  }

  private calculateConfidence(speciesKnowledge: any, locationKnowledge: any, conditions: any): number {
    let confidence = 0.5; // Base confidence
    
    if (speciesKnowledge) confidence += 0.2;
    if (locationKnowledge) confidence += 0.2;
    if (conditions.weather.windSpeed < 15) confidence += 0.1;
    if (conditions.waterConditions.clarity === 'Good') confidence += 0.1;
    
    return Math.min(confidence, 0.95); // Cap at 95%
  }

  private buildExpertReasoning(speciesKnowledge: any, locationKnowledge: any, conditions: any, season: string): string {
    let reasoning = `Based on current Rhode Island fishing conditions (${season} season): `;
    
    if (speciesKnowledge) {
      reasoning += `Target species shows ${speciesKnowledge.behavior}. `;
    }
    
    if (locationKnowledge) {
      reasoning += `Location characteristics: ${locationKnowledge.characteristics}. `;
    }
    
    reasoning += `Current conditions: ${conditions.weather.conditions}, ${conditions.weather.windSpeed} mph winds, `;
    reasoning += `${conditions.waterConditions.waterTemp}°F water temperature, ${conditions.tides.current} tide. `;
    
    if (conditions.weather.pressure > 30.2) {
      reasoning += 'High pressure system typically provides good fishing conditions. ';
    } else if (conditions.weather.pressure < 29.8) {
      reasoning += 'Low pressure system often triggers feeding activity. ';
    }
    
    reasoning += 'Recommendations are based on Rhode Island seasonal patterns, local knowledge, and current conditions.';
    
    return reasoning;
  }

  private buildRecommendationPrompt(question: string, context: string): string {
    return `As a Rhode Island fishing expert, provide detailed recommendations for this scenario:

Question: ${question}
Context: ${context}

Consider:
- Rhode Island specific fishing conditions
- Seasonal patterns and migrations
- Local regulations and restrictions
- Best techniques, baits, and lures
- Weather and tide considerations
- Gear recommendations

Provide specific, actionable advice:`;
  }

  private parseAIResponse(response: any, scenario: FishingScenario): FishingRecommendation {
    // Parse the AI response into structured recommendation
    const text = Array.isArray(response) ? response[0]?.generated_text || '' : response.generated_text || '';
    
    return {
      scenario: scenario.question,
      location: scenario.context.location || 'Rhode Island',
      fishSpecies: scenario.context.fishSpecies || 'Multiple species',
      recommendations: {
        bestTimes: this.extractBestTimes(text),
        lures: this.extractLures(text),
        bait: this.extractBait(text),
        techniques: this.extractTechniques(text),
        weatherConditions: this.extractWeatherConditions(text),
        tips: this.extractTips(text)
      },
      confidence: 0.8,
      reasoning: text
    };
  }

  private generateRuleBasedRecommendation(scenario: FishingScenario): FishingRecommendation {
    const { context } = scenario;
    
    // Enhanced rule-based recommendations with detailed Rhode Island fishing knowledge
    let recommendations = {
      bestTimes: ['Early Morning', 'Late Evening'],
      lures: ['Bucktail Jigs', 'Swimbaits'],
      bait: ['Live Bait', 'Cut Bait'],
      techniques: ['Casting', 'Trolling'],
      weatherConditions: ['Overcast', 'Light Wind'],
      tips: ['Check tides', 'Use appropriate tackle', 'Be patient', 'Match the hatch']
    };

    let detailedReasoning = 'Based on Rhode Island fishing patterns and seasonal behavior. ';

    // Species-specific recommendations
    if (context.fishSpecies) {
      const species = context.fishSpecies.toLowerCase();
      
      if (species.includes('striped bass') || species.includes('striper')) {
        recommendations = {
          bestTimes: ['Early Morning', 'Late Evening', 'Incoming Tide', 'Spring and Fall Migration'],
          lures: ['Topwater Plugs', 'Bucktail Jigs', 'Swimbaits', 'Live Eel Imitations', 'Soft Plastic Jerkbaits'],
          bait: ['Live Eels', 'Live Bunker', 'Live Mackerel', 'Cut Bunker', 'Sandworms'],
          techniques: ['Live Lining', 'Casting', 'Trolling', 'Surf Casting', 'Jigging'],
          weatherConditions: ['Overcast', 'Light Wind', 'Incoming Weather', 'Dropping Barometric Pressure'],
          tips: [
            'Use 20-30lb braided line with 40-60lb leader',
            'Live eels are deadly for big stripers',
            'Fish structure and drop-offs',
            'Early spring and fall are prime times',
            'Check RI DEM for size and bag limits'
          ]
        };
        detailedReasoning += 'Striped bass are Rhode Island\'s premier game fish. They migrate seasonally and prefer live bait and structure. ';
      } else if (species.includes('fluke') || species.includes('summer flounder')) {
        recommendations = {
          bestTimes: ['Incoming Tide', 'Early Morning', 'Late Afternoon', 'Summer Months'],
          lures: ['Bucktail Jigs', 'Gulp Baits', 'Squid Strips', 'Minnow Imitations'],
          bait: ['Live Killifish', 'Squid', 'Sandworms', 'Minnows', 'Gulp Swimming Mullet'],
          techniques: ['Drifting', 'Jigging', 'Bottom Fishing', 'Slow Retrieve'],
          weatherConditions: ['Light Wind', 'Stable Weather', 'Clear Water'],
          tips: [
            'Use 18" minimum size limit',
            'Drift over sandy/muddy bottoms',
            'Keep bait moving slowly',
            'Use circle hooks for better hookups',
            'Check tide charts for best fishing'
          ]
        };
        detailedReasoning += 'Fluke fishing requires patience and finesse. They prefer sandy bottoms and moving bait. ';
      } else if (species.includes('tautog') || species.includes('blackfish')) {
        recommendations = {
          bestTimes: ['Incoming Tide', 'Early Morning', 'Late Afternoon', 'Winter Months'],
          lures: ['Jigs', 'Rigs with Hooks', 'Soft Plastic Crabs'],
          bait: ['Green Crabs', 'Hermit Crabs', 'Sandworms', 'Clams'],
          techniques: ['Bottom Fishing', 'Jigging', 'Structure Fishing', 'Heavy Tackle'],
          weatherConditions: ['Any Weather', 'Structure Fishing'],
          tips: [
            'Fish rocky structure and wrecks',
            'Use heavy tackle - they fight hard',
            'Green crabs are the go-to bait',
            'Winter months are best',
            'Check seasonal regulations'
          ]
        };
        detailedReasoning += 'Tautog are structure-loving fish that provide excellent winter fishing. ';
      } else if (species.includes('bass') && !species.includes('sea')) {
        recommendations = {
          bestTimes: ['Early Morning', 'Late Evening', 'Spring and Fall', 'Overcast Days'],
          lures: ['Plastic Worms', 'Jigs', 'Crankbaits', 'Topwater Plugs', 'Spinnerbaits'],
          bait: ['Live Minnows', 'Nightcrawlers', 'Crayfish', 'Frogs'],
          techniques: ['Casting', 'Still Fishing', 'Jigging', 'Topwater'],
          weatherConditions: ['Overcast', 'Light Wind', 'Stable Weather'],
          tips: [
            'Fish cover and structure',
            'Use appropriate line weight',
            'Be patient - bass can be finicky',
            'Match the season and water temperature',
            'Try different depths'
          ]
        };
        detailedReasoning += 'Bass fishing in Rhode Island requires understanding their seasonal patterns and preferred habitat. ';
      } else if (species.includes('trout')) {
        recommendations = {
          bestTimes: ['Early Morning', 'Late Evening', 'Overcast Days', 'Spring Stocking Season'],
          lures: ['Spinners', 'Spoons', 'Nymphs', 'Dry Flies', 'Streamers'],
          bait: ['Live Worms', 'PowerBait', 'Salmon Eggs', 'Corn', 'Minnows'],
          techniques: ['Fly Fishing', 'Drift Fishing', 'Still Fishing', 'Trolling'],
          weatherConditions: ['Overcast', 'Light Rain', 'Stable Weather'],
          tips: [
            'Check stocking schedules',
            'Use light tackle for finesse',
            'Match the hatch when fly fishing',
            'Fish deep in warm weather',
            'Practice catch and release'
          ]
        };
        detailedReasoning += 'Trout fishing in Rhode Island is best during stocking season and requires finesse. ';
      }
    }

    // Location-specific adjustments
    if (context.location) {
      const location = context.location.toLowerCase();
      
      if (location.includes('rochambeau')) {
        recommendations.tips.push('Popular local spot - arrive early for best access', 'Great for families with easy shore access');
        detailedReasoning += 'Lower Rochambeau Pond is a popular local fishing spot with easy access and good bass fishing. ';
      } else if (location.includes('narragansett bay')) {
        recommendations.tips.push('Check tide charts - timing is crucial', 'Multiple access points available', 'Be aware of boat traffic');
        detailedReasoning += 'Narragansett Bay offers diverse fishing opportunities with strong tidal influence. ';
      } else if (location.includes('block island')) {
        recommendations.tips.push('Ferry access required', 'Limited parking on island', 'Check weather before going');
        detailedReasoning += 'Block Island provides world-class fishing but requires planning for access. ';
      }
    }

    // Season-specific adjustments
    if (context.season) {
      if (context.season === 'winter') {
        recommendations.bestTimes = ['Late Morning', 'Early Afternoon', 'Warmest Parts of Day'];
        recommendations.weatherConditions = ['Clear Skies', 'Light Wind', 'Stable High Pressure'];
        recommendations.tips.push('Fish deeper water in winter', 'Slow down your presentation', 'Focus on structure');
        detailedReasoning += 'Winter fishing requires patience and slower presentations. ';
      } else if (context.season === 'spring') {
        recommendations.tips.push('Spring migration brings excellent fishing', 'Water temperatures warming', 'Pre-spawn activity increases');
        detailedReasoning += 'Spring is prime time for many species as they become more active. ';
      } else if (context.season === 'summer') {
        recommendations.tips.push('Early morning and evening are best', 'Fish deeper during hot weather', 'Stay hydrated');
        detailedReasoning += 'Summer fishing requires early starts and evening sessions to avoid heat. ';
      } else if (context.season === 'fall') {
        recommendations.tips.push('Fall migration provides excellent opportunities', 'Fish are feeding heavily', 'Weather can change quickly');
        detailedReasoning += 'Fall brings feeding frenzies as fish prepare for winter. ';
      }
    }

    // Experience level adjustments
    if (context.experience === 'beginner') {
      recommendations.tips.push('Start with simple techniques', 'Ask local bait shops for advice', 'Don\'t get discouraged');
      detailedReasoning += 'Beginners should focus on basic techniques and seek local knowledge. ';
    } else if (context.experience === 'advanced') {
      recommendations.tips.push('Try advanced techniques like fly fishing', 'Experiment with different presentations', 'Share knowledge with others');
      detailedReasoning += 'Advanced anglers can explore sophisticated techniques and help mentor beginners. ';
    }

    return {
      scenario: scenario.question,
      location: context.location || 'Rhode Island',
      fishSpecies: context.fishSpecies || 'Multiple species',
      recommendations,
      confidence: 0.95,
      reasoning: detailedReasoning
    };
  }

  private extractBestTimes(text: string): string[] {
    const times = ['Early Morning', 'Late Evening', 'Incoming Tide', 'Outgoing Tide', 'Overcast Days'];
    return times.filter(time => text.toLowerCase().includes(time.toLowerCase()));
  }

  private extractLures(text: string): string[] {
    const lures = ['Bucktail Jigs', 'Swimbaits', 'Topwater Plugs', 'Spinners', 'Jigs', 'Plastic Worms'];
    return lures.filter(lure => text.toLowerCase().includes(lure.toLowerCase()));
  }

  private extractBait(text: string): string[] {
    const baits = ['Live Eels', 'Live Bunker', 'Sandworms', 'Squid', 'PowerBait', 'Live Minnows'];
    return baits.filter(bait => text.toLowerCase().includes(bait.toLowerCase()));
  }

  private extractTechniques(text: string): string[] {
    const techniques = ['Casting', 'Trolling', 'Jigging', 'Fly Fishing', 'Bottom Fishing', 'Live Lining'];
    return techniques.filter(technique => text.toLowerCase().includes(technique.toLowerCase()));
  }

  private extractWeatherConditions(text: string): string[] {
    const conditions = ['Overcast', 'Light Wind', 'Clear Skies', 'Incoming Weather'];
    return conditions.filter(condition => text.toLowerCase().includes(condition.toLowerCase()));
  }

  private extractTips(text: string): string[] {
    const tips = ['Check tides', 'Use appropriate tackle', 'Be patient', 'Match the hatch'];
    return tips.filter(tip => text.toLowerCase().includes(tip.toLowerCase()));
  }

  async generateFishingReport(location: string, date: string): Promise<string> {
    await this.initialize();

    try {
      const report = this.generateExpertFishingReport(location, date);
      return report;
    } catch (error) {
      console.error('Failed to generate fishing report:', error);
      return 'Unable to generate fishing report at this time. Please try again later.';
    }
  }

  private generateExpertFishingReport(location: string, date: string): string {
    const currentConditions = this.expertKnowledge.currentConditions;
    const season = this.getCurrentSeason();
    const locationKnowledge = this.getLocationExpertKnowledge(location);
    
    // Generate comprehensive report
    const report = `
🏞️ RHODE ISLAND FISHING REPORT
📍 Location: ${location}
📅 Date: ${date}
🌊 Season: ${season.charAt(0).toUpperCase() + season.slice(1)}

═══════════════════════════════════════════════════════════════

🌤️ CURRENT CONDITIONS
═══════════════════════════════════════════════════════════════
• Temperature: ${currentConditions.weather.temperature}°F
• Wind: ${currentConditions.weather.windSpeed} mph ${currentConditions.weather.windDirection}
• Conditions: ${currentConditions.weather.conditions}
• Barometric Pressure: ${currentConditions.weather.pressure} inHg
• Visibility: ${currentConditions.weather.visibility} miles

🌊 WATER CONDITIONS
═══════════════════════════════════════════════════════════════
• Water Temperature: ${currentConditions.waterConditions.waterTemp}°F
• Water Clarity: ${currentConditions.waterConditions.clarity}
• Oxygen Levels: ${currentConditions.waterConditions.oxygen}
• Salinity: ${currentConditions.waterConditions.salinity} ppt
• Current: ${currentConditions.waterConditions.current}

🌊 TIDE INFORMATION
═══════════════════════════════════════════════════════════════
• High Tide: ${currentConditions.tides.high}
• Low Tide: ${currentConditions.tides.low}
• Current Tide: ${currentConditions.tides.current}
• Tide Height: ${currentConditions.tides.height} ft
• Next Change: ${currentConditions.tides.nextChange}

${this.generateSpeciesActivitySection(location, season, currentConditions)}

${this.generateBestTechniquesSection(location, season, currentConditions)}

${this.generateRecommendedGearSection(location, season, currentConditions)}

${this.generateLocalTipsSection(location, locationKnowledge)}

${this.generateRegulationsReminderSection(location)}

${this.generateWeatherOutlookSection(currentConditions)}

${this.generateFishingForecastSection(location, season, currentConditions)}

═══════════════════════════════════════════════════════════════
📊 CONFIDENCE LEVEL: ${Math.round(this.calculateConfidence(null, locationKnowledge, currentConditions) * 100)}%
🎯 BEST TIMES TODAY: ${this.getBestTimesForLocation(location, currentConditions).join(', ')}
═══════════════════════════════════════════════════════════════

⚠️ SAFETY REMINDER: Always check weather conditions before heading out. 
   Rhode Island waters can change quickly. Safety first!

📱 Report generated by Rhode Island Fishing Guide AI
   For the most current conditions, check local weather and tide charts.
`;

    return report.trim();
  }

  private generateSpeciesActivitySection(location: string, season: string, conditions: any): string {
    const locationLower = location.toLowerCase();
    let speciesActivity = '';
    
    if (locationLower.includes('bay') || locationLower.includes('block island') || locationLower.includes('sakonnet')) {
      // Saltwater locations
      speciesActivity = `🐟 SPECIES ACTIVITY
═══════════════════════════════════════════════════════════════`;
      
      if (season === 'spring') {
        speciesActivity += `
• Striped Bass: ⭐⭐⭐⭐⭐ EXCELLENT - Spring migration in full swing
  - Size Range: 24-40 inches, some 40+ pounders possible
  - Best Areas: Bay entrance, Block Island Sound
  - Technique: Live lining bunker, casting plugs

• Fluke: ⭐⭐⭐ GOOD - Season opens May 1st
  - Size Range: 16-22 inches average
  - Best Areas: Sandy bottoms, drop-offs
  - Technique: Drifting with bucktails and squid strips

• Bluefish: ⭐⭐ FAIR - Beginning to arrive
  - Size Range: 2-8 pounds
  - Best Areas: Coastal waters, near bait schools
  - Technique: Casting plugs, trolling`;
      } else if (season === 'summer') {
        speciesActivity += `
• Striped Bass: ⭐⭐⭐⭐ VERY GOOD - Resident fish active
  - Size Range: 20-35 inches
  - Best Areas: Narragansett Bay, estuaries
  - Technique: Live lining, eel fishing at night

• Fluke: ⭐⭐⭐⭐⭐ EXCELLENT - Peak season
  - Size Range: 18-25 inches
  - Best Areas: Bay waters, Block Island Sound
  - Technique: Drifting, live lining killies

• Bluefish: ⭐⭐⭐⭐⭐ EXCELLENT - Aggressive feeding
  - Size Range: 3-12 pounds
  - Best Areas: Block Island, coastal waters
  - Technique: Casting, trolling, chunking`;
      } else if (season === 'fall') {
        speciesActivity += `
• Striped Bass: ⭐⭐⭐⭐⭐ EXCELLENT - Fall migration
  - Size Range: 30-50+ inches, largest fish of year
  - Best Areas: Block Island, Montauk area
  - Technique: Live lining, eel fishing, surf casting

• Tautog: ⭐⭐⭐⭐ VERY GOOD - Season opens
  - Size Range: 14-20 inches
  - Best Areas: Rocky structure, wrecks
  - Technique: Bottom fishing with green crabs

• Bluefish: ⭐⭐⭐ GOOD - Still active
  - Size Range: 4-15 pounds
  - Best Areas: Coastal waters
  - Technique: Casting, trolling`;
      } else { // winter
        speciesActivity += `
• Tautog: ⭐⭐⭐⭐ VERY GOOD - Prime winter fishing
  - Size Range: 16-22 inches
  - Best Areas: Deep wrecks, rocky ledges
  - Technique: Heavy tackle bottom fishing

• Cod: ⭐⭐⭐ GOOD - Offshore fishing
  - Size Range: 5-25 pounds
  - Best Areas: Cox's Ledge, south of Block Island
  - Technique: Jigging, bottom fishing`;
      }
    } else {
      // Freshwater locations
      speciesActivity = `🐟 SPECIES ACTIVITY
═══════════════════════════════════════════════════════════════`;
      
      if (season === 'spring') {
        speciesActivity += `
• Largemouth Bass: ⭐⭐⭐⭐ VERY GOOD - Pre-spawn activity
  - Size Range: 2-6 pounds
  - Best Areas: Shallow coves, weed beds
  - Technique: Spinnerbaits, soft plastics

• Smallmouth Bass: ⭐⭐⭐ GOOD - Beginning to move shallow
  - Size Range: 1-4 pounds
  - Best Areas: Rocky areas, drop-offs
  - Technique: Crankbaits, jigs

• Chain Pickerel: ⭐⭐⭐ GOOD - Active in cooler water
  - Size Range: 1-3 pounds
  - Best Areas: Weed beds, shallow water
  - Technique: Spinnerbaits, spoons`;
      } else if (season === 'summer') {
        speciesActivity += `
• Largemouth Bass: ⭐⭐⭐ GOOD - Deeper water
  - Size Range: 2-5 pounds
  - Best Areas: Deep weed lines, structure
  - Technique: Deep diving crankbaits, jigs

• Smallmouth Bass: ⭐⭐⭐ GOOD - Rocky areas
  - Size Range: 1-3 pounds
  - Best Areas: Rocky ledges, drop-offs
  - Technique: Drop shot, jigs

• Yellow Perch: ⭐⭐⭐ GOOD - Schooling fish
  - Size Range: 8-12 inches
  - Best Areas: Weed beds, drop-offs
  - Technique: Small jigs, live bait`;
      } else {
        speciesActivity += `
• Largemouth Bass: ⭐⭐ FAIR - Slower activity
  - Size Range: 2-4 pounds
  - Best Areas: Deep water, structure
  - Technique: Slow presentations, jigs

• Chain Pickerel: ⭐⭐⭐ GOOD - Still active
  - Size Range: 1-3 pounds
  - Best Areas: Weed beds
  - Technique: Slow retrieve lures`;
      }
    }
    
    return speciesActivity;
  }

  private generateBestTechniquesSection(location: string, season: string, conditions: any): string {
    const locationLower = location.toLowerCase();
    let techniques = '';
    
    if (locationLower.includes('bay') || locationLower.includes('block island') || locationLower.includes('sakonnet')) {
      // Saltwater techniques
      techniques = `🎣 BEST TECHNIQUES
═══════════════════════════════════════════════════════════════`;
      
      if (conditions.tides.current === 'Incoming') {
        techniques += `
• Tide-Based Fishing: ⭐⭐⭐⭐⭐ EXCELLENT
  - Incoming tide brings bait and fish
  - Fish moving water and current breaks
  - Best during first 2 hours of incoming tide`;
      } else {
        techniques += `
• Structure Fishing: ⭐⭐⭐⭐ VERY GOOD
  - Outgoing tide exposes structure
  - Fish drop-offs and rocky areas
  - Bottom fishing techniques effective`;
      }
      
      techniques += `
• Live Lining: ⭐⭐⭐⭐ VERY GOOD
  - Use live bunker, eels, or killifish
  - Drift with current or anchor
  - Best for larger fish

• Casting: ⭐⭐⭐ GOOD
  - Topwater plugs at dawn/dusk
  - Swimbaits for active fish
  - Bucktail jigs for bottom fish`;
    } else {
      // Freshwater techniques
      techniques = `🎣 BEST TECHNIQUES
═══════════════════════════════════════════════════════════════`;
      
      if (conditions.waterConditions.waterTemp > 60) {
        techniques += `
• Topwater Fishing: ⭐⭐⭐⭐ VERY GOOD
  - Early morning and evening
  - Poppers, buzzbaits, frogs
  - Exciting surface strikes`;
      } else {
        techniques += `
• Slow Presentations: ⭐⭐⭐⭐ VERY GOOD
  - Cold water requires patience
  - Jigs, soft plastics
  - Slow retrieve speeds`;
      }
      
      techniques += `
• Structure Fishing: ⭐⭐⭐⭐ VERY GOOD
  - Weed beds, drop-offs, rocks
  - Cast to structure edges
  - Use appropriate tackle

• Finesse Techniques: ⭐⭐⭐ GOOD
  - Drop shot, wacky rig
  - Light line and small hooks
  - Great for pressured fish`;
    }
    
    return techniques;
  }

  private generateRecommendedGearSection(location: string, season: string, conditions: any): string {
    const locationLower = location.toLowerCase();
    let gear = '';
    
    if (locationLower.includes('bay') || locationLower.includes('block island') || locationLower.includes('sakonnet')) {
      // Saltwater gear
      gear = `🎒 RECOMMENDED GEAR
═══════════════════════════════════════════════════════════════
• Rod: 7-8' medium-heavy spinning or conventional
• Reel: 4000-6000 size spinning or 4/0-6/0 conventional
• Line: 20-30lb braided line with 40-60lb leader
• Hooks: 2/0-4/0 circle hooks for live bait
• Sinkers: 1-4oz bank sinkers, egg sinkers
• Lures: Bucktail jigs, topwater plugs, swimbaits
• Bait: Live bunker, eels, squid, sandworms`;
    } else {
      // Freshwater gear
      gear = `🎒 RECOMMENDED GEAR
═══════════════════════════════════════════════════════════════
• Rod: 6'6"-7' medium spinning rod
• Reel: 2500-3000 size spinning reel
• Line: 10-15lb braided line with 12-17lb fluorocarbon leader
• Hooks: 2/0-4/0 worm hooks, 1/0-2/0 jig hooks
• Weights: 1/4-1/2oz bullet weights, jig heads
• Lures: Soft plastics, crankbaits, spinnerbaits
• Bait: Live worms, minnows, crayfish`;
    }
    
    return gear;
  }

  private generateLocalTipsSection(location: string, locationKnowledge: any): string {
    let tips = `💡 LOCAL TIPS
═══════════════════════════════════════════════════════════════`;
    
    if (locationKnowledge?.tips) {
      locationKnowledge.tips.forEach((tip: string, index: number) => {
        tips += `\n• ${tip}`;
      });
    }
    
    // Add general Rhode Island tips
    tips += `
• Check RI DEM website for current regulations
• Rhode Island requires saltwater fishing license for most species
• Be aware of seasonal closures and size limits
• Local bait shops have the most current information
• Join local fishing forums for real-time reports`;
    
    return tips;
  }

  private generateRegulationsReminderSection(location: string): string {
    const locationLower = location.toLowerCase();
    let regulations = `📋 REGULATIONS REMINDER
═══════════════════════════════════════════════════════════════`;
    
    if (locationLower.includes('bay') || locationLower.includes('block island') || locationLower.includes('sakonnet')) {
      regulations += `
• Striped Bass: 28" minimum, 1 fish per day (May 1 - Dec 31)
• Fluke: 18" minimum, 4 fish per day (May 1 - Sep 30)
• Tautog: 16" minimum, 3 fish per day (Oct 15 - Apr 30)
• Bluefish: No size limit, 3 fish per day
• Saltwater fishing license required for most species`;
    } else {
      regulations += `
• Largemouth Bass: 12" minimum, 5 fish per day
• Smallmouth Bass: 12" minimum, 5 fish per day
• Chain Pickerel: No size limit, 5 fish per day
• Freshwater fishing license required
• Check for special regulations on specific waters`;
    }
    
    regulations += `
• Always check current regulations before fishing
• Regulations can change seasonally
• RI DEM website has most current information`;
    
    return regulations;
  }

  private generateWeatherOutlookSection(conditions: any): string {
    let outlook = `🌤️ WEATHER OUTLOOK
═══════════════════════════════════════════════════════════════`;
    
    if (conditions.weather.pressure > 30.2) {
      outlook += `
• High Pressure System: Stable conditions expected
• Good fishing conditions for next 24-48 hours
• Light winds, clear skies likely
• Fish may be more active during pressure changes`;
    } else if (conditions.weather.pressure < 29.8) {
      outlook += `
• Low Pressure System: Active weather possible
• Excellent fishing conditions during pressure drops
• Watch for approaching storms
• Fish feeding activity often increases`;
    } else {
      outlook += `
• Stable Pressure: Consistent conditions
• Good fishing conditions
• Monitor for approaching weather systems`;
    }
    
    if (conditions.weather.windSpeed > 20) {
      outlook += `
• Strong Winds: Challenging conditions
• Consider sheltered areas
• Safety first - avoid dangerous conditions`;
    }
    
    return outlook;
  }

  private generateFishingForecastSection(location: string, season: string, conditions: any): string {
    let forecast = `🔮 FISHING FORECAST
═══════════════════════════════════════════════════════════════`;
    
    const locationLower = location.toLowerCase();
    const isSaltwater = locationLower.includes('bay') || locationLower.includes('block island') || locationLower.includes('sakonnet');
    
    if (isSaltwater) {
      if (season === 'spring') {
        forecast += `
• EXCELLENT fishing conditions expected
• Spring migration in full swing
• Striped bass and fluke season opening
• Early morning and evening best
• Incoming tides most productive`;
      } else if (season === 'summer') {
        forecast += `
• VERY GOOD fishing conditions
• Peak season for most species
• Early morning and night fishing best
• Watch for bluefish blitzes
• Structure fishing productive`;
      } else if (season === 'fall') {
        forecast += `
• EXCELLENT fishing conditions
• Fall migration provides best fishing
• Largest fish of the year possible
• All-day fishing opportunities
• Weather changes trigger feeding`;
      } else {
        forecast += `
• GOOD fishing conditions
• Winter species active
• Focus on structure and deep water
• Tautog and cod fishing productive
• Weather dependent`;
      }
    } else {
      if (season === 'spring') {
        forecast += `
• VERY GOOD fishing conditions
• Pre-spawn activity increasing
• Bass moving to shallow water
• Topwater action beginning
• Early morning best`;
      } else if (season === 'summer') {
        forecast += `
• GOOD fishing conditions
• Fish in deeper water
• Early morning and evening best
• Structure fishing productive
• Hot weather slows activity`;
      } else {
        forecast += `
• FAIR to GOOD fishing conditions
• Fish moving to deeper water
• Slower presentations needed
• Focus on structure
• Cold weather requires patience`;
      }
    }
    
    return forecast;
  }

  private getBestTimesForLocation(location: string, conditions: any): string[] {
    const times = [];
    const locationLower = location.toLowerCase();
    
    if (locationLower.includes('bay') || locationLower.includes('block island') || locationLower.includes('sakonnet')) {
      // Saltwater timing
      if (conditions.tides.current === 'Incoming') {
        times.push('Incoming tide');
      } else {
        times.push('Outgoing tide');
      }
      times.push('Early morning (6-8 AM)', 'Evening (6-8 PM)', 'Night fishing (10 PM - 2 AM)');
    } else {
      // Freshwater timing
      times.push('Early morning (6-8 AM)', 'Late evening (6-8 PM)', 'Overcast days');
    }
    
    if (conditions.weather.windSpeed < 10) {
      times.push('Calm conditions');
    }
    
    return times;
  }

  private generateDetailedRecommendationReport(scenario: FishingScenario, speciesKnowledge: any, locationKnowledge: any, conditions: any, season: string): string {
    const { context } = scenario;
    const location = context.location || 'Rhode Island';
    const species = context.fishSpecies || 'Multiple species';
    const experience = context.experience || 'intermediate';
    
    // Generate conversational response based on the specific question
    return this.generateConversationalResponse(scenario, speciesKnowledge, locationKnowledge, conditions, season);
  }

  private generateConversationalResponse(scenario: FishingScenario, speciesKnowledge: any, locationKnowledge: any, conditions: any, season: string): string {
    const { context } = scenario;
    const location = context.location || 'Rhode Island';
    const species = context.fishSpecies || 'Multiple species';
    const experience = context.experience || 'intermediate';
    const question = scenario.question.toLowerCase();
    
    let response = `Hey there! Great question about fishing in Rhode Island. `;
    
    // Analyze the question type and provide conversational response
    if (question.includes('when') || question.includes('time') || question.includes('best time')) {
      response += this.generateTimingAdvice(location, species, conditions, season);
    } else if (question.includes('what') && (question.includes('bait') || question.includes('lure'))) {
      response += this.generateBaitAdvice(location, species, conditions, season);
    } else if (question.includes('where') || question.includes('location') || question.includes('spot')) {
      response += this.generateLocationAdvice(location, species, locationKnowledge, conditions);
    } else if (question.includes('how') || question.includes('technique') || question.includes('method')) {
      response += this.generateTechniqueAdvice(location, species, experience, conditions);
    } else if (question.includes('gear') || question.includes('equipment') || question.includes('rod') || question.includes('reel')) {
      response += this.generateGearAdvice(location, species, conditions);
    } else if (question.includes('beginner') || question.includes('start') || question.includes('new')) {
      response += this.generateBeginnerAdvice(location, species, conditions);
    } else if (question.includes('weather') || question.includes('conditions')) {
      response += this.generateWeatherAdvice(location, species, conditions, season);
    } else {
      // General comprehensive response
      response += this.generateGeneralAdvice(location, species, experience, conditions, season);
    }
    
    // Add Rhode Island specific context
    response += this.addRhodeIslandContext(location, species, conditions);
    
    // Add encouragement and next steps
    response += this.addEncouragementAndNextSteps(experience, location, species);
    
    return response;
  }

  private generateTimingAdvice(location: string, species: string, conditions: any, season: string): string {
    const locationLower = location.toLowerCase();
    const speciesLower = species.toLowerCase();
    
    let advice = `For ${species} at ${location}, timing is everything here in Rhode Island. `;
    
    if (locationLower.includes('bay') || locationLower.includes('block island') || locationLower.includes('sakonnet')) {
      // Saltwater timing advice
      if (conditions.tides.current === 'Incoming') {
        advice += `Right now you're looking at an incoming tide, which is absolutely perfect for most saltwater species. `;
      } else {
        advice += `The outgoing tide can be great too, especially for structure fishing. `;
      }
      
      if (speciesLower.includes('striped bass')) {
        advice += `Striped bass are most active during the first few hours of incoming tide, and honestly, some of the biggest fish I've seen caught were during the evening tide change. `;
      }
      
      advice += `With water temp at ${conditions.waterConditions.waterTemp}°F and ${conditions.weather.windSpeed} mph winds, I'd say early morning (6-8 AM) or late evening (6-8 PM) would be your best bet. `;
    } else {
      // Freshwater timing advice
      advice += `For freshwater fishing at ${location}, the early morning and evening are definitely your prime times. `;
      if (conditions.waterConditions.waterTemp < 60) {
        advice += `Since the water is still on the cooler side at ${conditions.waterConditions.waterTemp}°F, fish might be a bit sluggish, so don't be afraid to slow down your presentation. `;
      } else {
        advice += `The water temperature is looking good at ${conditions.waterConditions.waterTemp}°F, so the fish should be pretty active. `;
      }
    }
    
    if (conditions.weather.windSpeed > 15) {
      advice += `Just a heads up - with ${conditions.weather.windSpeed} mph winds, you might want to find some sheltered areas or consider waiting for calmer conditions. `;
    } else {
      advice += `The wind conditions look pretty manageable at ${conditions.weather.windSpeed} mph, so you should be good to go. `;
    }
    
    return advice;
  }

  private generateBaitAdvice(location: string, species: string, conditions: any, season: string): string {
    const speciesLower = species.toLowerCase();
    const currentSeason = this.getCurrentSeason();
    
    let advice = `For ${species}, I've got some solid Rhode Island-specific recommendations for you. `;
    
    if (speciesLower.includes('striped bass')) {
      advice += `Striped bass here absolutely love live eels - it's like candy to them. If you can get your hands on some live bunker or mackerel, that's even better. `;
      if (currentSeason === 'spring' || currentSeason === 'fall') {
        advice += `During ${currentSeason}, the big stripers are really aggressive, so don't be shy about using larger baits. `;
      }
    } else if (speciesLower.includes('fluke')) {
      advice += `Fluke fishing here is all about the bucktail jig with a squid strip or Gulp bait. The local guys swear by the "Rhode Island fluke sandwich" - bucktail jig with a strip of squid and a Gulp swimming mullet. `;
    } else if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      advice += `For bass in Rhode Island's freshwater spots, you can't go wrong with a simple worm and bobber setup, or try some soft plastic worms. `;
    } else if (speciesLower.includes('tautog')) {
      advice += `Tautog here are all about the green crabs - they can't resist them. Make sure you're using fresh crabs and fishing right on the bottom near structure. `;
    }
    
    advice += `One thing I always tell people - check with the local bait shops like Quaker Lane Bait & Tackle or Snug Harbor Marina. They'll have the freshest bait and know exactly what's working that day. `;
    
    return advice;
  }

  private generateLocationAdvice(location: string, species: string, locationKnowledge: any, conditions: any): string {
    const locationLower = location.toLowerCase();
    
    let advice = `${location} is a fantastic choice for fishing! `;
    
    if (locationKnowledge) {
      advice += `This spot is known for ${locationKnowledge.characteristics}. `;
      if (locationKnowledge.species) {
        advice += `You'll find ${locationKnowledge.species.join(', ')} here, which is perfect for targeting ${species}. `;
      }
    }
    
    if (locationLower.includes('rochambeau')) {
      advice += `Lower Rochambeau is one of my favorite local spots - great shore access, family-friendly, and the bass fishing is consistently good. `;
    } else if (locationLower.includes('narragansett bay')) {
      advice += `Narragansett Bay is like a fishing playground - you've got everything from shallow flats to deep channels. `;
    } else if (locationLower.includes('block island')) {
      advice += `Block Island is world-class fishing, but you'll need to plan ahead for the ferry and check the weather. `;
    }
    
    if (conditions.waterConditions.clarity === 'Good') {
      advice += `The water clarity is looking good today, so fish should be able to see your presentations clearly. `;
    }
    
    return advice;
  }

  private generateTechniqueAdvice(location: string, species: string, experience: string, conditions: any): string {
    const speciesLower = species.toLowerCase();
    const locationLower = location.toLowerCase();
    
    let advice = `Great question about techniques! `;
    
    if (experience === 'beginner') {
      advice += `Since you're getting started, I'd recommend keeping it simple and effective. `;
      if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
        advice += `For bass, try a simple Texas rig with a plastic worm - cast it out, let it sink, and slowly reel it back. `;
      }
    } else if (experience === 'intermediate') {
      advice += `You've got some experience under your belt, so let's talk about some more advanced approaches. `;
    } else {
      advice += `With your experience level, you can really fine-tune your approach. `;
    }
    
    if (speciesLower.includes('striped bass')) {
      advice += `For stripers, live lining is absolutely deadly here in Rhode Island. Hook a live bunker or eel and let it swim naturally with the current. `;
    }
    
    if (locationLower.includes('bay') || locationLower.includes('block island')) {
      advice += `Since you're fishing saltwater, pay attention to the tides - they're crucial for success here. `;
    }
    
    return advice;
  }

  private generateGearAdvice(location: string, species: string, conditions: any): string {
    const speciesLower = species.toLowerCase();
    const locationLower = location.toLowerCase();
    
    let advice = `Let me give you the straight scoop on gear for ${species} at ${location}. `;
    
    if (locationLower.includes('bay') || locationLower.includes('block island')) {
      // Saltwater gear advice
      advice += `For saltwater fishing here, you need corrosion-resistant gear. I'd recommend a 7-8 foot medium-heavy rod with a 4000-6000 size reel. `;
      if (speciesLower.includes('striped bass')) {
        advice += `For stripers specifically, you'll want 20-30lb braided line with a 40-60lb leader - these fish are strong and will test your gear. `;
      }
    } else {
      // Freshwater gear advice
      advice += `For freshwater fishing, a 6'6" to 7' medium spinning rod with a 2500-3000 size reel will handle most situations. `;
    }
    
    advice += `One piece of advice - don't skimp on your line. Good braided line makes a huge difference, especially when you're dealing with Rhode Island's structure and current. `;
    
    return advice;
  }

  private generateBeginnerAdvice(location: string, species: string, conditions: any): string {
    let advice = `Welcome to Rhode Island fishing! You've picked a great place to start. `;
    
    advice += `First things first - make sure you have a valid Rhode Island fishing license. You can get one online or at most bait shops. `;
    
    if (location.toLowerCase().includes('rochambeau')) {
      advice += `Lower Rochambeau Pond is perfect for beginners - easy access, good parking, and the bass fishing is usually pretty consistent. `;
    }
    
    advice += `Start simple - a basic spinning combo, some worms or minnows, and patience. Don't worry about fancy lures at first. `;
    
    advice += `The local bait shops are incredibly helpful - they'll set you up with exactly what you need and give you current fishing reports. `;
    
    return advice;
  }

  private generateWeatherAdvice(location: string, species: string, conditions: any, season: string): string {
    let advice = `The weather conditions right now are looking ${this.getWeatherAssessment(conditions)}. `;
    
    advice += `With ${conditions.weather.temperature}°F air temperature and ${conditions.weather.windSpeed} mph winds, `;
    
    if (conditions.weather.pressure > 30.2) {
      advice += `the high pressure system should make the fish pretty active. `;
    } else if (conditions.weather.pressure < 29.8) {
      advice += `the low pressure might actually trigger some feeding activity - fish love a dropping barometer. `;
    }
    
    if (conditions.waterConditions.waterTemp < 50) {
      advice += `The water is still pretty cold at ${conditions.waterConditions.waterTemp}°F, so slow down your presentations. `;
    } else if (conditions.waterConditions.waterTemp > 70) {
      advice += `The water is getting warm at ${conditions.waterConditions.waterTemp}°F, so fish might be seeking deeper, cooler areas. `;
    } else {
      advice += `The water temperature at ${conditions.waterConditions.waterTemp}°F is in a good range for most species. `;
    }
    
    return advice;
  }

  private generateGeneralAdvice(location: string, species: string, experience: string, conditions: any, season: string): string {
    let advice = `You're asking about ${species} at ${location} - that's a great combination! `;
    
    advice += `Here's what I know about fishing this area: `;
    
    if (species.toLowerCase().includes('striped bass')) {
      advice += `Striped bass are Rhode Island's crown jewel. They're migratory, so timing is crucial. `;
    } else if (species.toLowerCase().includes('bass') && !species.toLowerCase().includes('sea')) {
      advice += `Bass fishing here is excellent, especially in the freshwater ponds and rivers. `;
    }
    
    advice += `The current conditions show ${conditions.weather.conditions} with ${conditions.weather.windSpeed} mph winds and ${conditions.waterConditions.waterTemp}°F water temperature. `;
    
    return advice;
  }

  private addRhodeIslandContext(location: string, species: string, conditions: any): string {
    let context = `\n\nOne thing I love about Rhode Island fishing is the diversity - you can fish for stripers in the morning and bass in the afternoon, all within a short drive. `;
    
    context += `The local fishing community here is fantastic - everyone's willing to share tips and help each other out. `;
    
    if (conditions.tides.current) {
      context += `Don't forget to check the tide charts - they're absolutely crucial for saltwater success here. `;
    }
    
    context += `Also, make sure you're up to date on Rhode Island's fishing regulations. The RI DEM website has all the current info, and it changes seasonally. `;
    
    return context;
  }

  private addEncouragementAndNextSteps(experience: string, location: string, species: string): string {
    let encouragement = `\n\nI'm confident you'll do well at ${location} targeting ${species}. `;
    
    if (experience === 'beginner') {
      encouragement += `Don't get discouraged if you don't catch fish right away - fishing is a learning process, and every trip teaches you something new. `;
    } else {
      encouragement += `With your experience level, you should be able to adapt to the conditions and find success. `;
    }
    
    encouragement += `\n\nA few final tips: Check the local bait shops for current reports, join some Rhode Island fishing Facebook groups for real-time updates, and always practice good catch-and-release when possible. `;
    
    encouragement += `\n\nGood luck out there, and tight lines! Feel free to ask if you have any other questions about Rhode Island fishing. `;
    
    return encouragement;
  }

  private getWeatherAssessment(conditions: any): string {
    if (conditions.weather.windSpeed < 10 && conditions.weather.pressure > 30.0) {
      return 'excellent for fishing';
    } else if (conditions.weather.windSpeed < 15) {
      return 'pretty good for fishing';
    } else {
      return 'challenging but still fishable';
    }
  }

  private generatePersonalizedIntroduction(location: string, species: string, season: string, experience: string): string {
    const locationLower = location.toLowerCase();
    const speciesLower = species.toLowerCase();
    
    let intro = `👋 PERSONALIZED FISHING STRATEGY
═══════════════════════════════════════════════════════════════
Welcome to your personalized Rhode Island fishing consultation! Based on your interest in targeting ${species} at ${location} during ${season} season, I've prepared a comprehensive strategy tailored to your ${experience} experience level.

`;

    if (locationLower.includes('rochambeau')) {
      intro += `Lower Rochambeau Pond is an excellent choice for ${experience} anglers. This popular local spot offers easy shore access and consistent fishing opportunities. `;
    } else if (locationLower.includes('narragansett bay')) {
      intro += `Narragansett Bay provides world-class fishing opportunities with its diverse ecosystem and strong tidal influence. `;
    } else if (locationLower.includes('block island')) {
      intro += `Block Island is Rhode Island's premier fishing destination, offering some of the best saltwater fishing on the East Coast. `;
    }

    if (speciesLower.includes('striped bass')) {
      intro += `Striped bass are Rhode Island's most sought-after game fish, and ${season} is an excellent time to target them. `;
    } else if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      intro += `Bass fishing in Rhode Island's freshwater systems can be incredibly rewarding, especially during ${season}. `;
    } else if (speciesLower.includes('fluke')) {
      intro += `Fluke fishing requires patience and finesse, but the rewards are worth the effort. `;
    }

    intro += `As a ${experience} angler, you'll benefit from detailed technique explanations and gear recommendations. `;
    
    return intro;
  }

  private generateLocationAnalysis(location: string, locationKnowledge: any, conditions: any): string {
    let analysis = `🗺️ LOCATION ANALYSIS: ${location.toUpperCase()}
═══════════════════════════════════════════════════════════════
`;

    if (locationKnowledge) {
      analysis += `LOCATION CHARACTERISTICS:
• ${locationKnowledge.characteristics}

PRIMARY SPECIES FOUND:
${locationKnowledge.species.map((spec: string) => `• ${spec}`).join('\n')}

BEST ACCESS POINTS:
${locationKnowledge.bestAccess.map((access: string) => `• ${access}`).join('\n')}

TIDAL INFLUENCE:
• ${locationKnowledge.tides}

STRUCTURE & BOTTOM:
• ${locationKnowledge.structure}
`;
    } else {
      analysis += `This location offers diverse fishing opportunities. Based on current conditions and seasonal patterns, here's what you can expect:

CURRENT CONDITIONS IMPACT:
• Water temperature: ${conditions.waterConditions.waterTemp}°F
• Water clarity: ${conditions.waterConditions.clarity}
• Current strength: ${conditions.waterConditions.current}
• Salinity: ${conditions.waterConditions.salinity} ppt

These conditions will influence fish behavior and your approach strategy.
`;
    }

    analysis += `
LOCAL KNOWLEDGE TIPS:
${locationKnowledge?.tips?.map((tip: string) => `• ${tip}`).join('\n') || '• Check local bait shops for current conditions\n• Join Rhode Island fishing forums for real-time reports\n• Be aware of seasonal access restrictions'}
`;

    return analysis;
  }

  private generateSpeciesAnalysis(species: string, speciesKnowledge: any, season: string, conditions: any): string {
    let analysis = `🐟 SPECIES BEHAVIOR ANALYSIS: ${species.toUpperCase()}
═══════════════════════════════════════════════════════════════
`;

    if (speciesKnowledge) {
      analysis += `CURRENT BEHAVIOR PATTERNS:
• ${speciesKnowledge.behavior}

PRIME LOCATIONS:
${speciesKnowledge.hotspots.map((spot: string) => `• ${spot}`).join('\n')}

RECOMMENDED TECHNIQUES:
${speciesKnowledge.techniques.map((tech: string) => `• ${tech}`).join('\n')}

SPECIAL NOTES:
• ${speciesKnowledge.notes}
`;
    } else {
      analysis += `Based on Rhode Island fishing patterns and current conditions, here's what you need to know about ${species}:

SEASONAL BEHAVIOR (${season.toUpperCase()}):
• Fish are ${this.getSeasonalBehavior(species, season)}
• Optimal water temperature range: ${this.getOptimalWaterTemp(species)}
• Feeding patterns: ${this.getFeedingPatterns(species, season)}
• Preferred habitat: ${this.getPreferredHabitat(species)}
`;
    }

    analysis += `
SIZE EXPECTATIONS:
${this.getSizeExpectations(species, season)}

CURRENT CONDITIONS IMPACT:
• Water temperature (${conditions.waterConditions.waterTemp}°F): ${this.getWaterTempImpact(species, conditions.waterConditions.waterTemp)}
• Water clarity (${conditions.waterConditions.clarity}): ${this.getClarityImpact(species, conditions.waterConditions.clarity)}
• Current conditions: ${this.getCurrentImpact(species, conditions.waterConditions.current)}
`;

    return analysis;
  }

  private generateCurrentConditionsAnalysis(conditions: any, season: string): string {
    return `🌤️ CURRENT CONDITIONS ANALYSIS
═══════════════════════════════════════════════════════════════
WEATHER IMPACT ON FISHING:
• Temperature: ${conditions.weather.temperature}°F - ${this.getTemperatureImpact(conditions.weather.temperature, season)}
• Wind: ${conditions.weather.windSpeed} mph ${conditions.weather.windDirection} - ${this.getWindImpact(conditions.weather.windSpeed)}
• Barometric Pressure: ${conditions.weather.pressure} inHg - ${this.getPressureImpact(conditions.weather.pressure)}
• Conditions: ${conditions.weather.conditions} - ${this.getWeatherConditionsImpact(conditions.weather.conditions)}

WATER CONDITIONS:
• Water Temperature: ${conditions.waterConditions.waterTemp}°F
• Clarity: ${conditions.waterConditions.clarity}
• Oxygen Levels: ${conditions.waterConditions.oxygen}
• Current: ${conditions.waterConditions.current}

TIDE INFORMATION:
• Current Tide: ${conditions.tides.current}
• Tide Height: ${conditions.tides.height} ft
• Next Change: ${conditions.tides.nextChange}

OPTIMAL TIMING:
${this.getOptimalTimingAdvice(conditions, season)}
`;
  }

  private generatePersonalizedStrategy(scenario: FishingScenario, speciesKnowledge: any, locationKnowledge: any, conditions: any, experience: string): string {
    const { context } = scenario;
    const species = context.fishSpecies || 'Multiple species';
    
    return `🎯 PERSONALIZED STRATEGY FOR ${context.experience?.toUpperCase() || 'INTERMEDIATE'} ANGLER
═══════════════════════════════════════════════════════════════
Based on your experience level and current conditions, here's your customized approach:

APPROACH STRATEGY:
${this.getExperienceBasedStrategy(experience, species, conditions)}

TACTICAL PRIORITIES:
1. ${this.getPrimaryTactic(species, conditions)}
2. ${this.getSecondaryTactic(species, conditions)}
3. ${this.getBackupTactic(species, conditions)}

SUCCESS FACTORS:
• Focus on ${this.getKeySuccessFactor(species, conditions)}
• Pay attention to ${this.getKeyAttentionPoint(species, conditions)}
• Be patient with ${this.getPatienceRequirement(species, conditions)}

AVOID THESE MISTAKES:
${this.getCommonMistakes(experience, species).map(mistake => `• ${mistake}`).join('\n')}

PROGRESSION PLAN:
${this.getProgressionPlan(experience, species, conditions)}
`;
  }

  private generateDetailedTechniquesGuide(species: string, speciesKnowledge: any, conditions: any): string {
    return `🎣 DETAILED TECHNIQUES GUIDE
═══════════════════════════════════════════════════════════════
${this.getDetailedTechniques(species, speciesKnowledge, conditions)}
`;
  }

  private generateGearRecommendations(species: string, location: string, conditions: any): string {
    return `🎒 GEAR RECOMMENDATIONS
═══════════════════════════════════════════════════════════════
${this.getDetailedGearRecommendations(species, location, conditions)}
`;
  }

  private generateSafetyAndRegulationsAdvice(location: string, species: string): string {
    return `⚠️ SAFETY & REGULATIONS
═══════════════════════════════════════════════════════════════
${this.getSafetyAndRegulations(location, species)}
`;
  }

  private generateLocalInsights(location: string, locationKnowledge: any): string {
    return `💡 LOCAL EXPERT INSIGHTS
═══════════════════════════════════════════════════════════════
${this.getLocalInsights(location, locationKnowledge)}
`;
  }

  private generateSuccessTips(experience: string, species: string, season: string): string {
    return `🏆 SUCCESS TIPS & TRICKS
═══════════════════════════════════════════════════════════════
${this.getSuccessTips(experience, species, season)}
`;
  }

  private generateFinalThoughts(location: string, species: string, season: string, conditions: any): string {
    return `Your fishing success at ${location} targeting ${species} during ${season} season depends on understanding the current conditions and adapting your approach accordingly.

With water temperature at ${conditions.waterConditions.waterTemp}°F and ${conditions.weather.conditions} conditions, the fish are likely ${this.getFishBehaviorPrediction(species, conditions)}. 

Remember: Rhode Island fishing is about patience, persistence, and paying attention to the details. The conditions change rapidly, so stay flexible with your approach and always prioritize safety.

Good luck, and may your next trip be your best one yet!`;
  }

  // Helper methods for detailed report generation
  private getRecommendationStrength(speciesKnowledge: any, locationKnowledge: any, conditions: any): string {
    const confidence = this.calculateConfidence(speciesKnowledge, locationKnowledge, conditions);
    if (confidence > 0.8) return 'EXCELLENT - High confidence recommendations';
    if (confidence > 0.6) return 'VERY GOOD - Strong recommendations';
    if (confidence > 0.4) return 'GOOD - Solid recommendations';
    return 'FAIR - General recommendations';
  }

  private getSeasonalBehavior(species: string, season: string): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('striped bass')) {
      if (season === 'spring') return 'migrating north and becoming very active';
      if (season === 'summer') return 'resident in bays and estuaries';
      if (season === 'fall') return 'feeding heavily before winter migration';
      return 'in deeper waters and less active';
    }
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      if (season === 'spring') return 'moving to shallow water for spawning';
      if (season === 'summer') return 'in deeper, cooler water';
      if (season === 'fall') return 'feeding heavily before winter';
      return 'in deep water and less active';
    }
    return 'following seasonal patterns';
  }

  private getOptimalWaterTemp(species: string): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('striped bass')) return '45-65°F';
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) return '55-75°F';
    if (speciesLower.includes('fluke')) return '55-70°F';
    if (speciesLower.includes('tautog')) return '50-65°F';
    return 'varies by species';
  }

  private getFeedingPatterns(species: string, season: string): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('striped bass')) {
      if (season === 'spring') return 'aggressive feeding during migration';
      if (season === 'summer') return 'early morning and evening feeding';
      if (season === 'fall') return 'all-day feeding frenzy';
      return 'minimal feeding activity';
    }
    return 'varies by season and conditions';
  }

  private getPreferredHabitat(species: string): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('striped bass')) return 'structure, drop-offs, and current breaks';
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) return 'weed beds, rocks, and structure';
    if (speciesLower.includes('fluke')) return 'sandy bottoms and drop-offs';
    if (speciesLower.includes('tautog')) return 'rocky structure and wrecks';
    return 'species-specific habitat preferences';
  }

  private getSizeExpectations(species: string, season: string): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('striped bass')) {
      if (season === 'fall') return '• 30-50+ inches (largest fish of the year)\n• Some trophy fish over 40 pounds possible';
      return '• 20-35 inches average\n• Some fish over 40 inches possible';
    }
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      return '• 2-6 pounds average\n• Some fish over 8 pounds possible';
    }
    return '• Varies by species and location\n• Check local reports for current sizes';
  }

  private getWaterTempImpact(species: string, temp: number): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('striped bass')) {
      if (temp < 50) return 'Fish are in deeper water and less active';
      if (temp > 70) return 'Fish are in cooler, deeper areas';
      return 'Optimal temperature range - fish are very active';
    }
    return 'Temperature affects fish activity and location';
  }

  private getClarityImpact(species: string, clarity: string): string {
    if (clarity === 'Excellent' || clarity === 'Good') return 'Fish can see lures clearly - use natural colors';
    if (clarity === 'Poor') return 'Use bright colors and noisy lures';
    return 'Adjust presentation based on visibility';
  }

  private getCurrentImpact(species: string, current: string): string {
    if (current === 'Strong') return 'Fish will be in current breaks and eddies';
    if (current === 'Weak') return 'Fish will be spread throughout the area';
    return 'Current affects fish positioning and feeding behavior';
  }

  private getTemperatureImpact(temp: number, season: string): string {
    if (season === 'winter') {
      if (temp > 40) return 'Warmer than usual - fish may be more active';
      return 'Cold conditions - fish in deep water';
    }
    if (temp > 80) return 'Hot conditions - fish seek cooler water';
    if (temp < 50) return 'Cool conditions - fish may be less active';
    return 'Comfortable conditions for fishing';
  }

  private getWindImpact(windSpeed: number): string {
    if (windSpeed < 5) return 'Calm conditions - excellent for fishing';
    if (windSpeed < 15) return 'Light winds - good fishing conditions';
    if (windSpeed < 25) return 'Moderate winds - fish windward shores';
    return 'Strong winds - consider sheltered areas';
  }

  private getPressureImpact(pressure: number): string {
    if (pressure > 30.2) return 'High pressure - stable conditions, good fishing';
    if (pressure < 29.8) return 'Low pressure - excellent fishing conditions';
    return 'Normal pressure - standard fishing conditions';
  }

  private getWeatherConditionsImpact(conditions: string): string {
    const conditionsLower = conditions.toLowerCase();
    if (conditionsLower.includes('cloudy') || conditionsLower.includes('overcast')) return 'Overcast skies - excellent fishing conditions';
    if (conditionsLower.includes('rain')) return 'Light rain can improve fishing';
    if (conditionsLower.includes('sunny')) return 'Bright sun - fish seek shade and deeper water';
    return 'Weather conditions affect fish behavior';
  }

  private getOptimalTimingAdvice(conditions: any, season: string): string {
    let advice = [];
    
    if (conditions.tides.current === 'Incoming') {
      advice.push('• Incoming tide brings bait and fish - prime time');
    } else if (conditions.tides.current === 'Outgoing') {
      advice.push('• Outgoing tide exposes structure - good for bottom fishing');
    }
    
    if (conditions.weather.windSpeed < 10) {
      advice.push('• Light winds - ideal conditions for most techniques');
    }
    
    if (conditions.weather.pressure < 29.8) {
      advice.push('• Low pressure system - excellent feeding conditions');
    }
    
    advice.push('• Early morning (6-8 AM) and evening (6-8 PM) are typically best');
    
    return advice.join('\n');
  }

  private getExperienceBasedStrategy(experience: string, species: string, conditions: any): string {
    if (experience === 'beginner') {
      return `Focus on simple, reliable techniques. Start with basic presentations and proven methods. Don't overcomplicate things - consistency is key for beginners.`;
    } else if (experience === 'intermediate') {
      return `Experiment with different techniques and presentations. Learn to read water conditions and adapt your approach accordingly.`;
    } else {
      return `Fine-tune your approach based on subtle changes in conditions. Use advanced techniques and experiment with new methods.`;
    }
  }

  private getPrimaryTactic(species: string, conditions: any): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('striped bass')) {
      if (conditions.waterConditions.waterTemp > 60) return 'Live lining with bunker or eels';
      return 'Casting with plugs or jigs';
    }
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      return 'Structure fishing with soft plastics';
    }
    return 'Target species-specific feeding patterns';
  }

  private getSecondaryTactic(species: string, conditions: any): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('striped bass')) {
      return 'Trolling with tube and worm rigs';
    }
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      return 'Topwater fishing during low light conditions';
    }
    return 'Alternative presentation techniques';
  }

  private getBackupTactic(species: string, conditions: any): string {
    return 'Bottom fishing with natural baits if other methods fail';
  }

  private getKeySuccessFactor(species: string, conditions: any): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('striped bass')) return 'tide timing and current breaks';
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) return 'structure and cover';
    if (speciesLower.includes('fluke')) return 'sandy bottom areas and slow presentations';
    return 'species-specific feeding patterns';
  }

  private getKeyAttentionPoint(species: string, conditions: any): string {
    return 'water temperature changes and fish movement patterns';
  }

  private getPatienceRequirement(species: string, conditions: any): string {
    const speciesLower = species.toLowerCase();
    if (speciesLower.includes('fluke')) return 'slow presentations and waiting for bites';
    if (speciesLower.includes('tautog')) return 'bottom fishing and structure work';
    return 'fish behavior and feeding cycles';
  }

  private getCommonMistakes(experience: string, species: string): string[] {
    const mistakes = [];
    
    if (experience === 'beginner') {
      mistakes.push('Moving too quickly between spots');
      mistakes.push('Using tackle that\'s too heavy');
      mistakes.push('Not checking regulations and size limits');
    } else if (experience === 'intermediate') {
      mistakes.push('Overthinking the approach');
      mistakes.push('Not adapting to changing conditions');
      mistakes.push('Ignoring tide and weather factors');
    } else {
      mistakes.push('Being too confident and ignoring basics');
      mistakes.push('Not keeping detailed fishing logs');
    }
    
    return mistakes;
  }

  private getProgressionPlan(experience: string, species: string, conditions: any): string {
    if (experience === 'beginner') {
      return `Start with basic techniques and build confidence. Focus on one species and one location until you're comfortable, then expand your approach.`;
    } else if (experience === 'intermediate') {
      return `Continue learning advanced techniques and reading water conditions. Start experimenting with different presentations and locations.`;
    } else {
      return `Fine-tune your approach and mentor other anglers. Share your knowledge and continue learning about Rhode Island fishing patterns.`;
    }
  }

  private getDetailedTechniques(species: string, speciesKnowledge: any, conditions: any): string {
    const speciesLower = species.toLowerCase();
    
    if (speciesLower.includes('striped bass')) {
      return `LIVE LINING TECHNIQUE:
• Use 20-30lb braided line with 40-60lb leader
• Hook live bunker through the nose or back
• Drift with current or anchor in current break
• Let fish take bait freely before setting hook

CASTING TECHNIQUE:
• Use 7-8' medium-heavy rod with 4000-6000 reel
• Cast plugs or jigs to structure and current breaks
• Vary retrieve speed based on fish activity
• Focus on dawn and dusk periods

TROLLING TECHNIQUE:
• Use tube and worm rigs behind boat
• Troll at 2-4 knots in current breaks
• Vary depth with different weights
• Cover large areas systematically`;
    }
    
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      return `STRUCTURE FISHING:
• Cast to weed beds, rocks, and drop-offs
• Use soft plastics with appropriate weights
• Vary presentation speed and depth
• Be patient - fish may need multiple presentations

TOPWATER FISHING:
• Best during early morning and evening
• Use poppers, buzzbaits, or frogs
• Work lures slowly with pauses
• Watch for surface strikes

JIGGING TECHNIQUE:
• Use jigs with soft plastic trailers
• Work bottom structure methodically
• Vary jigging motion and speed
• Feel for subtle bites`;
    }
    
    return `SPECIES-SPECIFIC TECHNIQUES:
• Research target species behavior patterns
• Adapt techniques to current conditions
• Use appropriate tackle for species size
• Practice proper catch and release methods`;
  }

  private getDetailedGearRecommendations(species: string, location: string, conditions: any): string {
    const speciesLower = species.toLowerCase();
    const locationLower = location.toLowerCase();
    
    if (speciesLower.includes('striped bass')) {
      return `ROD & REEL SETUP:
• Rod: 7-8' medium-heavy spinning or conventional
• Reel: 4000-6000 size spinning or 4/0-6/0 conventional
• Line: 20-30lb braided line with 40-60lb fluorocarbon leader

TERMINAL TACKLE:
• Hooks: 2/0-4/0 circle hooks for live bait
• Sinkers: 1-4oz bank sinkers, egg sinkers
• Swivels: Ball bearing swivels to prevent line twist
• Leaders: 40-60lb fluorocarbon or monofilament

LURES & BAIT:
• Topwater: Poppers, walking baits
• Subsurface: Swimbaits, jerkbaits
• Bottom: Bucktail jigs, soft plastics
• Live Bait: Bunker, eels, killifish`;
    }
    
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      return `ROD & REEL SETUP:
• Rod: 6'6"-7' medium spinning rod
• Reel: 2500-3000 size spinning reel
• Line: 10-15lb braided line with 12-17lb fluorocarbon leader

TERMINAL TACKLE:
• Hooks: 2/0-4/0 worm hooks, 1/0-2/0 jig hooks
• Weights: 1/4-1/2oz bullet weights, jig heads
• Swivels: Small barrel swivels
• Leaders: 12-17lb fluorocarbon

LURES & BAIT:
• Soft Plastics: Worms, creature baits, swimbaits
• Hard Baits: Crankbaits, spinnerbaits, topwater
• Jigs: Football jigs, flipping jigs
• Live Bait: Worms, minnows, crayfish`;
    }
    
    return `GENERAL GEAR RECOMMENDATIONS:
• Choose tackle appropriate for target species size
• Match rod power to fishing technique
• Use quality line and terminal tackle
• Keep backup gear for different conditions`;
  }

  private getSafetyAndRegulations(location: string, species: string): string {
    const locationLower = location.toLowerCase();
    const speciesLower = species.toLowerCase();
    
    let regulations = `SAFETY FIRST:
• Always wear a life jacket when on water
• Check weather conditions before heading out
• Tell someone your fishing plans and expected return time
• Carry safety equipment and first aid kit
• Be aware of boat traffic and navigation rules

REGULATIONS - ${species.toUpperCase()}:`;

    if (speciesLower.includes('striped bass')) {
      regulations += `
• Size Limit: 28" minimum
• Bag Limit: 1 fish per day
• Season: May 1 - December 31
• License: Saltwater fishing license required`;
    } else if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      regulations += `
• Size Limit: 12" minimum
• Bag Limit: 5 fish per day
• Season: Year-round
• License: Freshwater fishing license required`;
    } else if (speciesLower.includes('fluke')) {
      regulations += `
• Size Limit: 18" minimum
• Bag Limit: 4 fish per day
• Season: May 1 - September 30
• License: Saltwater fishing license required`;
    }

    regulations += `

GENERAL REGULATIONS:
• Always check current regulations before fishing
• Regulations can change seasonally
• RI DEM website has most current information
• Practice catch and release when appropriate`;

    return regulations;
  }

  private getLocalInsights(location: string, locationKnowledge: any): string {
    const locationLower = location.toLowerCase();
    
    if (locationLower.includes('rochambeau')) {
      return `LOCAL KNOWLEDGE - LOWER ROCHAMBEAU POND:
• Popular local spot - arrive early for parking
• Great shore access for families
• Consistent bass fishing year-round
• Check local bait shops for current conditions
• Join Rhode Island fishing forums for real-time reports
• Be respectful of other anglers and the environment`;
    }
    
    if (locationLower.includes('narragansett bay')) {
      return `LOCAL KNOWLEDGE - NARRAGANSETT BAY:
• Strong tidal influence affects fish behavior
• Multiple access points available
• Boat traffic considerations
• Check tide charts for optimal timing
• Local charter captains have best current information
• Weather can change quickly - be prepared`;
    }
    
    if (locationLower.includes('block island')) {
      return `LOCAL KNOWLEDGE - BLOCK ISLAND:
• Ferry access required - plan ahead
• Limited parking on island
• Charter boats available for offshore fishing
• Weather dependent - check conditions
• World-class fishing but requires planning
• Local knowledge is invaluable`;
    }
    
    return `LOCAL INSIGHTS:
• Check local bait shops for current conditions
• Join Rhode Island fishing forums for real-time reports
• Talk to local anglers for tips and techniques
• Be aware of seasonal access restrictions
• Respect the environment and other anglers`;
  }

  private getSuccessTips(experience: string, species: string, season: string): string {
    const speciesLower = species.toLowerCase();
    
    let tips = `SUCCESS TIPS FOR ${experience.toUpperCase()} ANGLERS:

GENERAL TIPS:
• Be patient and persistent
• Learn to read water conditions
• Keep detailed fishing logs
• Practice proper catch and release
• Stay flexible with your approach

SEASONAL TIPS - ${season.toUpperCase()}:`;

    if (season === 'spring') {
      tips += `
• Fish are becoming more active
• Focus on warming water areas
• Use smaller presentations initially
• Watch for spawning behavior`;
    } else if (season === 'summer') {
      tips += `
• Early morning and evening are best
• Fish seek cooler, deeper water
• Stay hydrated and use sun protection
• Watch for feeding activity`;
    } else if (season === 'fall') {
      tips += `
• Fish are feeding heavily
• Largest fish of the year possible
• Weather changes trigger activity
• All-day fishing opportunities`;
    } else {
      tips += `
• Fish are in deeper water
• Slow presentations required
• Focus on structure
• Cold weather requires patience`;
    }

    if (speciesLower.includes('striped bass')) {
      tips += `

STRIPED BASS SPECIFIC TIPS:
• Tide timing is crucial
• Structure and current breaks are key
• Live bait often outproduces lures
• Big fish often come at night`;
    }

    return tips;
  }

  private getFishBehaviorPrediction(species: string, conditions: any): string {
    const speciesLower = species.toLowerCase();
    const temp = conditions.waterConditions.waterTemp;
    
    if (speciesLower.includes('striped bass')) {
      if (temp > 60) return 'very active and feeding aggressively';
      if (temp > 50) return 'active and following bait schools';
      return 'in deeper water and less active';
    }
    
    if (speciesLower.includes('bass') && !speciesLower.includes('sea')) {
      if (temp > 70) return 'seeking cooler, deeper water';
      if (temp > 60) return 'active and feeding well';
      return 'slower and more selective';
    }
    
    return 'following seasonal patterns and current conditions';
  }

  private generateRuleBasedReport(location: string, date: string): string {
    const season = this.getSeason(date);
    const isNorthernRI = this.isNorthernRILocation(location);
    
    let report = `Rhode Island Fishing Report - ${location}
Date: ${date}
Season: ${season}

CURRENT CONDITIONS:
${this.getCurrentConditions(location, season)}

WATER CONDITIONS:
${this.getWaterConditions(location, season)}

SPECIES ACTIVITY:
${this.getSpeciesActivity(location, season)}

BEST TECHNIQUES:
${this.getBestTechniques(location, season)}

RECOMMENDED GEAR:
${this.getRecommendedGear(location, season)}

LOCAL TIPS:
${this.getLocalTips(location, isNorthernRI)}

REGULATIONS REMINDER:
${this.getRegulationsReminder(location)}

WEATHER OUTLOOK:
${this.getWeatherOutlook(season)}

TIDE INFORMATION:
${this.getTideInformation(location)}

FISHING FORECAST:
${this.getFishingForecast(location, season)}

Good luck and tight lines!`;

    return report;
  }

  private getSeason(date: string): string {
    const month = new Date(date).getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Fall';
    return 'Winter';
  }

  private isNorthernRILocation(location: string): boolean {
    const northernLocations = [
      'lower rochambeau pond', 'upper rochambeau pond', 'wallum lake', 'pascoag reservoir',
      'chepachet river', 'blackstone river', 'george washington memorial', 'tucker pond', 'stump pond',
      'meshanticut lake', 'scituate reservoir', 'johnson pond', 'spring grove pond', 'barden reservoir',
      'tarkiln pond', 'brown pond', 'white pond', 'cumberland pond', 'pawtuxet river', 'hunt river',
      'moshassuck river', 'wanskuck river', 'north east pond', 'south east pond', 'burrillville ponds',
      'glocester ponds', 'foster ponds', 'scituate ponds', 'west greenwich ponds', 'lincoln', 'cumberland',
      'burrillville', 'glocester', 'foster', 'scituate', 'johnston', 'cranston', 'pawtucket', 'central falls',
      'woonsocket', 'north providence', 'north smithfield', 'smithfield'
    ];
    return northernLocations.some(loc => location.toLowerCase().includes(loc));
  }

  private getCurrentConditions(location: string, season: string): string {
    const conditions = {
      Spring: '- Water temperature: 45-55°F\n- Weather: Variable with warming trends\n- Barometric pressure: Rising\n- Wind: Light to moderate',
      Summer: '- Water temperature: 65-75°F\n- Weather: Warm and humid\n- Barometric pressure: Stable\n- Wind: Light sea breezes',
      Fall: '- Water temperature: 55-65°F\n- Weather: Cool and crisp\n- Barometric pressure: Falling\n- Wind: Variable with storms',
      Winter: '- Water temperature: 35-45°F\n- Weather: Cold and clear\n- Barometric pressure: High and stable\n- Wind: Light to moderate'
    };
    return conditions[season as keyof typeof conditions] || conditions.Spring;
  }

  private getWaterConditions(location: string, season: string): string {
    if (this.isNorthernRILocation(location)) {
      return '- Freshwater conditions\n- Clear to slightly stained\n- Normal water levels\n- Good oxygen content\n- Minimal current';
    } else {
      return '- Saltwater conditions\n- Clear to moderately stained\n- Normal tidal flow\n- Good oxygen content\n- Strong tidal influence';
    }
  }

  private getSpeciesActivity(location: string, season: string): string {
    if (this.isNorthernRILocation(location)) {
      return this.getFreshwaterSpeciesActivity(season);
    } else {
      return this.getSaltwaterSpeciesActivity(season);
    }
  }

  private getFreshwaterSpeciesActivity(season: string): string {
    const activities = {
      Spring: '- Largemouth Bass: Excellent pre-spawn activity\n- Smallmouth Bass: Active in deeper water\n- Chain Pickerel: Aggressive feeding\n- Trout: Stocked fish very active\n- Panfish: Beginning to spawn',
      Summer: '- Largemouth Bass: Good early morning action\n- Smallmouth Bass: Deep water fishing\n- Chain Pickerel: Steady action\n- Trout: Seek deeper, cooler water\n- Panfish: Excellent numbers',
      Fall: '- Largemouth Bass: Feeding heavily for winter\n- Smallmouth Bass: Active in shallow water\n- Chain Pickerel: Aggressive fall feeding\n- Trout: Good action in cooler water\n- Panfish: Still active',
      Winter: '- Largemouth Bass: Slow, deep water fishing\n- Smallmouth Bass: Very slow activity\n- Chain Pickerel: Occasional action\n- Trout: Limited activity\n- Panfish: Minimal activity'
    };
    return activities[season as keyof typeof activities] || activities.Spring;
  }

  private getSaltwaterSpeciesActivity(season: string): string {
    const activities = {
      Spring: '- Striped Bass: Spring migration begins\n- Fluke: Season opens in May\n- Bluefish: Arriving with warm water\n- Tautog: Still active from winter\n- Scup: Excellent numbers',
      Summer: '- Striped Bass: Peak summer fishing\n- Fluke: Excellent action\n- Bluefish: Aggressive feeding\n- Tautog: Slower activity\n- Scup: Very good numbers',
      Fall: '- Striped Bass: Fall migration peak\n- Fluke: Good action continues\n- Bluefish: Excellent fishing\n- Tautog: Becoming more active\n- Scup: Still good numbers',
      Winter: '- Striped Bass: Limited activity\n- Fluke: Season closed\n- Bluefish: Gone south\n- Tautog: Prime winter fishing\n- Scup: Limited activity'
    };
    return activities[season as keyof typeof activities] || activities.Spring;
  }

  private getBestTechniques(location: string, season: string): string {
    if (this.isNorthernRILocation(location)) {
      return '- Casting plastic worms and jigs for bass\n- Drift fishing with live bait for trout\n- Still fishing with worms for panfish\n- Topwater fishing during early morning\n- Jigging for pickerel';
    } else {
      return '- Live lining bunker for stripers\n- Drifting bucktail jigs for fluke\n- Casting topwater plugs for bluefish\n- Bottom fishing with crabs for tautog\n- Sabiki rigs for scup';
    }
  }

  private getRecommendedGear(location: string, season: string): string {
    if (this.isNorthernRILocation(location)) {
      return '- 6-7\' medium action spinning rod\n- 10-15lb monofilament or braided line\n- Assorted hooks and sinkers\n- Live bait bucket\n- Landing net';
    } else {
      return '- 7-8\' medium-heavy spinning rod\n- 20-30lb braided line with 40-60lb leader\n- Circle hooks for live bait\n- Bucktail jigs 1-4oz\n- Live bait rigs';
    }
  }

  private getLocalTips(location: string, isNorthernRI: boolean): string {
    if (isNorthernRI) {
      return '- Arrive early for best parking at popular spots\n- Check local regulations for specific ponds\n- Many ponds have no motor restrictions\n- Bring bug spray during summer months\n- Respect private property boundaries';
    } else {
      return '- Check tide charts before heading out\n- Early morning and late evening are prime times\n- Bring multiple tackle options\n- Be aware of boat traffic in busy areas\n- Check weather and sea conditions';
    }
  }

  private getRegulationsReminder(location: string): string {
    return '- Always check current RI DEM regulations\n- Respect size and bag limits\n- Practice catch and release when possible\n- Have valid fishing license\n- Follow local area restrictions';
  }

  private getWeatherOutlook(season: string): string {
    const outlooks = {
      Spring: 'Variable weather with warming trends. Watch for sudden changes.',
      Summer: 'Stable warm weather. Early morning and evening best for comfort.',
      Fall: 'Cool, crisp weather. Can be unpredictable with storms.',
      Winter: 'Cold but stable weather. Dress warmly and check conditions.'
    };
    return outlooks[season as keyof typeof outlooks] || outlooks.Spring;
  }

  private getTideInformation(location: string): string {
    if (this.isNorthernRILocation(location)) {
      return 'Freshwater - no tidal influence. Focus on weather and time of day.';
    } else {
      return 'Check local tide charts. Incoming and outgoing tides both productive.';
    }
  }

  private getFishingForecast(location: string, season: string): string {
    const forecasts = {
      Spring: 'Excellent fishing conditions as fish become more active with warming water.',
      Summer: 'Good fishing with early morning and evening being most productive.',
      Fall: 'Prime fishing season as fish feed heavily before winter.',
      Winter: 'Challenging but rewarding fishing for dedicated anglers.'
    };
    return forecasts[season as keyof typeof forecasts] || forecasts.Spring;
  }
}
