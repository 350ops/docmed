"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Doctor, DayAvailability } from '@/types';
import Header from '@/components/Header';
import {
    Star, MapPin, ShieldCheck, CheckCircle, Clock, ArrowLeft,
    Globe, GraduationCap, Calendar, Phone, MessageSquare, Heart,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth';
import AuthModal from '@/components/AuthModal';
import PaymentModal from '@/components/PaymentModal';
import { getDoctorById } from '@/lib/doctor-auth';
import { addAppointment, getVideoRoom } from '@/lib/doctor-data';
import { Appointment } from '@/types';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DoctorProfilePage() {
    const params = useParams();
    const { user } = useAuth();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        const doctorId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
        const found = getDoctorById(doctorId);
        setDoctor(found || null);
    }, [params.id]);

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Doctor no encontrado</h2>
                    <Link href="/" className="text-primary hover:underline">Volver al inicio</Link>
                </div>
            </div>
        );
    }

    const handleBookingStart = () => {
        if (!selectedDate || !selectedTime) return;

        if (!user) {
            setShowAuthModal(true);
            return;
        }
        
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = () => {
        if (!selectedDate || !selectedTime || !user) return;

        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        
        const appointment: Appointment = {
            id: `apt-${Date.now()}`,
            doctorId: doctor.id,
            patientId: user.id,
            patientName: user.name,
            dateTime: `${dateStr}T${selectedTime}:00`,
            status: 'confirmed', // Confirmed after payment
            mode: 'online',
            reason: 'Consulta desde perfil',
            location: doctor.address,
            videoLink: getVideoRoom(doctor.id)
        };

        addAppointment(doctor.id, appointment);
        setShowPaymentModal(false);
        setBookingSuccess(true);
        setSelectedTime(null);
        setTimeout(() => setBookingSuccess(false), 5000);
    };

    const getSlotCount = (dateStr: string) => {
        const day = doctor.availability.find(d => d.date === dateStr);
        return day?.slots.length || 0;
    };

    const availableSlots = selectedDate 
        ? doctor.availability.find(d => d.date === format(selectedDate, 'yyyy-MM-dd'))?.slots || []
        : [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Success Banner */}
            {bookingSuccess && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">¡Cita reservada con éxito!</span>
                </div>
            )}

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition">
                    <ArrowLeft className="w-4 h-4" />
                    Volver a resultados
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Doctor Header Card */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="relative">
                                        <Image
                                            src={doctor.image}
                                            alt={doctor.name}
                                            width={128}
                                            height={128}
                                            className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                                        />
                                        {doctor.isVerified && (
                                            <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
                                                <p className="text-primary font-semibold text-lg">{doctor.specialty}</p>
                                            </div>
                                            <Button variant="outline" size="icon" className="rounded-full">
                                                <Heart className="w-5 h-5" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-2 mt-3">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-5 h-5 ${i >= Math.floor(doctor.rating) ? 'text-gray-200' : 'text-yellow-400 fill-yellow-400'}`} />
                                                ))}
                                            </div>
                                            <span className="font-bold text-gray-900">{doctor.rating}</span>
                                            <span className="text-muted-foreground">({doctor.reviewCount} opiniones)</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            <Badge variant="secondary" className="gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {doctor.location}
                                            </Badge>
                                            <Badge variant="secondary" className="gap-1">
                                                <GraduationCap className="w-3 h-3" />
                                                {doctor.experience} años exp.
                                            </Badge>
                                            {doctor.languages && (
                                                <Badge variant="secondary" className="gap-1">
                                                    <Globe className="w-3 h-3" />
                                                    {doctor.languages.join(', ')}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs */}
                        <Tabs defaultValue="about" className="w-full">
                            <TabsList className="w-full justify-start">
                                <TabsTrigger value="about">Sobre mí</TabsTrigger>
                                <TabsTrigger value="reviews">Opiniones</TabsTrigger>
                                <TabsTrigger value="location">Ubicación</TabsTrigger>
                            </TabsList>

                            <TabsContent value="about" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Presentación</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>

                                        {doctor.education && (
                                            <div className="mt-6">
                                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                                    <GraduationCap className="w-4 h-4 text-primary" />
                                                    Formación
                                                </h4>
                                                <p className="text-gray-600">{doctor.education}</p>
                                            </div>
                                        )}

                                        <div className="mt-6">
                                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-primary" />
                                                Seguros aceptados
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {doctor.insurances.map((ins, i) => (
                                                    <Badge key={i} variant="outline">{ins}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="reviews" className="mt-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="text-center py-8">
                                            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.rating} de 5</h3>
                                            <p className="text-muted-foreground">Basado en {doctor.reviewCount} opiniones</p>
                                        </div>
                                        {/* Mock reviews would go here */}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="location" className="mt-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-3 mb-4">
                                            <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-gray-900">{doctor.address}</p>
                                                <p className="text-muted-foreground text-sm">{doctor.location}</p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
                                            <p className="text-muted-foreground">Mapa disponible próximamente</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar - Booking */}
                    <div className="space-y-6">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        Reservar cita
                                    </CardTitle>
                                    <span className="text-primary font-bold">{doctor.priceRange}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Calendar UI Integration */}
                                <div className="border rounded-2xl p-2 bg-gray-50/50">
                                    <CalendarUI
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        locale={es}
                                        className="w-full"
                                        disabled={(date) => {
                                            const dateStr = format(date, 'yyyy-MM-dd');
                                            return date < new Date(new Date().setHours(0, 0, 0, 0)) || getSlotCount(dateStr) === 0;
                                        }}
                                    />
                                </div>

                                {/* Time Slots */}
                                {selectedDate && (
                                    <div className="space-y-3">
                                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-primary" />
                                            Horarios para el {format(selectedDate, 'd \'de\' MMMM', { locale: es })}:
                                        </p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {availableSlots.length > 0 ? (
                                                availableSlots.map((time, i) => (
                                                    <Button
                                                        key={i}
                                                        variant={selectedTime === time ? 'default' : 'outline'}
                                                        size="sm"
                                                        onClick={() => setSelectedTime(time)}
                                                        className={selectedTime === time ? 'bg-primary text-white' : 'hover:border-primary hover:text-primary'}
                                                    >
                                                        {time}
                                                    </Button>
                                                ))
                                            ) : (
                                                <p className="col-span-3 text-sm text-gray-400 italic text-center py-2">
                                                    No hay huecos para este día
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Book Button */}
                                <Button
                                    className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                                    disabled={!selectedTime}
                                    onClick={handleBookingStart}
                                >
                                    {selectedTime
                                        ? `Reservar para las ${selectedTime}`
                                        : 'Selecciona fecha y hora'}
                                </Button>

                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1 gap-2 rounded-xl">
                                        <Phone className="w-4 h-4" />
                                        Llamar
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2 rounded-xl">
                                        <MessageSquare className="w-4 h-4" />
                                        Mensaje
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => {
                    setShowAuthModal(false);
                    setShowPaymentModal(true);
                }}
            />

            <PaymentModal 
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onSuccess={handlePaymentSuccess}
                amount={doctor.priceRange}
                doctorName={doctor.name}
            />
        </div>
    );
}
