"use client";

import React from 'react';
import Header from '@/components/Header';
import { SPECIALTIES } from '@/lib/constants';
import { Search, Stethoscope, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EspecialidadesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero */}
            <section className="bg-gradient-to-br from-doctoralia-teal to-teal-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <Stethoscope className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Especialidades Médicas</h1>
                    <p className="text-xl text-teal-100 max-w-2xl mx-auto">
                        Encuentra al especialista que necesitas entre más de 50 especialidades médicas
                    </p>
                </div>
            </section>

            {/* Specialties Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {SPECIALTIES.map((specialty) => (
                        <Link
                            key={specialty}
                            href={`/?specialty=${encodeURIComponent(specialty)}`}
                            className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-doctoralia-teal hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-doctoralia-teal transition">
                                        {specialty}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">Ver especialistas</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-doctoralia-teal transition" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿No sabes qué especialista necesitas?</h2>
                    <p className="text-gray-600 mb-8">
                        Nuestro asistente virtual puede ayudarte a identificar al especialista adecuado según tus síntomas.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-doctoralia-teal text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-600 transition"
                    >
                        <Search className="w-5 h-5" />
                        Buscar especialista
                    </Link>
                </div>
            </section>
        </div>
    );
}
