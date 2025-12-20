"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/lib/auth';
import { getAllAppointmentsForPatient, cancelAppointment } from '@/lib/doctor-data';
import { Appointment } from '@/types';
import { Calendar, Clock, MapPin, Video, XCircle, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function PatientAppointmentsPage() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<(Appointment & { doctorName: string; doctorSpecialty: string; doctorImage: string })[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const data = getAllAppointmentsForPatient(user.id);
            setAppointments(data);
        }
        setIsLoading(false);
    }, [user]);

    const handleCancel = (doctorId: string, appointmentId: string) => {
        if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
            cancelAppointment(doctorId, appointmentId);
            if (user) {
                setAppointments(getAllAppointmentsForPatient(user.id));
            }
        }
    };

    const formatDate = (dateTimeStr: string) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (dateTimeStr: string) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-doctoralia-teal"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para ver tus citas</h1>
                    <p className="text-gray-600 mb-8">Necesitas estar identificado para gestionar tus reservas médicas.</p>
                    <Link href="/">
                        <Button className="bg-doctoralia-teal hover:bg-[#059669]">Volver al inicio</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mis Reservas</h1>
                        <p className="text-gray-500 mt-1">Gestiona tus citas médicas y consultas online</p>
                    </div>
                    <Link href="/">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Buscar más especialistas
                        </Button>
                    </Link>
                </div>

                {appointments.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-10 h-10 text-doctoralia-teal" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">No tienes citas programadas</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Reserva tu primera cita con uno de nuestros especialistas verificados.</p>
                        <Link href="/">
                            <Button className="bg-doctoralia-teal hover:bg-[#059669] px-8 py-6 rounded-2xl font-bold shadow-lg shadow-teal-100">
                                Buscar especialistas
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {appointments.map((apt) => (
                            <div key={apt.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                                    <div className="shrink-0">
                                        <div className="relative">
                                            <Image 
                                                src={apt.doctorImage} 
                                                alt={apt.doctorName} 
                                                width={80} 
                                                height={80} 
                                                className="w-20 h-20 rounded-2xl object-cover"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                                                {apt.status === 'confirmed' ? (
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                ) : apt.status === 'cancelled' ? (
                                                    <XCircle className="w-5 h-5 text-red-500" />
                                                ) : (
                                                    <Clock className="w-5 h-5 text-orange-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{apt.doctorName}</h3>
                                                <p className="text-doctoralia-teal font-semibold text-sm">{apt.doctorSpecialty}</p>
                                            </div>
                                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider self-start ${
                                                apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                                {apt.status === 'confirmed' ? 'Confirmada' : 
                                                 apt.status === 'cancelled' ? 'Cancelada' : 'Pendiente'}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                                    <Calendar className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Fecha</p>
                                                    <p className="text-sm font-medium text-gray-900">{formatDate(apt.dateTime)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                                    <Clock className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Hora</p>
                                                    <p className="text-sm font-medium text-gray-900">{formatTime(apt.dateTime)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                                    {apt.mode === 'online' ? <Video className="w-5 h-5 text-purple-400" /> : <MapPin className="w-5 h-5 text-blue-400" />}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Modalidad</p>
                                                    <p className="text-sm font-medium text-gray-900">{apt.mode === 'online' ? 'Consulta Online' : 'Presencial'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                                    <MapPin className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div className="truncate">
                                                    <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Ubicación</p>
                                                    <p className="text-sm font-medium text-gray-900 truncate">{apt.location || 'Consultorio médico'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-50">
                                            {apt.mode === 'online' && apt.status === 'confirmed' && (
                                                <a 
                                                    href={apt.videoLink} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-100"
                                                >
                                                    <Video className="w-4 h-4" />
                                                    Unirse a la consulta
                                                </a>
                                            )}
                                            {apt.status !== 'cancelled' && (
                                                <Button 
                                                    variant="outline" 
                                                    className="flex-1 sm:flex-none border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold rounded-xl py-2.5"
                                                    onClick={() => handleCancel(apt.doctorId, apt.id)}
                                                >
                                                    Cancelar cita
                                                </Button>
                                            )}
                                            <Link href={`/doctor/${apt.doctorId}`} className="flex-1 sm:flex-none">
                                                <Button variant="ghost" className="w-full font-bold text-gray-500 hover:text-doctoralia-teal hover:bg-teal-50 rounded-xl">
                                                    Ver perfil del doctor
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

