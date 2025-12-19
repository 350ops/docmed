"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentDoctor, logout } from "@/lib/doctor-auth";
import { Doctor } from "@/types";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Search, LogOut, Bell, Menu, X } from "lucide-react";

export default function DoctorDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const currentDoctor = getCurrentDoctor();
        if (!currentDoctor) {
            router.push("/doctor/login");
        } else {
            setDoctor(currentDoctor);
            setIsLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        logout();
        router.push("/doctor/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 bg-doctoralia-teal rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Search className="text-white w-7 h-7" />
                    </div>
                    <p className="text-gray-500">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <DoctorSidebar />

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform lg:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-bold text-lg">Menú</span>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <DoctorSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-doctoralia-teal rounded-lg flex items-center justify-center">
                                    <Search className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xl font-bold text-gray-900 hidden sm:inline">
                                    doctor<span className="text-doctoralia-teal">connect</span>
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </button>

                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                <img
                                    src={doctor?.image}
                                    alt={doctor?.name}
                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                                />
                                <div className="hidden sm:block">
                                    <p className="font-semibold text-gray-900 text-sm">
                                        {doctor?.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{doctor?.specialty}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg transition"
                                title="Cerrar sesión"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
