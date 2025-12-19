"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
    city: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, name: string, city: string) => Promise<boolean>;
    logout: () => void;
    signInWithApple: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "docmed_user_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(AUTH_KEY);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem(AUTH_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Mock login - in production, this would call your API
        // For demo, accept any email with password "demo123"
        if (password.length >= 6) {
            const newUser: User = {
                id: crypto.randomUUID(),
                email,
                name: email.split('@')[0],
                city: 'Madrid',
            };
            setUser(newUser);
            localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
            return true;
        }
        return false;
    };

    const signup = async (email: string, password: string, name: string, city: string): Promise<boolean> => {
        // Mock signup - in production, this would call your API
        if (email && password.length >= 6 && name && city) {
            const newUser: User = {
                id: crypto.randomUUID(),
                email,
                name,
                city,
            };
            setUser(newUser);
            localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_KEY);
    };

    const signInWithApple = async (): Promise<boolean> => {
        // Mock Apple Sign In - in production, this would use Apple's OAuth
        const mockUser: User = {
            id: crypto.randomUUID(),
            email: 'apple-user@icloud.com',
            name: 'Usuario Apple',
            city: 'Madrid',
        };
        setUser(mockUser);
        localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout, signInWithApple }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
