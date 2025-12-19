"use client";

import React, { useState } from 'react';
import { X, Mail, Lock, User, MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

type AuthMode = 'login' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { login, signup, signInWithApple } = useAuth();
    const [mode, setMode] = useState<AuthMode>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            let success = false;
            if (mode === 'login') {
                success = await login(email, password);
            } else {
                if (!name.trim() || !city.trim()) {
                    setError('Por favor, completa todos los campos');
                    setIsLoading(false);
                    return;
                }
                success = await signup(email, password, name, city);
            }

            if (success) {
                onSuccess?.();
                onClose();
                resetForm();
            }
        } catch (err) {
            setError('Ha ocurrido un error. Inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAppleSignIn = async () => {
        setError(null);
        setIsLoading(true);
        try {
            const success = await signInWithApple();
            if (success) {
                onSuccess?.();
                onClose();
                resetForm();
            }
        } catch (err) {
            setError('Error al iniciar sesión con Apple');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setCity('');
        setError(null);
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setError(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gradient-to-br from-doctoralia-teal to-teal-600 p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold">
                        {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
                    </h2>
                    <p className="text-teal-100 mt-1">
                        {mode === 'login'
                            ? 'Accede a tu cuenta para reservar citas'
                            : 'Regístrate para gestionar tus citas'}
                    </p>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Apple Sign In */}
                    <button
                        onClick={handleAppleSignIn}
                        disabled={isLoading}
                        className="w-full bg-black text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition mb-4 disabled:opacity-50"
                    >
                        <AppleIcon className="w-5 h-5" />
                        Continuar con Apple
                    </button>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-sm text-gray-400 font-medium">o</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'signup' && (
                            <>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Nombre completo"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-doctoralia-teal/20 focus:border-doctoralia-teal transition"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Ciudad"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-doctoralia-teal/20 focus:border-doctoralia-teal transition"
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-doctoralia-teal/20 focus:border-doctoralia-teal transition"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-doctoralia-teal/20 focus:border-doctoralia-teal transition"
                                required
                                minLength={6}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-doctoralia-teal text-white font-bold py-3 px-4 rounded-xl hover:bg-[#00af94] transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : mode === 'login' ? (
                                'Iniciar sesión'
                            ) : (
                                'Crear cuenta'
                            )}
                        </button>
                    </form>

                    {/* Switch mode */}
                    <p className="text-center text-gray-500 mt-6">
                        {mode === 'login' ? (
                            <>
                                ¿No tienes cuenta?{' '}
                                <button onClick={switchMode} className="text-doctoralia-teal font-semibold hover:underline">
                                    Regístrate
                                </button>
                            </>
                        ) : (
                            <>
                                ¿Ya tienes cuenta?{' '}
                                <button onClick={switchMode} className="text-doctoralia-teal font-semibold hover:underline">
                                    Inicia sesión
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Apple Icon component
const AppleIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.05 20.28c-.96.95-2.03.88-3.06.41-1.09-.49-2.08-.51-3.23 0-1.41.63-2.15.45-3-.41C3.05 15.18 3.93 8.17 9.19 7.9c1.33.07 2.25.73 3.04.78.96-.19 1.87-.82 2.92-.87 1.29-.07 2.41.45 3.11 1.48-2.08 1.5-1.55 4.88.6 5.82-.48 1.28-.86 2.48-1.81 5.17zM12.05 7.82c-.15-2.15 1.52-4.04 3.52-4.2.25 2.27-1.87 4.37-3.52 4.2z" />
    </svg>
);

export default AuthModal;
