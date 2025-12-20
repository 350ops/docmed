"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import DoctorCard from '@/components/DoctorCard';
import Filters from '@/components/Filters';
import DocBot from '@/components/DocBot';
import { MOCK_DOCTORS } from '@/lib/constants';
import { getLocationFromIP } from '@/lib/geolocation';
import { Doctor, Appointment } from '@/types';
import { getDoctors } from '@/lib/doctor-auth';
import { addAppointment, getVideoRoom, setAvailability } from '@/lib/doctor-data';
import { Search, Heart, Shield, Globe, CheckCircle, Calendar, Users, Award, ArrowRight, Sparkles, MapPin, List, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dynamic import for map to avoid SSR issues
const DoctorMap = dynamic(() => import('@/components/DoctorMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
            <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                <p>Cargando mapa...</p>
            </div>
        </div>
    )
});

export default function Home() {
    const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
    const [searchQuery, setSearchQuery] = useState({ specialty: '' });
    const [isSearching, setIsSearching] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
    const [userCity, setUserCity] = useState<string | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    // Load doctors from local storage / seed
    useEffect(() => {
        const seededDoctors = getDoctors();
        setDoctors(seededDoctors);
        setFilteredDoctors(seededDoctors);
    }, []);

    // Get user location from IP once doctors are loaded
    useEffect(() => {
        if (!doctors.length) return;
        const fetchLocation = async () => {
            try {
                const location = await getLocationFromIP();
                if (location && location.city) {
                    setUserCity(location.city);
                    console.log("Location detected from IP:", location.city);

                    // Filter doctors by detected city
                    const cityDoctors = doctors.filter(doc =>
                        doc.city.toLowerCase().includes(location.city.toLowerCase()) ||
                        doc.location.toLowerCase().includes(location.city.toLowerCase())
                    );

                    // If we have doctors in that city, show them; otherwise show all
                    if (cityDoctors.length > 0) {
                        setFilteredDoctors(cityDoctors);
                    }
                }
            } catch (error) {
                console.log("Could not detect location from IP");
            } finally {
                setIsLoadingLocation(false);
            }
        };

        fetchLocation();
    }, [doctors]);

    const handleSearch = (specialty: string) => {
        const sourceDoctors = doctors.length ? doctors : MOCK_DOCTORS;
        setIsSearching(true);
        setSearchQuery({ specialty });

        setTimeout(() => {
            const results = sourceDoctors.filter(doc => {
                const matchesSpecialty = !specialty ||
                    doc.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
                    doc.name.toLowerCase().includes(specialty.toLowerCase()) ||
                    doc.bio.toLowerCase().includes(specialty.toLowerCase());

                // If we have a detected city, also filter by location
                const matchesLocation = !userCity ||
                    doc.location.toLowerCase().includes(userCity.toLowerCase()) ||
                    doc.city.toLowerCase().includes(userCity.toLowerCase());

                // If no specialty is entered, show doctors in user's city (if detected)
                // If specialty is entered, show all matching doctors regardless of location
                return specialty ? matchesSpecialty : (matchesSpecialty && matchesLocation);
            });

            setFilteredDoctors(results.length > 0 ? results : sourceDoctors);
            setIsSearching(false);

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

        // Persist in doctor agenda
        const appointment: Appointment = {
            id: `apt-${Date.now()}`,
            doctorId,
            patientName: "Paciente marketplace",
            dateTime: slot,
            status: 'pending',
            mode: 'online',
            reason: 'Reserva desde marketplace',
            location: doc.address,
            videoLink: getVideoRoom(doctorId)
        };
        addAppointment(doctorId, appointment);

        // Remove booked slot locally to avoid duplications
        const [dateStr, timeStr] = slot.split('T');
        const cleanTime = timeStr.slice(0, 5);
        const updatedDoctors = doctors.map(d => {
            if (d.id !== doctorId) return d;
            const updatedAvailability = d.availability.map(day =>
                day.date === dateStr ? { ...day, slots: day.slots.filter(s => s !== cleanTime) } : day
            );
            return { ...d, availability: updatedAvailability };
        });
        setDoctors(updatedDoctors);
        setFilteredDoctors(prev =>
            prev.map(d => d.id === doctorId ? { ...d, availability: updatedDoctors.find(u => u.id === doctorId)?.availability || d.availability } : d)
        );
        setAvailability(doctorId, updatedDoctors.find(d => d.id === doctorId)?.availability || doc.availability);

        setTimeout(() => setBookingSuccess(null), 6000);
    };

    const handleFilterChange = (filters: { specialty?: string; insurance?: string; checked?: boolean }) => {
        const sourceDoctors = doctors.length ? doctors : MOCK_DOCTORS;
        let results = sourceDoctors;

        if (filters.specialty && filters.specialty !== 'all') {
            results = results.filter(d => d.specialty === filters.specialty);
        }

        if (filters.insurance && filters.checked) {
            results = results.filter(d => d.insurances.includes(filters.insurance!));
        }

        if (filters.specialty === 'all' && !filters.insurance) {
            results = sourceDoctors;
        }

        setFilteredDoctors(results);
    };

    return (
        <div className="min-h-screen flex flex-col selection:bg-teal-100 selection:text-teal-900">
            <Header />

            {/* Hero Section - Virtua Inspired */}
            <section className="relative gradient-hero-warm pt-20 pb-32 border-b border-gray-50 overflow-hidden">
                {/* Organic floating blobs */}
                <div className="blob-teal w-96 h-96 -top-20 -left-20 animate-blob" />
                <div className="blob-coral w-80 h-80 top-40 right-10 animate-blob" style={{ animationDelay: '2s' }} />
                <div className="blob-teal w-64 h-64 bottom-0 left-1/3 animate-blob" style={{ animationDelay: '4s' }} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm mb-8">
                        <Sparkles className="w-4 h-4 text-coral" />
                        <span className="text-sm font-semibold text-gray-700">Contigo en cada paso de tu salud</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        Tu salud, nuestra <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-doctoralia-teal to-emerald-500 bg-clip-text text-transparent">prioridad</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
                        Más de <strong className="text-coral font-semibold">120.000</strong> profesionales de la salud listos para ayudarte.
                        Opiniones reales, reservas 24/7.
                    </p>

                    <SearchBar onSearch={handleSearch} isLoading={isSearching} detectedCity={userCity} />

                    {/* Trust badges */}
                    <div className="mt-16 flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm card-lift">
                            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                                <Shield className="w-5 h-5 text-doctoralia-teal" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">Privacidad garantizada</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm card-lift">
                            <div className="w-10 h-10 bg-coral-light rounded-xl flex items-center justify-center">
                                <Heart className="w-5 h-5 text-coral" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">Opiniones verificadas</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm card-lift">
                            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                                <Globe className="w-5 h-5 text-doctoralia-teal" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">Presencial u online</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Virtua style */}
            <section className="bg-navy py-12 -mt-8 relative z-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-white mb-1">120K+</p>
                            <p className="text-gray-400 text-sm font-medium">Especialistas</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-white mb-1">5M+</p>
                            <p className="text-gray-400 text-sm font-medium">Pacientes</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-white mb-1">4.8<span className="text-coral">★</span></p>
                            <p className="text-gray-400 text-sm font-medium">Valoración media</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</p>
                            <p className="text-gray-400 text-sm font-medium">Reservas online</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Results Area */}
            <main id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
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
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    {filteredDoctors.length} especialistas encontrados
                                    {userCity && <span className="text-sm font-medium text-white bg-coral px-3 py-1 rounded-full">{userCity}</span>}
                                </h2>
                                <p className="text-gray-500 mt-1">
                                    {searchQuery.specialty ?
                                        `Resultados para "${searchQuery.specialty}"${userCity ? ` en ${userCity}` : ''}` :
                                        "Especialistas destacados para ti"}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* View Toggle */}
                                <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                        className="gap-1.5"
                                    >
                                        <List className="w-4 h-4" />
                                        Lista
                                    </Button>
                                    <Button
                                        variant={viewMode === 'map' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('map')}
                                        className="gap-1.5"
                                    >
                                        <Map className="w-4 h-4" />
                                        Mapa
                                    </Button>
                                </div>

                                {/* Sort */}
                                <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
                                    <span className="text-xs font-bold text-gray-400 px-2 uppercase tracking-wider">Ordenar:</span>
                                    <select className="text-sm font-semibold text-gray-700 outline-none bg-transparent pr-2 cursor-pointer">
                                        <option>Relevancia</option>
                                        <option>Mejor valorados</option>
                                        <option>Más cercanos</option>
                                        <option>Precio más bajo</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Map View */}
                        {viewMode === 'map' ? (
                            <div className="h-[600px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                                <DoctorMap doctors={filteredDoctors} />
                            </div>
                        ) : isSearching ? (
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

                                <div className="card-accent-coral bg-coral-light p-8 flex items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">¿No encuentras lo que buscas?</h3>
                                        <p className="text-gray-600">Nuestro asistente de salud IA puede ayudarte a identificar qué tipo de especialista necesitas según tus síntomas.</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const chatBtn = document.querySelector('[data-docbot-trigger]') as HTMLButtonElement;
                                            if (chatBtn) chatBtn.click();
                                        }}
                                        className="btn-coral px-6 py-3 rounded-2xl shadow-lg shadow-coral-100 flex items-center gap-2"
                                    >
                                        <Sparkles className="w-5 h-5" />
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
                                    onClick={() => handleSearch('')}
                                    className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-800 transition"
                                >
                                    Ver todos los profesionales
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Value Prop Section - Reimagined */}
            <section className="bg-white py-24 border-t border-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-coral font-bold text-sm uppercase tracking-widest">¿Por qué elegirnos?</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">Salud de calidad al alcance de tu mano</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Únete a los millones de pacientes que confían en CareSalud para gestionar su bienestar.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card-accent-teal bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-teal-50 text-doctoralia-teal rounded-2xl flex items-center justify-center mb-6">
                                <Search className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-gray-900">Transparencia total</h4>
                            <p className="text-gray-600 leading-relaxed">Consulta precios orientativos, experiencia profesional y lee opiniones reales de otros pacientes para elegir con total confianza.</p>
                        </div>
                        <div className="card-accent-coral bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-coral-light text-coral rounded-2xl flex items-center justify-center mb-6">
                                <Calendar className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-gray-900">Reserva inmediata</h4>
                            <p className="text-gray-600 leading-relaxed">Olvídate de las esperas al teléfono. Reserva tu cita en segundos, en cualquier momento y desde cualquier dispositivo.</p>
                        </div>
                        <div className="card-accent-teal bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-teal-50 text-doctoralia-teal rounded-2xl flex items-center justify-center mb-6">
                                <Shield className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-gray-900">Seguridad garantizada</h4>
                            <p className="text-gray-600 leading-relaxed">Tus datos están protegidos bajo los más altos estándares de seguridad. Solo tú y tu médico tenéis acceso a tu información.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* App CTA - Modernized */}
            <section className="gradient-navy py-20 text-white overflow-hidden relative">
                <div className="blob-teal w-96 h-96 -bottom-40 -left-20 opacity-30" />
                <div className="blob-coral w-80 h-80 -top-20 right-20 opacity-20" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="lg:w-1/2">
                        <span className="inline-block bg-coral/20 text-coral font-bold text-sm px-4 py-1 rounded-full mb-6">Próximamente</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Gestiona tus citas desde la palma de tu mano</h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Descarga nuestra App gratuita y lleva el control de tu salud allá donde vayas. Recibe recordatorios, gestiona recetas y contacta con tu médico.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-white text-gray-900 px-6 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-100 transition shadow-lg">
                                <AppleIcon className="w-6 h-6" /> App Store
                            </button>
                            <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/20 transition border border-white/20">
                                <PlayStoreIcon className="w-6 h-6" /> Google Play
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="w-72 h-[500px] bg-gray-800 rounded-[3rem] border-[8px] border-gray-700 shadow-2xl relative z-10 overflow-hidden">
                                <div className="bg-doctoralia-teal h-28 w-full p-5 flex flex-col justify-end">
                                    <span className="text-white/60 text-xs font-medium">Bienvenido de nuevo</span>
                                    <span className="text-white font-bold text-lg">Mis Citas</span>
                                </div>
                                <div className="p-4 space-y-3">
                                    <div className="bg-white/10 h-20 rounded-2xl p-4 flex gap-3">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-white/20 rounded w-3/4"></div>
                                            <div className="h-3 bg-white/10 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                    <div className="bg-coral/30 h-20 rounded-2xl p-4 flex gap-3">
                                        <div className="w-12 h-12 bg-coral/40 rounded-xl"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-white/30 rounded w-3/4"></div>
                                            <div className="h-3 bg-white/20 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 h-20 rounded-2xl p-4 flex gap-3">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-white/20 rounded w-3/4"></div>
                                            <div className="h-3 bg-white/10 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer - Refined */}
            <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
                        <div className="col-span-2">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-doctoralia-teal rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200">
                                    <Search className="text-white w-6 h-6" />
                                </div>
                                <span className="text-2xl font-black text-gray-900 tracking-tighter">
                                    doctor<span className="text-doctoralia-teal">connect</span>
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-6">
                                Reinventando la experiencia del paciente a través de la tecnología y la conexión humana. El marketplace de salud más grande de España.
                            </p>
                            <div className="flex gap-3">
                                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-doctoralia-teal hover:text-white transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" /></svg>
                                </a>
                                <a href="https://x.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-doctoralia-teal hover:text-white transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                                <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-doctoralia-teal hover:text-white transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Para pacientes</h5>
                            <ul className="space-y-4 text-sm text-gray-600">
                                <li><a href="/especialidades" className="hover:text-doctoralia-teal transition">Especialistas</a></li>
                                <li><a href="/clinicas" className="hover:text-doctoralia-teal transition">Centros médicos</a></li>
                                <li><a href="/seguros" className="hover:text-doctoralia-teal transition">Servicios</a></li>
                                <li><a href="/enfermedades" className="hover:text-doctoralia-teal transition">Enfermedades</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Para médicos</h5>
                            <ul className="space-y-4 text-sm text-gray-600">
                                <li><a href="/doctor/settings" className="hover:text-doctoralia-teal transition">Suscripciones</a></li>
                                <li><a href="/doctor/appointments" className="hover:text-doctoralia-teal transition">Agenda Online</a></li>
                                <li><a href="/doctor/appointments" className="hover:text-doctoralia-teal transition">Consultas Online</a></li>
                                <li><a href="/clinicas" className="hover:text-doctoralia-teal transition">Recurso para centros</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Legal</h5>
                            <ul className="space-y-4 text-sm text-gray-600">
                                <li><a href="/privacy" className="hover:text-doctoralia-teal transition">Privacidad</a></li>
                                <li><a href="/terms" className="hover:text-doctoralia-teal transition">Términos de uso</a></li>
                                <li><a href="/privacy#cookies" className="hover:text-doctoralia-teal transition">Cookies</a></li>
                                <li><a href="/terms#accessibility" className="hover:text-doctoralia-teal transition">Accesibilidad</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400 font-medium">
                        <p>© 2024 CareSalud Spain S.L. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>

            {/* Gemini AI Assistant */}
            <DocBot />
        </div>
    );
}

