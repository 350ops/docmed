"use client";

import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { login, signup, signInWithApple } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const success = await login(email, password);
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

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (!name.trim() || !city.trim()) {
                setError('Por favor, completa todos los campos');
                setIsLoading(false);
                return;
            }
            const success = await signup(email, password, name, city);
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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">Bienvenido</DialogTitle>
                        <DialogDescription className="text-primary-foreground/80">
                            Accede o crea tu cuenta para reservar citas
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6">
                    {/* Apple Sign In */}
                    <Button
                        onClick={handleAppleSignIn}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full bg-black text-white hover:bg-gray-900 hover:text-white font-semibold py-6 flex items-center justify-center gap-3 mb-4 border-0"
                    >
                        <AppleIcon className="w-5 h-5" />
                        Continuar con Apple
                    </Button>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-sm text-muted-foreground font-medium">o con email</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login" className="font-semibold">Iniciar sesión</TabsTrigger>
                            <TabsTrigger value="signup" className="font-semibold">Crear cuenta</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Correo electrónico</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="login-email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="login-password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm font-medium">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" disabled={isLoading} className="w-full py-6 font-bold">
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Iniciar sesión'}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup">
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-name">Nombre completo</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="signup-name"
                                            type="text"
                                            placeholder="Juan García"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-city">Ciudad</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="signup-city"
                                            type="text"
                                            placeholder="Madrid"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Correo electrónico</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            placeholder="Mínimo 6 caracteres"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm font-medium">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" disabled={isLoading} className="w-full py-6 font-bold">
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Crear cuenta'}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Apple Icon component
const AppleIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.05 20.28c-.96.95-2.03.88-3.06.41-1.09-.49-2.08-.51-3.23 0-1.41.63-2.15.45-3-.41C3.05 15.18 3.93 8.17 9.19 7.9c1.33.07 2.25.73 3.04.78.96-.19 1.87-.82 2.92-.87 1.29-.07 2.41.45 3.11 1.48-2.08 1.5-1.55 4.88.6 5.82-.48 1.28-.86 2.48-1.81 5.17zM12.05 7.82c-.15-2.15 1.52-4.04 3.52-4.2.25 2.27-1.87 4.37-3.52 4.2z" />
    </svg>
);

export default AuthModal;
