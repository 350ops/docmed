
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DoctorCard from './components/DoctorCard';
import Filters from './components/Filters';
import DocBot from './components/DocBot';
import { MOCK_DOCTORS } from './constants';
import { Doctor } from './types';
import { Search, Heart, Shield, Globe, CheckCircle, Info } from 'lucide-react';

const App: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [searchQuery, setSearchQuery] = useState({ specialty: '', location: '' });
  const [isSearching, setIsSearching] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);

  // Attempt to get user location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we'd reverse geocode here. 
          // For the replica, we'll just log it or set a placeholder.
          console.log("Location found:", position.coords.latitude, position.coords.longitude);
          setUserLocation("Cerca de ti");
        },
        (error) => {
          console.log("Location access denied or unavailable.");
        }
      );
    }
  }, []);

  const handleSearch = (specialty: string, location: string) => {
    setIsSearching(true);
    setSearchQuery({ specialty, location });
    
    // Simulate API delay to feel like a real search
    setTimeout(() => {
      const results = MOCK_DOCTORS.filter(doc => {
        const matchesSpecialty = !specialty || 
          doc.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
          doc.name.toLowerCase().includes(specialty.toLowerCase()) ||
          doc.bio.toLowerCase().includes(specialty.toLowerCase());
          
        const matchesLocation = !location || 
          doc.location.toLowerCase().includes(location.toLowerCase()) ||
          doc.city.toLowerCase().includes(location.toLowerCase()) ||
          doc.address.toLowerCase().includes(location.toLowerCase());
          
        return matchesSpecialty && matchesLocation;
      });
      
      setFilteredDoctors(results);
      setIsSearching(false);
      
      // Smooth scroll to results
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 600);
  };

  const handleBook = (doctorId: string, slot: string) => {
    const doc = doctors.find(d => d.id === doctorId);
    if (!doc) return;
    
    const date = new Date(slot);
    const formatted = date.toLocaleString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setBookingSuccess(`¡Cita solicitada con ${doc.name} para el ${formatted}! Te hemos enviado un correo de confirmación.`);
    
    // Auto-hide success message
    setTimeout(() => setBookingSuccess(null), 6000);
  };

  const handleFilterChange = (filters: any) => {
    // Basic filtering logic for the replica
    if (filters.specialty && filters.specialty !== 'all') {
      const filtered = MOCK_DOCTORS.filter(d => d.specialty === filters.specialty);
      setFilteredDoctors(filtered);
    } else if (filters.specialty === 'all') {
      setFilteredDoctors(MOCK_DOCTORS);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-100 selection:text-teal-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#f0f9f8] to-white pt-16 pb-24 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Encuentra tu especialista y <br/>
            <span className="text-doctoralia-teal">pide cita de forma gratuita</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Más de 120.000 profesionales de la salud están listos para ayudarte. Opiniones reales, reservas 24/7.
          </p>
          
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-500 font-medium">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-gray-100 shadow-sm">
              <Shield className="w-4 h-4 text-doctoralia-teal" />
              <span className="text-sm">Privacidad 100% segura</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-gray-100 shadow-sm">
              <Heart className="w-4 h-4 text-doctoralia-teal" />
              <span className="text-sm">Opiniones verificadas</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-gray-100 shadow-sm">
              <Globe className="w-4 h-4 text-doctoralia-teal" />
              <span className="text-sm">Atención presencial u online</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Results Area */}
      <main id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {bookingSuccess && (
          <div className="mb-8 p-5 bg-teal-50 border border-teal-200 text-teal-900 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <CheckCircle className="w-6 h-6 text-doctoralia-teal" />
              </div>
              <div>
                <p className="font-bold text-lg">Reserva enviada</p>
                <p className="text-teal-700">{bookingSuccess}</p>
              </div>
            </div>
            <button onClick={() => setBookingSuccess(null)} className="text-teal-400 hover:text-teal-600 p-2 transition">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Side Filters */}
          <Filters onFilterChange={handleFilterChange} />

          {/* Doctors List */}
          <div className="flex-1">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {filteredDoctors.length} especialistas encontrados
                  {userLocation && <span className="text-sm font-normal text-doctoralia-teal bg-teal-50 px-2 py-0.5 rounded-full">{userLocation}</span>}
                </h2>
                <p className="text-gray-500 mt-1">
                  {(searchQuery.specialty || searchQuery.location) ? 
                    `Resultados para "${searchQuery.specialty || 'Especialistas'}" en ${searchQuery.location || 'toda España'}` : 
                    "Especialistas destacados para ti"}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm self-start sm:self-center">
                <span className="text-xs font-bold text-gray-400 px-3 uppercase tracking-wider">Ordenar:</span>
                <select className="text-sm font-semibold text-gray-700 outline-none bg-transparent pr-4 cursor-pointer">
                  <option>Relevancia</option>
                  <option>Mejor valorados</option>
                  <option>Más cercanos</option>
                  <option>Precio más bajo</option>
                </select>
              </div>
            </div>

            {isSearching ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-72 animate-pulse">
                    <div className="flex gap-8">
                      <div className="w-28 h-28 bg-gray-100 rounded-3xl"></div>
                      <div className="flex-1 space-y-4 pt-2">
                        <div className="h-7 bg-gray-100 rounded-lg w-1/2"></div>
                        <div className="h-5 bg-gray-100 rounded-lg w-1/4"></div>
                        <div className="h-24 bg-gray-50 rounded-2xl w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredDoctors.length > 0 ? (
              <div className="space-y-6">
                {filteredDoctors.map(doctor => (
                  <DoctorCard 
                    key={doctor.id} 
                    doctor={doctor} 
                    onBook={handleBook}
                  />
                ))}
                
                <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100 flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-teal-900 mb-2">¿No encuentras lo que buscas?</h3>
                    <p className="text-teal-700">Nuestro asistente de salud IA puede ayudarte a identificar qué tipo de especialista necesitas según tus síntomas.</p>
                  </div>
                  <button 
                    onClick={() => {
                      const chatBtn = document.querySelector('[data-docbot-trigger]') as HTMLButtonElement;
                      if (chatBtn) chatBtn.click();
                    }}
                    className="bg-doctoralia-teal text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-teal-200 hover:scale-105 transition-transform"
                  >
                    Hablar con DocBot
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-16 rounded-3xl text-center border border-gray-100 shadow-sm flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Vaya, no hemos encontrado resultados</h3>
                <p className="text-gray-500 mb-8 max-w-sm">Prueba a usar términos más generales o limpia los filtros para ver todos los especialistas disponibles.</p>
                <button 
                  onClick={() => handleSearch('', '')}
                  className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-800 transition"
                >
                  Ver todos los profesionales
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Value Prop Section */}
      <section className="bg-white py-24 border-t border-gray-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Salud de calidad al alcance de tu mano</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Únete a los millones de pacientes que confían en DoctorConnect para gestionar su bienestar.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group p-8 rounded-3xl hover:bg-teal-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-white text-doctoralia-teal rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-shadow">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4">Transparencia total</h4>
              <p className="text-gray-600 leading-relaxed">Consulta precios orientativos, experiencia profesional y lee opiniones reales de otros pacientes para elegir con total confianza.</p>
            </div>
            <div className="group p-8 rounded-3xl hover:bg-teal-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-white text-doctoralia-teal rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-shadow">
                <CalendarIcon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4">Reserva inmediata</h4>
              <p className="text-gray-600 leading-relaxed">Olvídate de las esperas al teléfono. Reserva tu cita en segundos, en cualquier momento y desde cualquier dispositivo.</p>
            </div>
            <div className="group p-8 rounded-3xl hover:bg-teal-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-white text-doctoralia-teal rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4">Seguridad garantizada</h4>
              <p className="text-gray-600 leading-relaxed">Tus datos están protegidos bajo los más altos estándares de seguridad. Solo tú y tu médico tenéis acceso a tu información.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App CTA */}
      <section className="bg-gray-900 py-16 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Gestiona tus citas desde la palma de tu mano</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Descarga nuestra App gratuita y lleva el control de tu salud allá donde vayas. Recibe recordatorios, gestiona recetas y contacta con tu médico.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition">
                <AppleIcon className="w-6 h-6" /> App Store
              </button>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition">
                <PlayStoreIcon className="w-6 h-6" /> Google Play
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
             <div className="relative">
                <div className="w-64 h-[450px] bg-gray-800 rounded-[3rem] border-[8px] border-gray-700 shadow-2xl relative z-10 overflow-hidden">
                   <div className="bg-doctoralia-teal h-24 w-full p-4 flex items-center justify-center">
                      <span className="text-xs font-bold">Mis Citas</span>
                   </div>
                   <div className="p-4 space-y-3">
                      <div className="bg-gray-700 h-16 rounded-xl animate-pulse"></div>
                      <div className="bg-gray-700 h-16 rounded-xl animate-pulse"></div>
                      <div className="bg-gray-700 h-16 rounded-xl animate-pulse"></div>
                   </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-doctoralia-teal rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-400 rounded-full blur-3xl opacity-20"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-doctoralia-teal rounded-xl flex items-center justify-center shadow-lg shadow-teal-100">
                  <Search className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-gray-900 tracking-tighter">
                  doctor<span className="text-doctoralia-teal">connect</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Reinventando la experiencia del paciente a través de la tecnología y la conexión humana. El marketplace de salud más grande de España.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Para pacientes</h5>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-doctoralia-teal transition">Especialistas</a></li>
                <li><a href="#" className="hover:text-doctoralia-teal transition">Centros médicos</a></li>
                <li><a href="#" className="hover:text-doctoralia-teal transition">Servicios</a></li>
                <li><a href="#" className="hover:text-doctoralia-teal transition">Enfermedades</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Para médicos</h5>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-doctoralia-teal transition">Suscripciones</a></li>
                <li><a href="#" className="hover:text-doctoralia-teal transition">Agenda Online</a></li>
                <li><a href="#" className="hover:text-doctoralia-teal transition">Consultas Online</a></li>
                <li><a href="#" className="hover:text-doctoralia-teal transition">Recurso para centros</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Legal</h5>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-doctoralia-teal transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-doctoralia-teal transition">Términos de uso</a></li>
                <li><a href="#" className="hover:text-doctoralia-teal transition">Cookies</a></li>
                <li><a href="#" className="hover:text-doctoralia-teal transition">Accesibilidad</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400 font-medium">
            <p>© 2024 DoctorConnect Spain S.L. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gray-600">Instagram</a>
              <a href="#" className="hover:text-gray-600">LinkedIn</a>
              <a href="#" className="hover:text-gray-600">Twitter</a>
              <a href="#" className="hover:text-gray-600">Facebook</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Gemini AI Assistant */}
      <DocBot />
    </div>
  );
};

