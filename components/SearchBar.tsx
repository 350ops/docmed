
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, History, TrendingUp, X } from 'lucide-react';
import { SPECIALTIES } from '../constants';

interface SearchBarProps {
  onSearch: (specialty: string, location: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const history = localStorage.getItem('search_history');
    if (history) {
      setRecentSearches(JSON.parse(history).slice(0, 3));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveToHistory = (term: string) => {
    if (!term.trim()) return;
    const history = JSON.parse(localStorage.getItem('search_history') || '[]');
    const newHistory = [term, ...history.filter((t: string) => t !== term)].slice(0, 5);
    localStorage.setItem('search_history', JSON.stringify(newHistory));
    setRecentSearches(newHistory.slice(0, 3));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch(specialty, location);
    saveToHistory(specialty);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (term: string) => {
    setSpecialty(term);
    onSearch(term, location);
    saveToHistory(term);
    setShowSuggestions(false);
  };

  const filteredSuggestions = SPECIALTIES.filter(s =>
    s.toLowerCase().includes(specialty.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto relative" ref={dropdownRef}>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-visible p-2 gap-2 relative z-20 border border-gray-100"
      >
        <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-xl border border-transparent focus-within:border-doctoralia-teal focus-within:bg-white transition-all group">
          <Search className="text-gray-400 w-5 h-5 mr-3 group-focus-within:text-doctoralia-teal" />
          <input
            type="text"
            placeholder="Especialidad, médico, centro..."
            className="w-full py-4 bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-400"
            value={specialty}
            onChange={(e) => {
              setSpecialty(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {specialty && (
            <button 
              type="button" 
              onClick={() => setSpecialty('')}
              className="p-1 hover:bg-gray-200 rounded-full text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="hidden md:flex w-px h-10 bg-gray-200 self-center"></div>

        <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-xl border border-transparent focus-within:border-doctoralia-teal focus-within:bg-white transition-all group">
          <MapPin className="text-gray-400 w-5 h-5 mr-3 group-focus-within:text-doctoralia-teal" />
          <input
            type="text"
            placeholder="Ciudad, código postal..."
            className="w-full py-4 bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-doctoralia-teal hover:bg-[#00af94] text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-w-[140px] shadow-lg shadow-teal-100 active:scale-95"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Buscar'}
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (specialty.length > 0 || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 w-full md:w-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-30 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {specialty.length === 0 && recentSearches.length > 0 && (
              <div className="mb-2">
                <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <History className="w-3 h-3" /> Búsquedas recientes
                </div>
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSuggestionClick(term)}
                    className="w-full text-left px-4 py-3 hover:bg-teal-50 flex items-center gap-3 transition-colors group"
                  >
                    <History className="w-4 h-4 text-gray-300 group-hover:text-doctoralia-teal" />
                    <span className="text-gray-700 font-medium">{term}</span>
                  </button>
                ))}
              </div>
            )}

            {specialty.length > 0 && (
              <div>
                <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> Sugerencias
                </div>
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((term, i) => {
                    const index = term.toLowerCase().indexOf(specialty.toLowerCase());
                    const before = term.substring(0, index);
                    const match = term.substring(index, index + specialty.length);
                    const after = term.substring(index + specialty.length);

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSuggestionClick(term)}
                        className="w-full text-left px-4 py-3 hover:bg-teal-50 flex items-center gap-3 transition-colors group border-b border-gray-50 last:border-none"
                      >
                        <Search className="w-4 h-4 text-gray-300 group-hover:text-doctoralia-teal" />
                        <span className="text-gray-700 font-medium">
                          {before}
                          <span className="text-doctoralia-teal font-bold">{match}</span>
                          {after}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-4 text-sm text-gray-500 italic">
                    No hay sugerencias para "{specialty}"
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-3 flex items-center justify-between border-t border-gray-100">
             <span className="text-[10px] text-gray-400 font-bold uppercase">DoctorConnect Sugiere</span>
             <TrendingUp className="w-3 h-3 text-doctoralia-teal" />
          </div>
        </div>
      )}
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-gray-500 text-sm py-1 font-medium">Sugerencias:</span>
        {SPECIALTIES.slice(0, 4).map(s => (
          <button 
            key={s} 
            type="button"
            onClick={() => handleSuggestionClick(s)}
            className="bg-white border border-gray-200 text-gray-600 text-xs font-bold hover:border-doctoralia-teal hover:text-doctoralia-teal px-3 py-1.5 rounded-full transition-all shadow-sm active:scale-95"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
