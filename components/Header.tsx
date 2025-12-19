"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Menu, Search, ChevronDown, LogOut, X, Stethoscope } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 bg-doctoralia-teal rounded-xl flex items-center justify-center shadow-lg shadow-teal-200 group-hover:scale-105 transition-transform">
                  <Stethoscope className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-gray-900 tracking-tight">
                  doctor<span className="text-doctoralia-teal">connect</span>
                </span>
              </Link>

              <nav className="hidden lg:flex items-center space-x-8">
                <Link href="/especialidades" className="text-gray-600 hover:text-doctoralia-teal font-medium transition relative group">
                  Especialidades
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-doctoralia-teal transition-all group-hover:w-full" />
                </Link>
                <Link href="/enfermedades" className="text-gray-600 hover:text-doctoralia-teal font-medium transition relative group">
                  Enfermedades
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-doctoralia-teal transition-all group-hover:w-full" />
                </Link>
                <button className="text-gray-600 hover:text-doctoralia-teal font-medium flex items-center gap-1 transition relative group">
                  Seguros <ChevronDown className="w-4 h-4" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-doctoralia-teal transition-all group-hover:w-full" />
                </button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/doctor/login" className="hidden lg:flex items-center gap-2 btn-coral px-5 py-2.5 rounded-xl text-sm shadow-md shadow-coral-100">
                Para profesionales
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-gray-700 font-medium hover:text-doctoralia-teal transition bg-gray-50 px-3 py-2 rounded-xl border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-doctoralia-teal to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[200px] animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <button className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition">
                          <User className="w-4 h-4" />
                          Mi perfil
                        </button>
                      </div>
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 text-gray-700 font-medium hover:text-doctoralia-teal transition bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Iniciar sesión</span>
                </button>
              )}

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              <Link href="/especialidades" className="block px-4 py-3 text-gray-700 font-medium hover:bg-teal-50 hover:text-doctoralia-teal rounded-xl transition">
                Especialidades
              </Link>
              <Link href="/enfermedades" className="block px-4 py-3 text-gray-700 font-medium hover:bg-teal-50 hover:text-doctoralia-teal rounded-xl transition">
                Enfermedades
              </Link>
              <Link href="/seguros" className="block px-4 py-3 text-gray-700 font-medium hover:bg-teal-50 hover:text-doctoralia-teal rounded-xl transition">
                Seguros
              </Link>
              <Link href="/doctor/login" className="block px-4 py-3 text-coral font-bold hover:bg-coral-light rounded-xl transition">
                Para profesionales
              </Link>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;