// Internal Helper Components for Cleanliness
const XIcon = ({className}: {className?: string}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CalendarIcon = ({className}: {className?: string}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AppleIcon = ({className}: {className?: string}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.05 20.28c-.96.95-2.23 1.5-3.52 1.5-1.13 0-2.13-.39-2.95-.91-.77-.48-1.74-.48-2.51 0-.82.52-1.82.91-2.95.91-1.29 0-2.56-.55-3.52-1.5C.42 17.03-.64 12.35.53 8.35c.67-2.3 2.5-3.8 4.67-3.8 1.14 0 2.14.39 2.96.91.77.48 1.74.48 2.51 0 .82-.52 1.82-.91 2.95-.91 2.17 0 4 .15 5.23 2.15-1.16.8-2.03 2.05-2.03 3.65 0 1.95 1.34 3.4 3.23 3.93-.43 1-1.07 1.93-1.93 2.8zM12 4.45c0-1.26.54-2.45 1.41-3.32.87-.87 2.06-1.41 3.32-1.41 0 1.26-.54 2.45-1.41 3.32-.87.87-2.06 1.41-3.32 1.41z"/>
  </svg>
);

const PlayStoreIcon = ({className}: {className?: string}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3.61 2.22c-.18.18-.28.45-.28.78v18c0 .33.1.6.28.78l.06.06L14.05 11.4l.06-.06.06-.06L3.67 2.16l-.06.06zm13.3 9.18l3.42-1.95c.98-.56.98-1.48 0-2.04l-3.42-1.95-3.04 3.04 3.04 2.9zm1.08 1.08l-3.21-3.21-3.04 3.04 3.21 3.21 3.04-3.04zm-14.77 9.3l11.16-6.38-3.04-3.04L3.22 21.78zm0-17.56L14.38 8.64l3.04 3.04-11.16-6.38L3.22 4.22z"/>
  </svg>
);

export default App;
