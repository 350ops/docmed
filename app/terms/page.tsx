import React from "react";
import Link from "next/link";
import { Search, FileText, CheckCircle } from "lucide-react";

export default function TermsOfServicePage() {
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
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Términos de Uso
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Condiciones generales que rigen el uso de la plataforma
                        CareSalud.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Última actualización: Diciembre 2024
                    </p>
                </div>
            </section>

            {/* Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
                    {/* Intro */}
                    <div className="mb-12 p-6 bg-teal-50 rounded-2xl border border-teal-100">
                        <p className="text-teal-800">
                            Al acceder y utilizar CareSalud, aceptas estos términos de
                            uso. Por favor, léelos detenidamente antes de utilizar nuestros
                            servicios.
                        </p>
                    </div>

                    <div className="space-y-10 text-gray-600 leading-relaxed">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold">
                                    1
                                </span>
                                Objeto del servicio
                            </h2>
                            <p className="mb-4">
                                CareSalud es una plataforma que facilita la conexión entre
                                pacientes y profesionales de la salud, permitiendo la búsqueda
                                de especialistas, visualización de información profesional y
                                solicitud de citas.
                            </p>
                            <p>
                                <strong>CareSalud no presta servicios médicos.</strong>{" "}
                                Actuamos únicamente como intermediarios entre pacientes y
                                profesionales sanitarios.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold">
                                    2
                                </span>
                                Registro y cuenta de usuario
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-doctoralia-teal mt-0.5 flex-shrink-0" />
                                    Debes proporcionar información veraz y actualizada
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-doctoralia-teal mt-0.5 flex-shrink-0" />
                                    Eres responsable de mantener la confidencialidad de tu cuenta
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-doctoralia-teal mt-0.5 flex-shrink-0" />
                                    Debes ser mayor de 18 años o contar con autorización parental
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-doctoralia-teal mt-0.5 flex-shrink-0" />
                                    Una cuenta por persona; no se permiten cuentas compartidas
                                </li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold">
                                    3
                                </span>
                                Uso aceptable
                            </h2>
                            <p className="mb-4">Te comprometes a:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Usar la plataforma solo para fines legítimos</li>
                                <li>No publicar contenido falso, ofensivo o ilegal</li>
                                <li>No intentar acceder a cuentas de otros usuarios</li>
                                <li>No utilizar sistemas automatizados sin autorización</li>
                                <li>Respetar la propiedad intelectual de CareSalud</li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold">
                                    4
                                </span>
                                Reserva de citas
                            </h2>
                            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                <p>
                                    <strong>Confirmación:</strong> La solicitud de cita está
                                    sujeta a confirmación por parte del profesional.
                                </p>
                                <p>
                                    <strong>Cancelaciones:</strong> Debes cancelar con al menos 24
                                    horas de antelación para evitar penalizaciones.
                                </p>
                                <p>
                                    <strong>No asistencia:</strong> La falta de asistencia
                                    reiterada puede resultar en restricciones de uso.
                                </p>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold">
                                    5
                                </span>
                                Limitación de responsabilidad
                            </h2>
                            <p className="mb-4">CareSalud no es responsable de:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    La calidad de los servicios prestados por los profesionales
                                </li>
                                <li>
                                    Daños derivados del uso de información médica de la plataforma
                                </li>
                                <li>
                                    Interrupciones del servicio por causas técnicas o de fuerza
                                    mayor
                                </li>
                                <li>Conducta de terceros usuarios de la plataforma</li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold">
                                    6
                                </span>
                                Modificaciones
                            </h2>
                            <p>
                                Nos reservamos el derecho de modificar estos términos en
                                cualquier momento. Los cambios serán notificados a través de la
                                plataforma y entrarán en vigor desde su publicación. El uso
                                continuado del servicio implica la aceptación de los nuevos
                                términos.
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold">
                                    7
                                </span>
                                Legislación aplicable
                            </h2>
                            <p>
                                Estos términos se rigen por la legislación española. Para
                                cualquier controversia, las partes se someten a los juzgados y
                                tribunales de Madrid, con renuncia a cualquier otro fuero que
                                pudiera corresponderles.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="pt-8 border-t border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                ¿Tienes preguntas?
                            </h2>
                            <p>
                                Si tienes dudas sobre estos términos, contáctanos en{" "}
                                <a
                                    href="mailto:legal@doctorconnect.es"
                                    className="text-doctoralia-teal hover:underline"
                                >
                                    legal@doctorconnect.es
                                </a>
                            </p>
                        </section>
                    </div>
                </div>

                {/* Related */}
                <div className="mt-12 grid sm:grid-cols-2 gap-6">
                    <Link
                        href="/privacy"
                        className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition group"
                    >
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-doctoralia-teal transition">
                            Política de Privacidad →
                        </h3>
                        <p className="text-sm text-gray-500">
                            Cómo protegemos tu información personal
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
                    <p>© 2024 CareSalud Spain S.L. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
