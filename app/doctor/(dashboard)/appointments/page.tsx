"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    Calendar,
    Clock,
    User,
    Video,
    MapPin,
    CheckCircle2,
    PlusCircle,
    ShieldCheck,
    Camera,
    AlertCircle,
} from "lucide-react";
import { getCurrentDoctor } from "@/lib/doctor-auth";
import {
    addAvailabilitySlot,
    getAppointments,
    getAvailability,
    getVideoRoom,
    updateAppointmentStatus,
} from "@/lib/doctor-data";
import { Appointment, DayAvailability, Doctor } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DoctorAppointmentsPage() {
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [availability, setAvailabilityState] = useState<DayAvailability[]>([]);
    const [newSlot, setNewSlot] = useState<{ date: string; time: string }>({
        date: new Date().toISOString().split("T")[0],
        time: "09:00",
    });
    const [videoRoom, setVideoRoom] = useState<string>("");
    const [videoStatus, setVideoStatus] = useState<
        "idle" | "checking" | "ok" | "error"
    >("idle");
    const [videoError, setVideoError] = useState<string | null>(null);

    useEffect(() => {
        const current = getCurrentDoctor();
        if (!current) return;
        setDoctor(current);

        setAppointments(getAppointments(current.id));
        setAvailabilityState(getAvailability(current.id));
        setVideoRoom(getVideoRoom(current.id));
    }, []);

    const stats = useMemo(() => {
        const now = new Date();
        const today = now.toISOString().split("T")[0];
        const weekAhead = new Date(now);
        weekAhead.setDate(weekAhead.getDate() + 7);

        const totalWeek = appointments.filter(
            (apt) => new Date(apt.dateTime) <= weekAhead
        ).length;
        const totalToday = appointments.filter((apt) =>
            apt.dateTime.startsWith(today)
        ).length;
        const pending = appointments.filter((apt) => apt.status === "pending").length;

        return { totalToday, totalWeek, pending };
    }, [appointments]);

    const handleAddSlot = (e: React.FormEvent) => {
        e.preventDefault();
        if (!doctor) return;
        const updated = addAvailabilitySlot(doctor.id, newSlot.date, newSlot.time);
        if (updated) {
            setAvailabilityState(updated.availability);
        }
    };

    const handleStatusChange = (appointmentId: string, status: Appointment["status"]) => {
        if (!doctor) return;
        const updated = updateAppointmentStatus(doctor.id, appointmentId, status);
        if (updated) {
            setAppointments(updated.appointments);
        }
    };

    const handleVideoCheck = async () => {
        try {
            setVideoStatus("checking");
            setVideoError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            stream.getTracks().forEach((t) => t.stop());
            setVideoStatus("ok");
        } catch (err) {
            setVideoStatus("error");
            setVideoError(
                err instanceof Error ? err.message : "No pudimos acceder a cámara/micrófono."
            );
        }
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("es-ES", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Citas</h1>
                    <p className="text-gray-500">
                        Agenda centralizada y lista para videollamadas seguras
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={handleVideoCheck} variant="outline" className="gap-2">
                        <Camera className="w-4 h-4" />
                        Comprobar vídeo/audio
                    </Button>
                    <a
                        href={videoRoom}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-doctoralia-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#059669] transition shadow-lg shadow-teal-100"
                    >
                        <Video className="w-5 h-5" />
                        Abrir sala segura
                    </a>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard label="Citas hoy" value={stats.totalToday.toString()} icon={Calendar} />
                <StatCard
                    label="Próximos 7 días"
                    value={stats.totalWeek.toString()}
                    icon={Clock}
                />
                <StatCard
                    label="Pendientes de confirmar"
                    value={stats.pending.toString()}
                    icon={AlertCircle}
                    highlight
                />
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Disponibilidad publicada
                        </h2>
                        <p className="text-sm text-gray-500">
                            Estos horarios se muestran a pacientes y sincronizan tu base segura.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        {availability.slice(0, 7).map((day) => (
                            <div
                                key={day.date}
                                className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-doctoralia-teal" />
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {formatDate(day.date)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {day.slots.length} huecos
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    {day.slots.map((slot) => (
                                        <span
                                            key={slot}
                                            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                                        >
                                            {slot}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form
                        onSubmit={handleAddSlot}
                        className="border border-dashed border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50"
                    >
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <PlusCircle className="w-4 h-4 text-doctoralia-teal" />
                            Añadir hueco rápido
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 font-semibold">
                                    Fecha (YYYY-MM-DD)
                                </label>
                                <Input
                                    type="date"
                                    value={newSlot.date}
                                    onChange={(e) =>
                                        setNewSlot((prev) => ({ ...prev, date: e.target.value }))
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-semibold">
                                    Hora (24h)
                                </label>
                                <Input
                                    type="time"
                                    value={newSlot.time}
                                    onChange={(e) =>
                                        setNewSlot((prev) => ({ ...prev, time: e.target.value }))
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Publicar hueco
                        </Button>
                    </form>
                </div>
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Próximas citas</h2>
                        <p className="text-sm text-gray-500">
                            Todas las citas incluyen enlace seguro si son online.
                        </p>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {appointments.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            No hay citas programadas todavía.
                        </div>
                    )}
                    {appointments.map((apt) => {
                        const isOnline = apt.mode === "online";
                        const dateObj = new Date(apt.dateTime);
                        return (
                            <div
                                key={apt.id}
                                className="p-6 hover:bg-gray-50 transition flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {apt.patientName}
                                        </p>
                                        <p className="text-sm text-gray-500">{apt.reason}</p>
                                        <p className="text-sm text-gray-400">
                                            {apt.location || doctor?.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">
                                            {formatDate(dateObj.toISOString())}
                                        </p>
                                        <p className="text-sm text-doctoralia-teal font-medium flex items-center gap-1 justify-end">
                                            <Clock className="w-4 h-4" />
                                            {dateObj.toLocaleTimeString("es-ES", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {isOnline ? (
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

                                    <div className="flex items-center gap-2">
                                        {isOnline && (
                                            <a
                                                href={apt.videoLink || videoRoom}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-4 py-2 text-doctoralia-teal font-semibold hover:bg-teal-50 rounded-lg transition"
                                            >
                                                Unirse a videollamada
                                            </a>
                                        )}
                                        {apt.status === "pending" && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-green-100 text-green-600 hover:bg-green-50"
                                                    onClick={() => handleStatusChange(apt.id, "confirmed")}
                                                >
                                                    Confirmar
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-red-100 text-red-600 hover:bg-red-50"
                                                    onClick={() => handleStatusChange(apt.id, "cancelled")}
                                                >
                                                    Rechazar
                                                </Button>
                                            </>
                                        )}
                                        {apt.status === "confirmed" && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-red-100 text-red-600 hover:bg-red-50"
                                                onClick={() => handleStatusChange(apt.id, "cancelled")}
                                            >
                                                Cancelar
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {videoStatus === "ok" && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Equipo listo para videollamadas.
                </div>
            )}
            {videoStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {videoError || "Revisa permisos de cámara y micrófono."}
                </div>
            )}
        </div>
    );
}

function StatCard({
    label,
    value,
    icon: Icon,
    highlight = false,
}: {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
}) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    highlight ? "bg-orange-100 text-orange-600" : "bg-teal-50 text-doctoralia-teal"
                }`}
            >
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
