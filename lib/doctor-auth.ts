"use client";

import { Doctor } from "@/types";
import { MOCK_DOCTORS } from "./constants";

// Mock doctor credentials (email derived from name)
const MOCK_CREDENTIALS: Record<string, { password: string; doctorId: string }> = {
    "elena@caresalud.es": { password: "doctor123", doctorId: "1" },
    "javier@caresalud.es": { password: "doctor123", doctorId: "2" },
    "sofia@caresalud.es": { password: "doctor123", doctorId: "3" },
    "miguel@caresalud.es": { password: "doctor123", doctorId: "4" },
};

const AUTH_KEY = "caresalud_auth";
const DOCTORS_KEY = "caresalud_doctors";

// Initialize doctors in localStorage if not present
function initDoctors(): Doctor[] {
    if (typeof window === "undefined") return MOCK_DOCTORS;

    const stored = localStorage.getItem(DOCTORS_KEY);
    if (!stored) {
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(MOCK_DOCTORS));
        return MOCK_DOCTORS;
    }
    return JSON.parse(stored);
}

// Get all doctors (with any edits)
export function getDoctors(): Doctor[] {
    return initDoctors();
}

// Get a single doctor by ID
export function getDoctorById(id: string): Doctor | undefined {
    const doctors = getDoctors();
    return doctors.find((d) => d.id === id);
}

// Update a doctor's profile
export function updateDoctor(updatedDoctor: Doctor): Doctor {
    if (typeof window === "undefined") return updatedDoctor;

    const doctors = getDoctors();
    const index = doctors.findIndex((d) => d.id === updatedDoctor.id);
    if (index !== -1) {
        doctors[index] = updatedDoctor;
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(doctors));
    }
    return updatedDoctor;
}

// Login function
export function login(email: string, password: string): Doctor | null {
    if (typeof window === "undefined") return null;

    const cred = MOCK_CREDENTIALS[email.toLowerCase()];
    if (!cred || cred.password !== password) {
        return null;
    }

    const doctor = getDoctorById(cred.doctorId);
    if (!doctor) return null;

    // Store auth session
    localStorage.setItem(AUTH_KEY, JSON.stringify({ doctorId: doctor.id, email }));
    return doctor;
}

// Logout function
export function logout(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(AUTH_KEY);
}

// Get current logged-in doctor
export function getCurrentDoctor(): Doctor | null {
    if (typeof window === "undefined") return null;

    const authData = localStorage.getItem(AUTH_KEY);
    if (!authData) return null;

    try {
        const { doctorId } = JSON.parse(authData);
        return getDoctorById(doctorId) || null;
    } catch {
        return null;
    }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    return getCurrentDoctor() !== null;
}
