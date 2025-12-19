"use client";

import React, { useEffect, useState } from "react";
import { getCurrentDoctor } from "@/lib/doctor-auth";
import { Doctor } from "@/types";
import { Calendar as CalendarIcon, Star, Eye, TrendingUp, Users, Clock, Plus, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DoctorDashboardPage() {
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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
            icon: CalendarIcon,
            color: "bg-primary",
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
        { patient: "María García", time: "10:00", type: "Consulta general", status: "confirmed" },
        { patient: "Carlos López", time: "11:30", type: "Seguimiento", status: "confirmed" },
        { patient: "Ana Fernández", time: "12:00", type: "Primera visita", status: "pending" },
        { patient: "Pedro Martínez", time: "16:00", type: "Revisión", status: "confirmed" },
    ];

    // Mock dates with appointments
    const appointmentDates = [
        new Date(),
        new Date(Date.now() + 86400000),
        new Date(Date.now() + 86400000 * 2),
        new Date(Date.now() + 86400000 * 5),
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        ¡Bienvenido/a, {doctor.name.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-muted-foreground">
                        Aquí tienes un resumen de tu actividad reciente
                    </p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Nueva cita
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={idx} className="hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${stat.color} p-3 rounded-xl text-white`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        {stat.change}
                                    </Badge>
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-primary" />
                            Calendario
                        </CardTitle>
                        <CardDescription>Selecciona una fecha para ver las citas</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-xl border"
                            modifiers={{
                                hasAppointment: appointmentDates
                            }}
                            modifiersStyles={{
                                hasAppointment: {
                                    fontWeight: 'bold',
                                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                                    color: 'hsl(var(--primary))'
                                }
                            }}
                        />
                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-3 h-3 rounded-full bg-primary/20" />
                            <span>Días con citas programadas</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Appointments */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Citas de hoy</CardTitle>
                            <CardDescription>
                                {selectedDate?.toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long'
                                })}
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                            Ver todas
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {upcomingAppointments.map((apt, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition">
                                            <Clock className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{apt.patient}</p>
                                            <p className="text-sm text-muted-foreground">{apt.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-3">
                                        <div>
                                            <p className="font-bold text-gray-900">{apt.time}</p>
                                            <Badge
                                                variant={apt.status === 'confirmed' ? 'default' : 'secondary'}
                                                className={apt.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}
                                            >
                                                {apt.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                                            </Badge>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {upcomingAppointments.length === 0 && (
                            <div className="text-center py-12">
                                <CalendarIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                                <p className="text-muted-foreground">No hay citas programadas para este día</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Acciones rápidas</CardTitle>
                    <CardDescription>Accede rápidamente a las funciones más usadas</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <a
                            href="/doctor/profile"
                            className="p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition text-center group"
                        >
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
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
                                <CalendarIcon className="w-6 h-6 text-white" />
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
                </CardContent>
            </Card>
        </div>
    );
}
