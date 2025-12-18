"use client";

import React from "react";
import { Calendar, Clock, User, Video, MapPin } from "lucide-react";

export default function DoctorAppointmentsPage() {
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
                <button className="flex items-center gap-2 bg-doctoralia-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#00af94] transition shadow-lg shadow-teal-100">
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
        </div>
    );
}
