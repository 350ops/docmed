"use client";

import React from 'react';
import Header from '@/components/Header';
import { Building2, Calendar, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
    {
        icon: Calendar,
        title: 'Agenda Online',
        description: 'Sistema de citas automatizado que reduce las llamadas y optimiza tu tiempo'
    },
    {
        icon: Users,
        title: 'Gestión de Pacientes',
        description: 'Historial clínico digital, recordatorios automáticos y seguimiento personalizado'
    },
    {
        icon: TrendingUp,
        title: 'Visibilidad Online',
        description: 'Aparece en los primeros resultados de búsqueda y aumenta tu cartera de pacientes'
    },
];

const PLANS = [
    {
        name: 'Básico',
        price: '49€',
        period: '/mes',
        features: ['Perfil profesional', 'Agenda online', 'Hasta 50 citas/mes', 'Soporte email'],
        highlighted: false
    },
    {
        name: 'Profesional',
        price: '99€',
        period: '/mes',
        features: ['Todo lo del Básico', 'Citas ilimitadas', 'Gestión de pacientes', 'Recordatorios SMS', 'Soporte prioritario'],
        highlighted: true
    },
    {
        name: 'Clínica',
        price: '249€',
        period: '/mes',
        features: ['Todo lo del Profesional', 'Múltiples profesionales', 'Facturación integrada', 'API personalizada', 'Account manager'],
        highlighted: false
    },
];

export default function ClinicasPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero */}
            <section className="bg-gradient-to-br from-purple-600 to-violet-700 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <Building2 className="w-16 h-16 mx-auto mb-6 opacity-80" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Para Clínicas y Centros</h1>
                        <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
                            Digitaliza tu consulta y haz crecer tu práctica médica con las herramientas más avanzadas
                        </p>
                        <button className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition shadow-lg">
                            Solicitar demo gratuita
                        </button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Todo lo que necesitas para tu consulta
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                        Planes y Precios
                    </h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Elige el plan que mejor se adapte a las necesidades de tu consulta o clínica
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.name}
                                className={`rounded-2xl p-8 ${plan.highlighted
                                        ? 'bg-purple-600 text-white ring-4 ring-purple-200 scale-105'
                                        : 'bg-gray-50 text-gray-900'
                                    }`}
                            >
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className={plan.highlighted ? 'text-purple-200' : 'text-gray-500'}>
                                        {plan.period}
                                    </span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <CheckCircle className={`w-5 h-5 ${plan.highlighted ? 'text-purple-200' : 'text-green-500'}`} />
                                            <span className={plan.highlighted ? 'text-purple-100' : 'text-gray-600'}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${plan.highlighted
                                            ? 'bg-white text-purple-600 hover:bg-purple-50'
                                            : 'bg-purple-600 text-white hover:bg-purple-700'
                                        }`}
                                >
                                    Empezar ahora
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-900 py-16">
                <div className="max-w-3xl mx-auto px-4 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">¿Tienes dudas?</h2>
                    <p className="text-gray-400 mb-8">
                        Nuestro equipo está disponible para resolver todas tus preguntas y ayudarte a elegir el mejor plan.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 transition">
                            Hablar con ventas
                        </button>
                        <Link
                            href="/"
                            className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
