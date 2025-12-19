"use client";

import React from 'react';
import Header from '@/components/Header';
import { INSURANCES } from '@/lib/constants';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const SEGUROS_INFO = [
    { name: 'Sanitas', doctors: 1250, features: ['Sin copagos', 'Cuadro médico amplio', 'App móvil'] },
    { name: 'Adeslas', doctors: 980, features: ['Cobertura nacional', 'Urgencias 24h', 'Telemedicina'] },
    { name: 'Mapfre', doctors: 750, features: ['Precios competitivos', 'Dental incluido', 'Reembolso'] },
    { name: 'Asisa', doctors: 620, features: ['Sin ánimo de lucro', 'Medicina preventiva', 'Salud mental'] },
    { name: 'DKV', doctors: 540, features: ['Ecológico', 'Bienestar digital', 'Segunda opinión'] },
    { name: 'Caser', doctors: 480, features: ['Flexible', 'Dental y óptica', 'Viajes incluidos'] },
    { name: 'AXA', doctors: 420, features: ['Internacional', 'Hospitalización', 'Maternidad'] },
];

export default function SegurosPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <Shield className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Seguros de Salud</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Encuentra médicos que aceptan tu seguro de salud
                    </p>
                </div>
            </section>

            {/* Insurance Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SEGUROS_INFO.map((seguro) => (
                        <div
                            key={seguro.name}
                            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">{seguro.name}</h3>
                                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    {seguro.doctors}+ médicos
                                </span>
                            </div>

                            <ul className="space-y-2 mb-6">
                                {seguro.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/?insurance=${encodeURIComponent(seguro.name)}`}
                                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                                Ver médicos
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Compare */}
            <section className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Sin seguro médico?</h2>
                    <p className="text-gray-600 mb-8">
                        No te preocupes, también puedes encontrar médicos con precios accesibles para consultas privadas.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition"
                    >
                        Buscar sin seguro
                    </Link>
                </div>
            </section>
        </div>
    );
}
