"use client";

import React, { useEffect, useState } from "react";
import { Bell, Lock, Globe, CreditCard, HelpCircle, Newspaper, Check } from "lucide-react";
import { getCurrentDoctor } from "@/lib/doctor-auth";
import { Doctor } from "@/types";
import { getJournalPreferences, setJournalPreferences } from "@/lib/doctor-data";
import { Button } from "@/components/ui/button";

const JOURNAL_OPTIONS = [
    "The Lancet",
    "New England Journal of Medicine",
    "JAMA",
    "BMJ",
    "Nature Medicine",
    "Annals of Internal Medicine",
    "The British Journal of General Practice",
];

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

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [selectedJournals, setSelectedJournals] = useState<string[]>([]);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const current = getCurrentDoctor();
        if (!current) return;
        setDoctor(current);
        setSelectedJournals(getJournalPreferences(current.id));
    }, []);

    const toggleJournal = (journal: string) => {
        setSelectedJournals((prev) =>
            prev.includes(journal) ? prev.filter((j) => j !== journal) : [...prev, journal]
        );
    };

    const handleSave = async () => {
        if (!doctor) return;
        setSaving(true);
        setJournalPreferences(doctor.id, selectedJournals);
        setSaved(true);
        setSaving(false);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="mb-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajustes</h1>
                <p className="text-gray-500">Configura tu cuenta, feed científico y seguridad</p>
            </div>

            {/* Journal preferences */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-doctoralia-teal flex items-center justify-center">
                            <Newspaper className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Suscripciones a journals
                            </h2>
                            <p className="text-sm text-gray-500">
                                Selecciona las revistas que quieres recibir en tu feed y en el asistente IA.
                            </p>
                        </div>
                    </div>
                    {saved && (
                        <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                            <Check className="w-4 h-4" /> Guardado
                        </span>
                    )}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                    {JOURNAL_OPTIONS.map((journal) => (
                        <label
                            key={journal}
                            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${selectedJournals.includes(journal)
                                    ? "border-doctoralia-teal bg-teal-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedJournals.includes(journal)}
                                onChange={() => toggleJournal(journal)}
                                className="w-4 h-4 text-doctoralia-teal rounded"
                            />
                            <span className="text-gray-800 font-medium">{journal}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? "Guardando..." : "Guardar preferencias"}
                    </Button>
                </div>
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

            <div className="p-6 bg-gray-100 rounded-2xl text-center">
                <p className="text-gray-600 text-sm">
                    ¿Necesitas ayuda? Contacta con nuestro equipo de soporte
                </p>
                <a className="mt-3 inline-block text-doctoralia-teal font-semibold hover:underline" href="mailto:soporte@doctorconnect.es">
                    soporte@doctorconnect.es
                </a>
            </div>
        </div>
    );
}
