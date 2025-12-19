"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Calendar, Settings, LayoutDashboard } from "lucide-react";

const navItems = [
    { href: "/doctor", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/doctor/profile", icon: User, label: "Mi Perfil" },
    { href: "/doctor/appointments", icon: Calendar, label: "Citas" },
    { href: "/doctor/settings", icon: Settings, label: "Ajustes" },
];

export default function DoctorSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex-shrink-0 hidden lg:block">
            <nav className="p-4 space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
                    Menú
                </p>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                    ? "bg-doctoralia-teal text-white shadow-md shadow-teal-100"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
