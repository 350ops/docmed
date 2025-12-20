"use client";

import { Doctor } from "@/types";
import { MOCK_DOCTORS } from "./constants";
import {
    ensureDoctorRecord,
    getDoctorProfiles,
    getDoctorRecord,
    updateDoctorProfile,
} from "./doctor-data";

// Mock doctor credentials (email derived from name)
const MOCK_CREDENTIALS: Record<string, { password: string; doctorId: string }> = {
    "elena@caresalud.es": { password: "doctor123", doctorId: "1" },
    "javier@caresalud.es": { password: "doctor123", doctorId: "2" },
    "sofia@caresalud.es": { password: "doctor123", doctorId: "3" },
    "miguel@caresalud.es": { password: "doctor123", doctorId: "4" },
};

const AUTH_KEY = "caresalud_auth";

// Get all doctors (with any edits)
export function getDoctors(): Doctor[] {
    return getDoctorProfiles();
}

// Get a single doctor by ID
export function getDoctorById(id: string): Doctor | undefined {
    const record = getDoctorRecord(id || "");
    if (!record) return undefined;
    return { ...record.profile, availability: record.availability };
}

// Update a doctor's profile
export function updateDoctor(updatedDoctor: Doctor): Doctor {
    if (typeof window === "undefined") return updatedDoctor;
    ensureDoctorRecord(updatedDoctor);
    updateDoctorProfile(updatedDoctor);
    return updatedDoctor;
}

// Login function
export function login(email: string, password: string): Doctor | null {
    if (typeof window === "undefined") return null;

    const cred = MOCK_CREDENTIALS[email.toLowerCase()];
    if (!cred || cred.password !== password) {
        return null;
    }

    const doctor = getDoctorById(cred.doctorId) || ensureDoctorRecord(MOCK_DOCTORS.find(d => d.id === cred.doctorId)!).profile;
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
