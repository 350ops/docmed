"use client";

import React, { useEffect, useState } from "react";
import { getCurrentDoctor } from "@/lib/auth";
import { Doctor } from "@/types";
import { Calendar, Star, Eye, TrendingUp, Users, Clock } from "lucide-react";

export default function DoctorDashboardPage() {
    const [doctor, setDoctor] = useState<Doctor | null>(null);

    useEffect(() => {
        const current = getCurrentDoctor();
        setDoctor(current);
    }, []);

    if (!doctor) return null;

    const stats = [
        {
            label: "Citas este mes",
            value: "24",
            change: "+12%",
            icon: Calendar,
            color: "bg-blue-500",
        },
        {
            label: "Valoración media",
            value: doctor.rating.toString(),
            change: "+0.2",
            icon: Star,
            color: "bg-yellow-500",
        },
        {
            label: "Visitas al perfil",
            value: "1,234",
            change: "+8%",
            icon: Eye,
            color: "bg-purple-500",
        },
        {
            label: "Nuevos pacientes",
            value: "18",
            change: "+5%",
            icon: Users,
            color: "bg-green-500",
        },
    ];

    const upcomingAppointments = [
        { patient: "María García", time: "10:00", type: "Consulta general" },
        { patient: "Carlos López", time: "11:30", type: "Seguimiento" },
        { patient: "Ana Fernández", time: "12:00", type: "Primera visita" },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    ¡Bienvenido/a, {doctor.name.split(" ")[0]}! 👋
                </h1>
                <p className="text-gray-500">
                    Aquí tienes un resumen de tu actividad reciente
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-xl text-white`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mb-1">
                                {stat.value}
                            </p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Upcoming Appointments */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Próximas citas</h2>
                        <a
                            href="/doctor/appointments"
                            className="text-doctoralia-teal font-semibold text-sm hover:underline"
                        >
                            Ver todas
                        </a>
                    </div>

                    <div className="space-y-4">
                        {upcomingAppointments.map((apt, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-doctoralia-teal/10 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-doctoralia-teal" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{apt.patient}</p>
                                        <p className="text-sm text-gray-500">{apt.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">Hoy</p>
                                    <p className="text-sm text-doctoralia-teal font-semibold">
                                        {apt.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Acciones rápidas
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href="/doctor/profile"
                            className="p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition text-center group"
                        >
                            <div className="w-12 h-12 bg-doctoralia-teal rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-900">Editar perfil</p>
                        </a>

                        <a
                            href="/doctor/appointments"
                            className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition text-center group"
                        >
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <p className="font-semibold text-gray-900">Gestionar agenda</p>
                        </a>

                        <a
                            href="#"
                            className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition text-center group"
                        >
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <p className="font-semibold text-gray-900">Ver opiniones</p>
                        </a>

                        <a
                            href="/doctor/settings"
                            className="p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition text-center group"
                        >
                            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-900">Configuración</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
