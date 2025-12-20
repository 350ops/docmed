"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Doctor } from '@/types';
import { MapPin, X, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface DoctorMapProps {
    doctors: Doctor[];
    selectedDoctorId?: string;
    onDoctorSelect?: (doctor: Doctor) => void;
}

// Dynamic import for Leaflet to avoid SSR issues
const DoctorMap: React.FC<DoctorMapProps> = ({ doctors, selectedDoctorId, onDoctorSelect }) => {
    const [isClient, setIsClient] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [hoveredDoctor, setHoveredDoctor] = useState<Doctor | null>(null);

    useEffect(() => {
        setIsClient(true);
        // Load Leaflet CSS via link tag
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
        setMapLoaded(true);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    if (!isClient || !mapLoaded) {
        return (
            <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <MapPin className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                    <p>Cargando mapa...</p>
                </div>
            </div>
        );
    }

    // Filter doctors with coordinates
    const mappableDoctors = doctors.filter(d => d.coordinates);

    // Calculate center based on doctors
    const center = mappableDoctors.length > 0
        ? {
            lat: mappableDoctors.reduce((sum, d) => sum + (d.coordinates?.lat || 0), 0) / mappableDoctors.length,
            lng: mappableDoctors.reduce((sum, d) => sum + (d.coordinates?.lng || 0), 0) / mappableDoctors.length,
        }
        : { lat: 40.4168, lng: -3.7038 }; // Default to Madrid

    return (
        <MapContent
            doctors={mappableDoctors}
            center={center}
            selectedDoctorId={selectedDoctorId}
            onDoctorSelect={onDoctorSelect}
            hoveredDoctor={hoveredDoctor}
            setHoveredDoctor={setHoveredDoctor}
        />
    );
};

// Separate component that uses react-leaflet
const MapContent: React.FC<{
    doctors: Doctor[];
    center: { lat: number; lng: number };
    selectedDoctorId?: string;
    onDoctorSelect?: (doctor: Doctor) => void;
    hoveredDoctor: Doctor | null;
    setHoveredDoctor: (doctor: Doctor | null) => void;
}> = ({ doctors, center, selectedDoctorId, onDoctorSelect, hoveredDoctor, setHoveredDoctor }) => {
    const [LeafletComponents, setLeafletComponents] = useState<any>(null);

    useEffect(() => {
        // Dynamic import of react-leaflet components
        Promise.all([
            import('react-leaflet'),
            import('leaflet')
        ]).then(([reactLeaflet, L]) => {
            // Fix default marker icon
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            });

            setLeafletComponents({ ...reactLeaflet, L });
        });
    }, []);

    if (!LeafletComponents) {
        return (
            <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <MapPin className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                    <p>Inicializando mapa...</p>
                </div>
            </div>
        );
    }

    const { MapContainer, TileLayer, Marker, Popup, L } = LeafletComponents;

    // Custom marker icon
    const createCustomIcon = (isSelected: boolean) => {
        return new L.DivIcon({
            className: 'custom-marker',
            html: `
        <div class="w-8 h-8 ${isSelected ? 'bg-coral' : 'bg-primary'} rounded-full flex items-center justify-center shadow-lg border-2 border-white transform ${isSelected ? 'scale-125' : ''} transition-transform">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });
    };

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                className="rounded-2xl z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {doctors.map((doctor) => (
                    <Marker
                        key={doctor.id}
                        position={[doctor.coordinates!.lat, doctor.coordinates!.lng]}
                        eventHandlers={{
                            click: () => onDoctorSelect?.(doctor),
                            mouseover: () => setHoveredDoctor(doctor),
                            mouseout: () => setHoveredDoctor(null),
                        }}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <div className="flex gap-3">
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{doctor.name}</h4>
                                        <p className="text-primary text-xs">{doctor.specialty}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                            <span className="text-xs font-medium">{doctor.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <Link href={`/doctor/${doctor.id}`}>
                                    <Button size="sm" className="w-full mt-3">
                                        Ver perfil
                                    </Button>
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Floating doctor card on hover */}
            {hoveredDoctor && (
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-4 z-[1000] animate-in fade-in slide-in-from-bottom-4">
                    <button
                        onClick={() => setHoveredDoctor(null)}
                        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition"
                    >
                        <X className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="flex gap-4">
                        <img
                            src={hoveredDoctor.image}
                            alt={hoveredDoctor.name}
                            className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{hoveredDoctor.name}</h4>
                            <p className="text-primary text-sm">{hoveredDoctor.specialty}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-medium">{hoveredDoctor.rating}</span>
                                </div>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{hoveredDoctor.priceRange}</span>
                            </div>
                        </div>
                        <Link href={`/doctor/${hoveredDoctor.id}`}>
                            <Button size="sm" className="shrink-0">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorMap;
