"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, ShieldCheck, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Doctor } from '@/types';
import { useAuth } from '@/lib/auth';
import AuthModal from './AuthModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (id: string, slot: string) => void;
}

interface DisplayDay {
  date: Date;
  dateStr: string;
  dayName: string;
  dayNum: number;
  month: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingSlot, setPendingSlot] = useState<string | null>(null);
  const [displayDays, setDisplayDays] = useState<DisplayDay[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get next 7 days for display - only calculate on client
    const days: DisplayDay[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date,
        dateStr: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString('es-ES', { month: 'short' })
      });
    }
    setDisplayDays(days);
  }, []);

  const handleBookClick = (date: string, time: string) => {
    const slot = `${date}T${time}:00`;
    if (user) {
      onBook(doctor.id, slot);
    } else {
      setPendingSlot(slot);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    if (pendingSlot) {
      onBook(doctor.id, pendingSlot);
      setPendingSlot(null);
    }
  };

  const getSlotCount = (dateStr: string) => {
    const day = doctor.availability.find(d => d.date === dateStr);
    return day?.slots.length || 0;
  };

  const getFirstSlot = (dateStr: string) => {
    const day = doctor.availability.find(d => d.date === dateStr);
    return day?.slots[0];
  };

  const getFirstAvailableDay = () => {
    const today = new Date().toISOString().split('T')[0];
    const availableDay = doctor.availability.find(d => d.date >= today && d.slots.length > 0);
    if (!availableDay) return null;
    
    if (availableDay.date === today) return 'Hoy';
    
    const date = new Date(availableDay.date);
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' });
  };

  const nextAvailable = getFirstAvailableDay();

  return (
    <>
      <div className="card-accent-teal bg-white border border-gray-100 shadow-sm card-lift p-5 mb-4">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left side - Doctor info */}
          <div className="flex gap-4 lg:w-1/3">
            <Link href={`/doctor/${doctor.id}`} className="shrink-0 group">
              <div className="relative">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-2xl object-cover shadow-md ring-2 ring-white group-hover:ring-doctoralia-teal transition-all"
                />
                {doctor.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-doctoralia-teal text-white p-1 rounded-full shadow ring-2 ring-white">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                )}
              </div>
            </Link>

            <div className="min-w-0">
              <Link href={`/doctor/${doctor.id}`} className="hover:text-doctoralia-teal transition">
                <h3 className="text-lg font-bold text-gray-900 truncate">{doctor.name}</h3>
              </Link>
              <p className="text-doctoralia-teal font-semibold text-sm">{doctor.specialty}</p>

              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-bold text-gray-900">{doctor.rating}</span>
                <span className="text-xs text-gray-400">({doctor.reviewCount})</span>
              </div>

              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{doctor.location}</span>
              </div>

              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <ShieldCheck className="w-3 h-3 text-doctoralia-teal" />
                <span className="truncate">{doctor.insurances.slice(0, 2).join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Right side - Availability Grid (Zocdoc style) */}
          <div className="flex-1">
            <div className="grid grid-cols-7 gap-1">
              {mounted && displayDays.length > 0 ? displayDays.map((day, i) => {
                const slotCount = getSlotCount(day.dateStr);
                const firstSlot = getFirstSlot(day.dateStr);
                const hasSlots = slotCount > 0;

                return (
                  <div key={i} className="text-center">
                    {/* Day header */}
                    <div className="text-[10px] text-gray-400 uppercase font-medium mb-1">
                      {day.dayName}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {day.month} {day.dayNum}
                    </div>

                    {/* Slot button */}
                    {hasSlots ? (
                      <button
                        onClick={() => handleBookClick(day.dateStr, firstSlot!)}
                        className="w-full py-2 px-1 bg-teal-50 hover:bg-doctoralia-teal text-doctoralia-teal hover:text-white rounded-lg transition text-xs font-semibold group"
                      >
                        <span className="group-hover:hidden">{firstSlot}</span>
                        <span className="hidden group-hover:inline">Reservar</span>
                      </button>
                    ) : (
                      <div className="w-full py-2 px-1 bg-gray-50 text-gray-300 rounded-lg text-xs">
                        —
                      </div>
                    )}
                  </div>
                );
              }) : (
                // Placeholder during SSR/initial render
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[10px] text-gray-400 uppercase font-medium mb-1">
                      —
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      —
                    </div>
                    <div className="w-full py-2 px-1 bg-gray-50 text-gray-300 rounded-lg text-xs">
                      —
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Next available indicator */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {nextAvailable ? (
                  <Badge variant="secondary" className="bg-teal-50 text-doctoralia-teal gap-1">
                    <Clock className="w-3 h-3" />
                    Próxima: {nextAvailable}
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-500 gap-1">
                    No hay citas próximamente
                  </Badge>
                )}
                <span className="text-sm font-semibold text-gray-700">{doctor.priceRange}</span>
              </div>

              <Link href={`/doctor/${doctor.id}`}>
                <Button variant="ghost" size="sm" className="gap-1 text-doctoralia-teal hover:text-[#059669] hover:bg-teal-50">
                  Ver perfil completo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingSlot(null);
        }}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default DoctorCard;
