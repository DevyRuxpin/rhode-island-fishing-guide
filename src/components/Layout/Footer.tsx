import { Heart, MapPin, Fish } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8" suppressHydrationWarning>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Fish className="h-6 w-6 text-blue-400" suppressHydrationWarning />
              <h3 className="text-lg font-semibold">Rhode Island Fishing Guide</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your comprehensive AI-powered fishing assistant for Rhode Island waters. 
              Built with real data and advanced AI to improve your fishing success.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/fish-species" className="hover:text-blue-400 transition-colors">Fish Species</a></li>
              <li><a href="/ai-recommendations" className="hover:text-blue-400 transition-colors">AI Recommendations</a></li>
              <li><a href="/journal" className="hover:text-blue-400 transition-colors">Fishing Journal</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Data Sources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a 
                  href="https://dem.ri.gov/marine-fisheries" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  RI DEM Marine Fisheries
                </a>
              </li>
              <li>
                <a 
                  href="https://www.weather.gov/box/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  NOAA Weather Data
                </a>
              </li>
              <li>
                <a 
                  href="https://waterdata.usgs.gov/ri/nwis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  USGS Water Data
                </a>
              </li>
              <li>
                <a 
                  href="https://www.onthewater.com/fishing-reports/rhode-island" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Local Fishing Reports
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 Rhode Island Fishing Guide. Built with ❤️ for fishing enthusiasts by Kali Consulting LLC
          </p>
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="h-4 w-4" suppressHydrationWarning />
            <span className="text-sm">Rhode Island, USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
