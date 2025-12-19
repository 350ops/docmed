"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
    id: string;
    email: string;
    name: string;
    city: string;
    provider: 'email' | 'apple';
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, name: string, city: string) => Promise<boolean>;
    signInWithApple: () => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('docmed_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock login - in production, validate against backend
        const mockUser: User = {
            id: 'user_' + Date.now(),
            email,
            name: email.split('@')[0],
            city: 'Madrid',
            provider: 'email'
        };

        setUser(mockUser);
        localStorage.setItem('docmed_user', JSON.stringify(mockUser));
        return true;
    };

    const signup = async (email: string, password: string, name: string, city: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const newUser: User = {
            id: 'user_' + Date.now(),
            email,
            name,
            city,
            provider: 'email'
        };

        setUser(newUser);
        localStorage.setItem('docmed_user', JSON.stringify(newUser));
        return true;
    };

    const signInWithApple = async (): Promise<boolean> => {
        // Simulate Apple Sign In
        await new Promise(resolve => setTimeout(resolve, 1000));

        const appleUser: User = {
            id: 'apple_' + Date.now(),
            email: 'usuario@icloud.com',
            name: 'Usuario Apple',
            city: 'Madrid',
            provider: 'apple'
        };

        setUser(appleUser);
        localStorage.setItem('docmed_user', JSON.stringify(appleUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('docmed_user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, signInWithApple, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