// Internal Helper Components
const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.05 20.28c-.96.95-2.23 1.5-3.52 1.5-1.13 0-2.13-.39-2.95-.91-.77-.48-1.74-.48-2.51 0-.82.52-1.82.91-2.95.91-1.29 0-2.56-.55-3.52-1.5C.42 17.03-.64 12.35.53 8.35c.67-2.3 2.5-3.8 4.67-3.8 1.14 0 2.14.39 2.96.91.77.48 1.74.48 2.51 0 .82-.52 1.82-.91 2.95-.91 2.17 0 4 .15 5.23 2.15-1.16.8-2.03 2.05-2.03 3.65 0 1.95 1.34 3.4 3.23 3.93-.43 1-1.07 1.93-1.93 2.8zM12 4.45c0-1.26.54-2.45 1.41-3.32.87-.87 2.06-1.41 3.32-1.41 0 1.26-.54 2.45-1.41 3.32-.87.87-2.06 1.41-3.32 1.41z" />
    </svg>
);

const PlayStoreIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3.61 2.22c-.18.18-.28.45-.28.78v18c0 .33.1.6.28.78l.06.06L14.05 11.4l.06-.06.06-.06L3.67 2.16l-.06.06zm13.3 9.18l3.42-1.95c.98-.56.98-1.48 0-2.04l-3.42-1.95-3.04 3.04 3.04 2.9zm1.08 1.08l-3.21-3.21-3.04 3.04 3.21 3.21 3.04-3.04zm-14.77 9.3l11.16-6.38-3.04-3.04L3.22 21.78zm0-17.56L14.38 8.64l3.04 3.04-11.16-6.38L3.22 4.22z" />
    </svg>
);
