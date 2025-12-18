
import React from 'react';
import { Star, MapPin, ShieldCheck, CheckCircle, Clock } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (id: string, slot: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 mb-4 flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="relative">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-24 h-24 rounded-2xl object-cover mb-4 ring-2 ring-gray-50"
          />
          {doctor.isVerified && (
            <div className="absolute -top-2 -right-2 bg-doctoralia-teal text-white p-1 rounded-full shadow-sm">
              <CheckCircle className="w-4 h-4" />
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
        <p className="text-doctoralia-teal font-semibold text-sm mb-2">{doctor.specialty}</p>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 fill-current ${i >= Math.floor(doctor.rating) ? 'text-gray-200' : ''}`} />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-700 ml-1">{doctor.rating}</span>
          <span className="text-xs text-gray-500">({doctor.reviewCount} opiniones)</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
          <MapPin className="w-4 h-4" />
          <span>{doctor.address}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>Acepta {doctor.insurances.join(', ')}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          <button className="text-doctoralia-teal font-semibold text-sm border border-doctoralia-teal px-4 py-2 rounded-lg hover:bg-teal-50 transition">
            Ver perfil completo
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4 bg-blue-50 text-blue-700 p-3 rounded-xl text-sm font-medium">
          <Clock className="w-4 h-4" />
          Proxima disponibilidad: Hoy
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {doctor.availability.map((slot, idx) => {
            const date = new Date(slot);
            return (
              <button
                key={idx}
                onClick={() => onBook(doctor.id, slot)}
                className="flex flex-col items-center py-2 px-3 border border-gray-200 rounded-xl hover:border-doctoralia-teal hover:bg-teal-50 transition"
              >
                <span className="text-xs text-gray-500 capitalize">
                  {date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })}
                </span>
                <span className="font-bold text-gray-800">
                  {date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </button>
            );
          })}
          <button className="flex items-center justify-center p-2 text-doctoralia-teal font-bold text-sm bg-teal-50 rounded-xl hover:bg-teal-100 transition">
            Ver más →
          </button>
        </div>
        
        <div className="mt-6 border-t border-gray-100 pt-4 text-sm text-gray-500">
          <p className="line-clamp-2 italic">"{doctor.bio}"</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
