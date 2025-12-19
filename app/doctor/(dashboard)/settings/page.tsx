"use client";

import React, { useEffect, useState } from "react";
import { Bell, Lock, Globe, CreditCard, HelpCircle, CheckCircle2 } from "lucide-react";

type SettingSection = "notifications" | "security" | "language" | "billing" | "help";

interface SettingsState {
    emailAlerts: boolean;
    pushAlerts: boolean;
    mfaEnabled: boolean;
    language: string;
    region: string;
    billingCycle: "mensual" | "anual";
}

const STORAGE_KEY = "doctorconnect_settings";

export default function DoctorSettingsPage() {
    const [openSection, setOpenSection] = useState<SettingSection | null>("notifications");
    const [settings, setSettings] = useState<SettingsState>({
        emailAlerts: true,
        pushAlerts: true,
        mfaEnabled: false,
        language: "Español",
        region: "España",
        billingCycle: "mensual",
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setSettings(JSON.parse(stored));
        }
    }, []);

    const persist = (next: SettingsState) => {
        setSettings(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const toggle = (key: keyof SettingsState) => {
        const next = { ...settings, [key]: !settings[key] } as SettingsState;
        persist(next);
    };

    const updateField = (key: keyof SettingsState, value: SettingsState[keyof SettingsState]) => {
        const next = { ...settings, [key]: value };
        persist(next as SettingsState);
    };

    const Section = ({
        id,
        icon: Icon,
        title,
        description,
        children,
    }: {
        id: SettingSection;
        icon: React.ElementType;
        title: string;
        description: string;
        children: React.ReactNode;
    }) => (
        <div className="border-b border-gray-100 last:border-none">
            <button
                onClick={() => setOpenSection(openSection === id ? null : id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition text-left"
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl text-white bg-doctoralia-teal">
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{title}</p>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${openSection === id ? "rotate-90" : ""
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            {openSection === id && <div className="px-6 pb-6 space-y-4">{children}</div>}
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajustes</h1>
                <p className="text-gray-500">Configura tu cuenta y preferencias</p>
                {saved && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-xl text-sm border border-green-100">
                        <CheckCircle2 className="w-4 h-4" />
                        Preferencias guardadas
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <Section
                    id="notifications"
                    icon={Bell}
                    title="Notificaciones"
                    description="Configura cómo quieres recibir alertas"
                >
                    <label className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                        <div>
                            <p className="font-semibold text-gray-900">Alertas por email</p>
                            <p className="text-sm text-gray-500">Recordatorios de citas y mensajes de pacientes</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.emailAlerts}
                            onChange={() => toggle("emailAlerts")}
                            className="w-5 h-5 text-doctoralia-teal rounded border-gray-300"
                        />
                    </label>
                    <label className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                        <div>
                            <p className="font-semibold text-gray-900">Notificaciones push</p>
                            <p className="text-sm text-gray-500">Avisos inmediatos en el panel</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.pushAlerts}
                            onChange={() => toggle("pushAlerts")}
                            className="w-5 h-5 text-doctoralia-teal rounded border-gray-300"
                        />
                    </label>
                </Section>

                <Section
                    id="security"
                    icon={Lock}
                    title="Seguridad"
                    description="Contraseña y autenticación"
                >
                    <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-gray-900">Doble factor (2FA)</p>
                            <input
                                type="checkbox"
                                checked={settings.mfaEnabled}
                                onChange={() => toggle("mfaEnabled")}
                                className="w-5 h-5 text-doctoralia-teal rounded border-gray-300"
                            />
                        </div>
                        <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta.</p>
                        <button className="text-sm font-semibold text-doctoralia-teal hover:underline">
                            Actualizar contraseña
                        </button>
                    </div>
                </Section>

                <Section
                    id="language"
                    icon={Globe}
                    title="Idioma y región"
                    description="Preferencias de ubicación"
                >
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Idioma</label>
                            <select
                                value={settings.language}
                                onChange={(e) => updateField("language", e.target.value as SettingsState["language"])}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal"
                            >
                                <option>Español</option>
                                <option>Inglés</option>
                                <option>Francés</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Región</label>
                            <select
                                value={settings.region}
                                onChange={(e) => updateField("region", e.target.value as SettingsState["region"])}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal"
                            >
                                <option>España</option>
                                <option>México</option>
                                <option>Argentina</option>
                            </select>
                        </div>
                    </div>
                </Section>

                <Section
                    id="billing"
                    icon={CreditCard}
                    title="Facturación"
                    description="Gestiona tu suscripción"
                >
                    <div className="flex flex-col sm:flex-row gap-3">
                        {(["mensual", "anual"] as SettingsState["billingCycle"][]).map((cycle) => (
                            <button
                                key={cycle}
                                onClick={() => updateField("billingCycle", cycle)}
                                className={`flex-1 p-4 rounded-xl border ${settings.billingCycle === cycle
                                        ? "border-doctoralia-teal bg-teal-50 text-doctoralia-teal font-bold"
                                        : "border-gray-200 hover:border-doctoralia-teal"
                                    }`}
                            >
                                {cycle === "mensual" ? "Plan mensual" : "Plan anual (10% dcto)"}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">
                        Cambios de plan se aplican al siguiente ciclo de facturación.
                    </p>
                    <button className="text-sm font-semibold text-doctoralia-teal hover:underline">
                        Descargar última factura
                    </button>
                </Section>

                <Section
                    id="help"
                    icon={HelpCircle}
                    title="Ayuda"
                    description="Soporte y documentación"
                >
                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                        <p className="text-sm text-gray-700">¿Necesitas ayuda? Escríbenos y te respondemos en minutos.</p>
                        <a
                            href="mailto:soporte@doctorconnect.es"
                            className="text-doctoralia-teal font-semibold hover:underline inline-flex"
                        >
                            soporte@doctorconnect.es
                        </a>
                        <button className="text-sm font-semibold text-gray-700 hover:underline">
                            Ver documentación
                        </button>
                    </div>
                </Section>
            </div>
        </div>
    );
}
