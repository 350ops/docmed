"use client";

import React from "react";
import { Bell, Lock, Globe, CreditCard, HelpCircle } from "lucide-react";

export default function DoctorSettingsPage() {
    const settingSections = [
        {
            title: "Notificaciones",
            description: "Configura cómo quieres recibir alertas",
            icon: Bell,
            color: "bg-blue-500",
        },
        {
            title: "Seguridad",
            description: "Contraseña y autenticación",
            icon: Lock,
            color: "bg-red-500",
        },
        {
            title: "Idioma y región",
            description: "Preferencias de ubicación",
            icon: Globe,
            color: "bg-green-500",
        },
        {
            title: "Facturación",
            description: "Gestiona tu suscripción",
            icon: CreditCard,
            color: "bg-purple-500",
        },
        {
            title: "Ayuda",
            description: "Soporte y documentación",
            icon: HelpCircle,
            color: "bg-gray-500",
        },
    ];

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajustes</h1>
                <p className="text-gray-500">Configura tu cuenta y preferencias</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {settingSections.map((section, idx) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={idx}
                            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition border-b border-gray-100 last:border-none text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`${section.color} p-3 rounded-xl text-white`}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{section.title}</p>
                                    <p className="text-sm text-gray-500">{section.description}</p>
                                </div>
                            </div>
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    );
                })}
            </div>

            <div className="mt-8 p-6 bg-gray-100 rounded-2xl text-center">
                <p className="text-gray-600 text-sm">
                    ¿Necesitas ayuda? Contacta con nuestro equipo de soporte
                </p>
                <button className="mt-3 text-doctoralia-teal font-semibold hover:underline">
                    soporte@doctorconnect.es
                </button>
            </div>
        </div>
    );
}
