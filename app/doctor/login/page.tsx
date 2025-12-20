"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login } from "@/lib/doctor-auth";
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react";

export default function DoctorLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const doctor = login(email, password);
        if (doctor) {
            router.push("/doctor");
        } else {
            setError("Email o contraseña incorrectos. Inténtalo de nuevo.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#ecfdf5] via-white to-emerald-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center justify-center">
                        <div className="relative w-64 h-16">
                            <Image 
                                src="/logo.png" 
                                alt="care salud" 
                                width={256} 
                                height={64} 
                                className="object-contain"
                                priority
                            />
                        </div>
                    </a>
                    <p className="mt-4 text-gray-500 font-medium">Portal para profesionales</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar sesión</h1>
                    <p className="text-gray-500 mb-8">Accede a tu panel de gestión</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-doctoralia-teal focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-doctoralia-teal focus:ring-doctoralia-teal"
                                />
                                <span className="text-gray-600">Recordarme</span>
                            </label>
                            <a href="mailto:soporte@doctorconnect.es?subject=Recuperar%20contrase%C3%B1a" className="text-doctoralia-teal font-semibold hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-doctoralia-teal text-white py-4 rounded-xl font-bold text-lg hover:bg-[#059669] transition-all shadow-lg shadow-teal-100 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Iniciando sesión...
                                </>
                            ) : (
                                "Iniciar sesión"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-500 text-sm">
                            ¿No tienes cuenta?{" "}
                            <a href="/doctor/login?action=register" className="text-doctoralia-teal font-semibold hover:underline">
                                Regístrate como profesional
                            </a>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-teal-50 border border-teal-100 rounded-xl">
                    <p className="text-sm text-teal-800 font-medium mb-2">🔑 Credenciales de prueba:</p>
                    <p className="text-sm text-teal-700">
                        Email: <code className="bg-teal-100 px-1 rounded">elena@caresalud.es</code>
                    </p>
                    <p className="text-sm text-teal-700">
                        Contraseña: <code className="bg-teal-100 px-1 rounded">doctor123</code>
                    </p>
                </div>
            </div>
        </div>
    );
}
