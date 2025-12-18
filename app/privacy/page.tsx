import React from "react";
import Link from "next/link";
import { Search, Shield, Lock, Eye, FileText, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-doctoralia-teal rounded-lg flex items-center justify-center">
                                <Search className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900 tracking-tight">
                                doctor<span className="text-doctoralia-teal">connect</span>
                            </span>
                        </Link>
                        <Link
                            href="/"
                            className="text-doctoralia-teal font-semibold hover:underline"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-gradient-to-b from-[#f0f9f8] to-white py-16 border-b border-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 bg-doctoralia-teal rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Tu privacidad es importante para nosotros. Aquí explicamos cómo
                        recopilamos, usamos y protegemos tu información.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Última actualización: Diciembre 2024
                    </p>
                </div>
            </section>

            {/* Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
                    {/* Quick Navigation */}
                    <div className="mb-12 p-6 bg-gray-50 rounded-2xl">
                        <h2 className="font-bold text-gray-900 mb-4">Índice</h2>
                        <nav className="grid sm:grid-cols-2 gap-2 text-sm">
                            <a href="#recopilacion" className="text-doctoralia-teal hover:underline">
                                1. Información que recopilamos
                            </a>
                            <a href="#uso" className="text-doctoralia-teal hover:underline">
                                2. Cómo usamos tu información
                            </a>
                            <a href="#compartir" className="text-doctoralia-teal hover:underline">
                                3. Compartir información
                            </a>
                            <a href="#seguridad" className="text-doctoralia-teal hover:underline">
                                4. Seguridad de datos
                            </a>
                            <a href="#derechos" className="text-doctoralia-teal hover:underline">
                                5. Tus derechos
                            </a>
                            <a href="#cookies" className="text-doctoralia-teal hover:underline">
                                6. Cookies
                            </a>
                            <a href="#contacto" className="text-doctoralia-teal hover:underline">
                                7. Contacto
                            </a>
                        </nav>
                    </div>

                    {/* Sections */}
                    <div className="space-y-12">
                        {/* Section 1 */}
                        <section id="recopilacion">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    1. Información que recopilamos
                                </h2>
                            </div>
                            <div className="text-gray-600 leading-relaxed space-y-4 pl-13">
                                <p>
                                    Recopilamos información que nos proporcionas directamente
                                    cuando:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Creas una cuenta en nuestra plataforma</li>
                                    <li>Solicitas una cita con un profesional</li>
                                    <li>Completas formularios de contacto</li>
                                    <li>Te comunicas con nuestro servicio de atención al cliente</li>
                                </ul>
                                <p>
                                    Esta información puede incluir tu nombre, dirección de correo
                                    electrónico, número de teléfono, información médica relevante
                                    y preferencias de atención.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="uso">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    2. Cómo usamos tu información
                                </h2>
                            </div>
                            <div className="text-gray-600 leading-relaxed space-y-4">
                                <p>Utilizamos la información recopilada para:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Facilitar la reserva de citas médicas</li>
                                    <li>Enviar confirmaciones y recordatorios de citas</li>
                                    <li>Mejorar nuestros servicios y experiencia de usuario</li>
                                    <li>Comunicarnos contigo sobre actualizaciones importantes</li>
                                    <li>Cumplir con obligaciones legales y regulatorias</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section id="compartir">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-purple-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    3. Compartir información
                                </h2>
                            </div>
                            <div className="text-gray-600 leading-relaxed space-y-4">
                                <p>
                                    Compartimos tu información únicamente en las siguientes
                                    circunstancias:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        <strong>Con profesionales de salud:</strong> Compartimos la
                                        información necesaria con el médico que elijas para
                                        facilitar tu atención.
                                    </li>
                                    <li>
                                        <strong>Proveedores de servicios:</strong> Trabajamos con
                                        terceros que nos ayudan a operar nuestra plataforma.
                                    </li>
                                    <li>
                                        <strong>Requisitos legales:</strong> Cuando sea requerido
                                        por ley o autoridades competentes.
                                    </li>
                                </ul>
                                <p className="bg-teal-50 p-4 rounded-xl text-teal-800 font-medium">
                                    ⚠️ Nunca vendemos tu información personal a terceros.
                                </p>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="seguridad">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    4. Seguridad de datos
                                </h2>
                            </div>
                            <div className="text-gray-600 leading-relaxed space-y-4">
                                <p>
                                    Implementamos medidas de seguridad técnicas y organizativas
                                    para proteger tu información, incluyendo:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Cifrado SSL/TLS para todas las comunicaciones</li>
                                    <li>Almacenamiento seguro con acceso restringido</li>
                                    <li>Auditorías de seguridad regulares</li>
                                    <li>Formación del personal en protección de datos</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section id="derechos">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-yellow-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    5. Tus derechos
                                </h2>
                            </div>
                            <div className="text-gray-600 leading-relaxed space-y-4">
                                <p>
                                    De acuerdo con el RGPD, tienes derecho a:
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="font-semibold text-gray-900 mb-1">Acceso</p>
                                        <p className="text-sm">
                                            Solicitar una copia de tus datos personales
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="font-semibold text-gray-900 mb-1">Rectificación</p>
                                        <p className="text-sm">
                                            Corregir datos inexactos o incompletos
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="font-semibold text-gray-900 mb-1">Supresión</p>
                                        <p className="text-sm">
                                            Solicitar la eliminación de tus datos
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="font-semibold text-gray-900 mb-1">Portabilidad</p>
                                        <p className="text-sm">
                                            Recibir tus datos en formato estructurado
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section id="cookies">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-orange-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">6. Cookies</h2>
                            </div>
                            <div className="text-gray-600 leading-relaxed space-y-4">
                                <p>
                                    Utilizamos cookies y tecnologías similares para mejorar tu
                                    experiencia. Puedes gestionar tus preferencias de cookies en
                                    cualquier momento a través de la configuración de tu
                                    navegador.
                                </p>
                                <p>
                                    Para más información, consulta nuestra{" "}
                                    <Link href="/cookies" className="text-doctoralia-teal hover:underline">
                                        Política de Cookies
                                    </Link>
                                    .
                                </p>
                            </div>
                        </section>

                        {/* Section 7 */}
                        <section id="contacto">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-teal-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">7. Contacto</h2>
                            </div>
                            <div className="text-gray-600 leading-relaxed space-y-4">
                                <p>
                                    Si tienes preguntas sobre esta política o sobre el
                                    tratamiento de tus datos, puedes contactarnos:
                                </p>
                                <div className="p-6 bg-gray-50 rounded-2xl">
                                    <p className="font-semibold text-gray-900 mb-2">
                                        DoctorConnect Spain S.L.
                                    </p>
                                    <p>Email: privacidad@doctorconnect.es</p>
                                    <p>Dirección: Calle de la Salud, 123, 28001 Madrid</p>
                                    <p>Delegado de Protección de Datos: dpo@doctorconnect.es</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Related Links */}
                <div className="mt-12 grid sm:grid-cols-2 gap-6">
                    <Link
                        href="/terms"
                        className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition group"
                    >
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-doctoralia-teal transition">
                            Términos de Uso →
                        </h3>
                        <p className="text-sm text-gray-500">
                            Condiciones generales de uso de la plataforma
                        </p>
                    </Link>
                    <Link
                        href="/cookies"
                        className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition group"
                    >
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-doctoralia-teal transition">
                            Política de Cookies →
                        </h3>
                        <p className="text-sm text-gray-500">
                            Información sobre el uso de cookies
                        </p>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    <p>© 2024 DoctorConnect Spain S.L. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
