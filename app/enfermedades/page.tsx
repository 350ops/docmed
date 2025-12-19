"use client";

import React from 'react';
import Header from '@/components/Header';
import { Heart, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

const ENFERMEDADES = [
    { name: 'Diabetes', specialty: 'Endocrinología', description: 'Enfermedad metabólica que afecta los niveles de azúcar en sangre' },
    { name: 'Hipertensión', specialty: 'Cardiología', description: 'Presión arterial elevada de forma crónica' },
    { name: 'Depresión', specialty: 'Psicología', description: 'Trastorno del estado de ánimo que causa tristeza persistente' },
    { name: 'Ansiedad', specialty: 'Psicología', description: 'Trastorno caracterizado por preocupación excesiva' },
    { name: 'Artritis', specialty: 'Reumatología', description: 'Inflamación de las articulaciones' },
    { name: 'Asma', specialty: 'Neumología', description: 'Enfermedad crónica de las vías respiratorias' },
    { name: 'Migraña', specialty: 'Neurología', description: 'Dolor de cabeza intenso y recurrente' },
    { name: 'Acné', specialty: 'Dermatología', description: 'Afección cutánea que causa granos y espinillas' },
    { name: 'Gastritis', specialty: 'Gastroenterología', description: 'Inflamación del revestimiento del estómago' },
    { name: 'Hipotiroidismo', specialty: 'Endocrinología', description: 'Producción insuficiente de hormonas tiroideas' },
    { name: 'Alergia', specialty: 'Alergología', description: 'Reacción del sistema inmune a sustancias externas' },
    { name: 'Insomnio', specialty: 'Psiquiatría', description: 'Dificultad para conciliar o mantener el sueño' },
];

export default function EnfermedadesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero */}
            <section className="bg-gradient-to-br from-rose-500 to-pink-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <Heart className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Enfermedades y Condiciones</h1>
                    <p className="text-xl text-rose-100 max-w-2xl mx-auto">
                        Información sobre enfermedades comunes y qué especialista consultar
                    </p>
                </div>
            </section>

            {/* Diseases Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ENFERMEDADES.map((disease) => (
                        <Link
                            key={disease.name}
                            href={`/?specialty=${encodeURIComponent(disease.specialty)}`}
                            className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-rose-300 hover:shadow-lg transition-all"
                        >
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-600 transition mb-2">
                                {disease.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">{disease.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                                    {disease.specialty}
                                </span>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-rose-600 transition" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Tienes síntomas?</h2>
                    <p className="text-gray-600 mb-8">
                        Describe tus síntomas a nuestro asistente virtual y te ayudaremos a encontrar al especialista adecuado.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-rose-600 transition"
                    >
                        <Search className="w-5 h-5" />
                        Consultar asistente
                    </Link>
                </div>
            </section>
        </div>
    );
}
