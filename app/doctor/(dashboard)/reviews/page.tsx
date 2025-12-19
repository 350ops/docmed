"use client";

import React, { useMemo, useState } from "react";
import { Star, CheckCircle2, MessageSquare, Filter, ThumbsUp, AlertTriangle } from "lucide-react";

type ReviewStatus = "pending" | "answered" | "flagged";

const MOCK_REVIEWS = [
    {
        id: 1,
        patient: "María Gómez",
        rating: 5,
        comment: "Atención excelente, muy cercana y profesional. Me explicó todo con detalle.",
        date: "2024-05-12",
        status: "answered" as ReviewStatus,
    },
    {
        id: 2,
        patient: "Luis Fernández",
        rating: 4,
        comment: "Buena experiencia, pero la sala de espera estaba algo llena.",
        date: "2024-05-10",
        status: "pending" as ReviewStatus,
    },
    {
        id: 3,
        patient: "Ana Rodríguez",
        rating: 3,
        comment: "Consulta correcta, aunque me gustaría más seguimiento.",
        date: "2024-05-01",
        status: "flagged" as ReviewStatus,
    },
];

export default function DoctorReviewsPage() {
    const [activeFilter, setActiveFilter] = useState<ReviewStatus | "all">("all");
    const [responses, setResponses] = useState<Record<number, string>>({
        1: "Gracias por tus palabras, María. Estoy a tu disposición para cualquier duda.",
    });
    const [draft, setDraft] = useState<Record<number, string>>({});

    const filteredReviews = useMemo(() => {
        return activeFilter === "all"
            ? MOCK_REVIEWS
            : MOCK_REVIEWS.filter((review) => review.status === activeFilter);
    }, [activeFilter]);

    const handleRespond = (id: number) => {
        if (!draft[id]?.trim()) return;
        setResponses((prev) => ({ ...prev, [id]: draft[id] }));
        setDraft((prev) => ({ ...prev, [id]: "" }));
    };

    const statusBadge = (status: ReviewStatus) => {
        if (status === "answered") {
            return (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Respondida
                </span>
            );
        }
        if (status === "flagged") {
            return (
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Marcada para revisión
                </span>
            );
        }
        return (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> Pendiente de respuesta
            </span>
        );
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Opiniones de pacientes</h1>
                    <p className="text-gray-500">Gestiona tus reseñas y responde rápidamente</p>
                </div>
                <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value as ReviewStatus | "all")}
                        className="text-sm font-semibold text-gray-700 bg-transparent outline-none"
                    >
                        <option value="all">Todas</option>
                        <option value="pending">Pendientes</option>
                        <option value="answered">Respondidas</option>
                        <option value="flagged">Marcadas</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">Valoración media</p>
                    <p className="text-3xl font-bold text-gray-900">4.3</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">Pendientes</p>
                    <p className="text-3xl font-bold text-blue-600">
                        {MOCK_REVIEWS.filter((r) => r.status === "pending").length}
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">Respondidas</p>
                    <p className="text-3xl font-bold text-green-600">
                        {MOCK_REVIEWS.filter((r) => r.status === "answered").length}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {filteredReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-semibold text-gray-900 flex items-center gap-2">
                                    {review.patient}
                                    {statusBadge(review.status)}
                                </p>
                                <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString("es-ES")}</p>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-200"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="text-gray-700">{review.comment}</p>

                        {responses[review.id] && (
                            <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 text-sm text-teal-900 flex items-start gap-2">
                                <ThumbsUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold mb-1">Tu respuesta</p>
                                    <p>{responses[review.id]}</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <textarea
                                value={draft[review.id] ?? responses[review.id] ?? ""}
                                onChange={(e) =>
                                    setDraft((prev) => ({ ...prev, [review.id]: e.target.value }))
                                }
                                rows={3}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal focus:bg-white transition text-sm"
                                placeholder="Escribe una respuesta para este paciente..."
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleRespond(review.id)}
                                        className="bg-doctoralia-teal text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#00af94] transition shadow-sm shadow-teal-100"
                                    >
                                        Publicar respuesta
                                    </button>
                                    <button
                                        onClick={() => setDraft((prev) => ({ ...prev, [review.id]: "" }))}
                                        className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
                                    >
                                        Limpiar
                                    </button>
                                </div>
                                <button className="text-sm text-orange-600 hover:underline font-semibold">
                                    Marcar para revisión
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
