"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, Video, MapPin, X, PlusCircle } from "lucide-react";

const AVAILABILITY_KEY = "doctorconnect_custom_availability";

export default function DoctorAppointmentsPage() {
    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [customSlots, setCustomSlots] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(AVAILABILITY_KEY);
        if (stored) {
            setCustomSlots(JSON.parse(stored));
        }
    }, []);

    const saveSlot = () => {
        if (!date || !time) return;
        const iso = new Date(`${date}T${time}`).toISOString();
        const next = [...customSlots, iso];
        setCustomSlots(next);
        localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(next));
        setShowAvailabilityModal(false);
        setDate("");
        setTime("");
    };

    const appointments = [
        {
            id: 1,
            patient: "María García López",
            date: "Hoy",
            time: "10:00",
            type: "Consulta general",
            status: "confirmed",
            isOnline: false,
        },
        {
            id: 2,
            patient: "Carlos Rodríguez Pérez",
            date: "Hoy",
            time: "11:30",
            type: "Seguimiento",
            status: "confirmed",
            isOnline: true,
        },
        {
            id: 3,
            patient: "Ana Fernández Ruiz",
            date: "Hoy",
            time: "12:00",
            type: "Primera visita",
            status: "pending",
            isOnline: false,
        },
        {
            id: 4,
            patient: "Pedro Martínez Sánchez",
            date: "Mañana",
            time: "09:00",
            type: "Consulta general",
            status: "confirmed",
            isOnline: false,
        },
        {
            id: 5,
            patient: "Laura González Torres",
            date: "Mañana",
            time: "10:30",
            type: "Seguimiento",
            status: "confirmed",
            isOnline: true,
        },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Citas</h1>
                    <p className="text-gray-500">Gestiona tu agenda de consultas</p>
                </div>
                <button
                    onClick={() => setShowAvailabilityModal(true)}
                    className="flex items-center gap-2 bg-doctoralia-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#00af94] transition shadow-lg shadow-teal-100"
                >
                    <Calendar className="w-5 h-5" />
                    Configurar disponibilidad
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Citas hoy</p>
                    <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Esta semana</p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Pendientes</p>
                    <p className="text-3xl font-bold text-orange-500">1</p>
                </div>
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Próximas citas</h2>
                </div>

                <div className="divide-y divide-gray-100">
                    {appointments.map((apt) => (
                        <div
                            key={apt.id}
                            className="p-6 hover:bg-gray-50 transition flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{apt.patient}</p>
                                    <p className="text-sm text-gray-500">{apt.type}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">{apt.date}</p>
                                    <p className="text-sm text-doctoralia-teal font-medium flex items-center gap-1 justify-end">
                                        <Clock className="w-4 h-4" />
                                        {apt.time}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {apt.isOnline ? (
                                        <span className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                                            <Video className="w-4 h-4" />
                                            Online
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                            <MapPin className="w-4 h-4" />
                                            Presencial
                                        </span>
                                    )}

                                    {apt.status === "pending" && (
                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                                            Pendiente
                                        </span>
                                    )}
                                </div>

                                <button className="px-4 py-2 text-doctoralia-teal font-semibold hover:bg-teal-50 rounded-lg transition">
                                    Ver detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <PlusCircle className="w-5 h-5" />
                        Disponibilidad añadida manualmente
                    </h2>
                    {customSlots.length > 0 && (
                        <button
                            className="text-sm font-semibold text-doctoralia-teal hover:underline"
                            onClick={() => {
                                setCustomSlots([]);
                                localStorage.removeItem(AVAILABILITY_KEY);
                            }}
                        >
                            Limpiar todo
                        </button>
                    )}
                </div>
                {customSlots.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aún no has añadido nuevos huecos. Usa el botón de arriba para crear disponibilidad extra.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {customSlots.map((slot) => {
                            const dateObj = new Date(slot);
                            return (
                                <div key={slot} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-xs text-gray-500 capitalize">
                                        {dateObj.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                                    </p>
                                    <p className="font-semibold text-gray-900">{dateObj.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {showAvailabilityModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Nuevo hueco de agenda</h3>
                            <button
                                onClick={() => setShowAvailabilityModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">
                            Añade disponibilidad puntual para que los pacientes puedan reservarla al instante.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1 block">Fecha</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1 block">Hora</label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal"
                                />
                            </div>
                        </div>
                        <button
                            onClick={saveSlot}
                            disabled={!date || !time}
                            className="w-full bg-doctoralia-teal text-white py-3 rounded-xl font-semibold hover:bg-[#00af94] transition disabled:opacity-50"
                        >
                            Guardar disponibilidad
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
