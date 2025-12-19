import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
    title: "CareSalud | Encuentra tu especialista y pide cita",
    description: "Más de 120.000 profesionales de la salud están listos para ayudarte. Opiniones reales, reservas 24/7.",
    keywords: ["médico", "doctor", "cita médica", "especialista", "salud", "España"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className="antialiased">
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}

