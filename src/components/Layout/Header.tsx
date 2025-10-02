import { MapPin, Fish, Brain, BarChart3, Wrench, BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-700/95 backdrop-blur-sm text-white shadow-xl border-b border-white/20" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Fish className="h-8 w-8 text-blue-200" suppressHydrationWarning />
            <div>
              <h1 className="text-2xl font-bold" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>Rhode Island Fishing Guide</h1>
              <p className="text-blue-100 text-sm" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Advanced AI-Powered Fishing Assistant</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="flex items-center space-x-2 hover:text-blue-100 transition-colors px-3 py-2 rounded-lg hover:bg-white/10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
              <MapPin className="h-5 w-5" suppressHydrationWarning />
              <span>Home</span>
            </a>
            <a href="/fish-species" className="flex items-center space-x-2 hover:text-blue-100 transition-colors px-3 py-2 rounded-lg hover:bg-white/10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
              <Fish className="h-5 w-5" suppressHydrationWarning />
              <span>Fish Species</span>
            </a>
            <a href="/ai-recommendations" className="flex items-center space-x-2 hover:text-blue-100 transition-colors px-3 py-2 rounded-lg hover:bg-white/10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
              <Brain className="h-5 w-5" suppressHydrationWarning />
              <span>AI Recommendations</span>
            </a>
            <a href="/reports" className="flex items-center space-x-2 hover:text-blue-100 transition-colors px-3 py-2 rounded-lg hover:bg-white/10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
              <BarChart3 className="h-5 w-5" suppressHydrationWarning />
              <span>Reports</span>
            </a>
            <a href="/gear" className="flex items-center space-x-2 hover:text-blue-100 transition-colors px-3 py-2 rounded-lg hover:bg-white/10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
              <Wrench className="h-5 w-5" suppressHydrationWarning />
              <span>Gear</span>
            </a>
            <a href="/journal" className="flex items-center space-x-2 hover:text-blue-100 transition-colors px-3 py-2 rounded-lg hover:bg-white/10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
              <BookOpen className="h-5 w-5" suppressHydrationWarning />
              <span>Journal</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
