"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCurrentDoctor, updateDoctor } from "@/lib/auth";
import { Doctor } from "@/types";
import {
    User,
    MapPin,
    Star,
    ShieldCheck,
    Edit3,
    Save,
    X,
    Camera,
    CheckCircle,
} from "lucide-react";

export default function DoctorProfilePage() {
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDoctor, setEditedDoctor] = useState<Doctor | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        const current = getCurrentDoctor();
        setDoctor(current);
        setEditedDoctor(current);
    }, []);

    const handleSave = () => {
        if (editedDoctor) {
            const updated = updateDoctor(editedDoctor);
            setDoctor(updated);
            setIsEditing(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }
    };

    const handleCancel = () => {
        setEditedDoctor(doctor);
        setIsEditing(false);
    };

    const handleInputChange = (
        field: keyof Doctor,
        value: string | string[]
    ) => {
        if (editedDoctor) {
            setEditedDoctor({ ...editedDoctor, [field]: value });
        }
    };

    if (!doctor || !editedDoctor) return null;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            {saveSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle className="w-5 h-5" />
                    <p className="font-medium">¡Perfil actualizado correctamente!</p>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
                    <p className="text-gray-500">
                        Gestiona la información que ven los pacientes
                    </p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-doctoralia-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#00af94] transition shadow-lg shadow-teal-100"
                    >
                        <Edit3 className="w-5 h-5" />
                        Editar perfil
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                        >
                            <X className="w-5 h-5" />
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-doctoralia-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#00af94] transition shadow-lg shadow-teal-100"
                        >
                            <Save className="w-5 h-5" />
                            Guardar cambios
                        </button>
                    </div>
                )}
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Cover & Photo */}
                <div className="relative h-32 bg-gradient-to-r from-doctoralia-teal to-teal-600">
                            <div className="absolute -bottom-12 left-8">
                                <div className="relative">
                                    <Image
                                        src={isEditing ? editedDoctor.image : doctor.image}
                                        alt={doctor.name}
                                        width={112}
                                        height={112}
                                        className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-lg"
                                    />
                                    {isEditing && (
                                        <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition">
                                            <Camera className="w-4 h-4 text-gray-600" />
                                        </button>
                                    )}
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="pt-16 px-8 pb-8">
                    {/* Basic Info */}
                    <div className="mb-8">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedDoctor.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="text-2xl font-bold text-gray-900 w-full border-b-2 border-gray-200 focus:border-doctoralia-teal outline-none pb-1 mb-2"
                            />
                        ) : (
                            <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                                {doctor.name}
                                {doctor.isVerified && (
                                    <span className="bg-doctoralia-teal text-white p-1 rounded-full">
                                        <CheckCircle className="w-4 h-4" />
                                    </span>
                                )}
                            </h2>
                        )}
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedDoctor.specialty}
                                onChange={(e) => handleInputChange("specialty", e.target.value)}
                                className="text-lg text-doctoralia-teal font-semibold w-full border-b-2 border-gray-200 focus:border-doctoralia-teal outline-none pb-1"
                            />
                        ) : (
                            <p className="text-lg text-doctoralia-teal font-semibold">
                                {doctor.specialty}
                            </p>
                        )}
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="font-bold text-gray-900">{doctor.rating}</span>
                            <span className="text-gray-500">
                                ({doctor.reviewCount} opiniones)
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-5 h-5" />
                            <span>{doctor.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <ShieldCheck className="w-5 h-5" />
                            <span>{doctor.insurances.length} aseguradoras</span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Biografía profesional
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={editedDoctor.bio}
                                        onChange={(e) => handleInputChange("bio", e.target.value)}
                                        rows={4}
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal focus:bg-white transition"
                                    />
                                ) : (
                                    <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Dirección
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedDoctor.address}
                                        onChange={(e) =>
                                            handleInputChange("address", e.target.value)
                                        }
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal focus:bg-white transition"
                                    />
                                ) : (
                                    <p className="text-gray-600 flex items-start gap-2">
                                        <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        {doctor.address}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Rango de precios
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedDoctor.priceRange}
                                        onChange={(e) =>
                                            handleInputChange("priceRange", e.target.value)
                                        }
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal focus:bg-white transition"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-semibold text-lg">
                                        {doctor.priceRange}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Aseguradoras aceptadas
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedDoctor.insurances.join(", ")}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "insurances",
                                                e.target.value.split(", ").map((s) => s.trim())
                                            )
                                        }
                                        placeholder="Separadas por coma"
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal focus:bg-white transition"
                                    />
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.insurances.map((ins, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-teal-50 text-doctoralia-teal text-sm font-medium rounded-full"
                                            >
                                                {ins}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ciudad
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedDoctor.city}
                                        onChange={(e) => handleInputChange("city", e.target.value)}
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal focus:bg-white transition"
                                    />
                                ) : (
                                    <p className="text-gray-600">{doctor.city}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Card */}
            <div className="mt-8 p-6 bg-teal-50 border border-teal-100 rounded-2xl">
                <h3 className="font-bold text-teal-900 mb-2">💡 Vista previa</h3>
                <p className="text-teal-700 text-sm">
                    Los cambios que hagas aquí se reflejarán en tu perfil público que ven
                    los pacientes al buscar especialistas.
                </p>
            </div>
        </div>
    );
}
