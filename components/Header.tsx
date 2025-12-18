
import React from 'react';
import { User, Menu, Search, Calendar, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-doctoralia-teal rounded-lg flex items-center justify-center">
                <Search className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                doctor<span className="text-doctoralia-teal">connect</span>
              </span>
            </a>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-doctoralia-teal font-medium">Especialidades</a>
              <a href="#" className="text-gray-600 hover:text-doctoralia-teal font-medium">Enfermedades</a>
              <a href="#" className="text-gray-600 hover:text-doctoralia-teal font-medium flex items-center gap-1">
                Seguros <ChevronDown className="w-4 h-4" />
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden lg:block text-doctoralia-teal font-semibold hover:bg-teal-50 px-4 py-2 rounded-lg transition">
              Para clínicas y centros
            </button>
            <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>
            <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-doctoralia-teal transition">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Iniciar sesión</span>
            </button>
            <button className="md:hidden p-2 text-gray-500">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
