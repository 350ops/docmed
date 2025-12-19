"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { INSURANCES, SPECIALTIES } from '@/lib/constants';

type PriceFilter = 'any' | 'low' | 'mid' | 'high';

interface FiltersProps {
  onFilterChange: (filters: { type: 'specialty' | 'insurance' | 'price' | 'reset'; value?: string; checked?: boolean }) => void;
  selectedSpecialty: string;
  selectedInsurances: string[];
  selectedPrice: PriceFilter;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, selectedSpecialty, selectedInsurances, selectedPrice }) => {
  const router = useRouter();

  const handleProfessionalCta = () => {
    router.push('/doctor/login');
  };

  const handleReset = () => {
    onFilterChange({ type: 'reset' });
  };

  return (
    <aside id="filters" className="w-full lg:w-64 flex-shrink-0 space-y-8">
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-4">Filtrar por</h4>

        <div className="space-y-6">
          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Especialidad</label>
            <select
              className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-doctoralia-teal/20 transition"
              value={selectedSpecialty}
              onChange={(e) => onFilterChange({ type: 'specialty', value: e.target.value })}
            >
              <option value="all">Todas las especialidades</option>
              {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </section>

          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Aseguradora</label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {INSURANCES.map(ins => (
                <label key={ins} className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-doctoralia-teal focus:ring-doctoralia-teal"
                    checked={selectedInsurances.includes(ins)}
                    onChange={(e) => onFilterChange({ type: 'insurance', value: ins, checked: e.target.checked })}
                  />
                  <span className="text-gray-600 group-hover:text-gray-900 transition text-sm">{ins}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Precio</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="price"
                  value="low"
                  checked={selectedPrice === 'low'}
                  onChange={(e) => onFilterChange({ type: 'price', value: e.target.value })}
                  className="text-doctoralia-teal"
                />
                <span className="text-sm text-gray-600">Menos de 60€</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="price"
                  value="mid"
                  checked={selectedPrice === 'mid'}
                  onChange={(e) => onFilterChange({ type: 'price', value: e.target.value })}
                  className="text-doctoralia-teal"
                />
                <span className="text-sm text-gray-600">60€ - 100€</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="price"
                  value="high"
                  checked={selectedPrice === 'high'}
                  onChange={(e) => onFilterChange({ type: 'price', value: e.target.value })}
                  className="text-doctoralia-teal"
                />
                <span className="text-sm text-gray-600">Más de 100€</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="price"
                  value="any"
                  checked={selectedPrice === 'any'}
                  onChange={(e) => onFilterChange({ type: 'price', value: e.target.value })}
                  className="text-doctoralia-teal"
                />
                <span className="text-sm text-gray-600">Todos los precios</span>
              </label>
            </div>
          </section>

          <button
            type="button"
            onClick={handleReset}
            className="w-full text-sm font-semibold text-doctoralia-teal bg-teal-50 border border-teal-100 rounded-xl py-2.5 hover:bg-teal-100 transition"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-doctoralia-teal to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <h5 className="font-bold text-lg mb-2">¿Eres un profesional?</h5>
        <p className="text-teal-50 text-sm mb-4">Únete a la mayor plataforma de salud y haz crecer tu consulta.</p>
        <button
          onClick={handleProfessionalCta}
          className="w-full bg-white text-doctoralia-teal font-bold py-3 rounded-xl hover:bg-teal-50 transition shadow-md"
        >
          Empezar ahora
        </button>
      </div>
    </aside>
  );
};

export default Filters;
