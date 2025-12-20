"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Menu, Search, ChevronDown, LogOut, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    // Set initial scroll state
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${mounted && scrolled ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100' : 'bg-[#0C6749] backdrop-blur-sm shadow-md border-b border-gray-100/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-48 h-12 group-hover:scale-105 transition-transform">
                  <Image 
                    src="/logo.png" 
                    alt="care salud" 
                    width={192} 
                    height={48} 
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              <nav className="hidden lg:flex items-center space-x-8">
                <Link href="/especialidades" className={`${mounted && scrolled ? 'text-gray-600 hover:text-doctoralia-teal' : 'text-white hover:text-emerald-200'} font-bold transition relative group`}>
                  Especialidades
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${mounted && scrolled ? 'bg-doctoralia-teal' : 'bg-white'} transition-all group-hover:w-full`} />
                </Link>
                <Link href="/enfermedades" className={`${mounted && scrolled ? 'text-gray-600 hover:text-doctoralia-teal' : 'text-white hover:text-emerald-200'} font-bold transition relative group`}>
                  Enfermedades
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${mounted && scrolled ? 'bg-doctoralia-teal' : 'bg-white'} transition-all group-hover:w-full`} />
                </Link>
                <Link href="/seguros" className={`${mounted && scrolled ? 'text-gray-600 hover:text-doctoralia-teal' : 'text-white hover:text-emerald-200'} font-bold flex items-center gap-1 transition relative group`}>
                  Seguros <ChevronDown className={`w-4 h-4 ${mounted && scrolled ? 'text-gray-600' : 'text-white'}`} />
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${mounted && scrolled ? 'bg-doctoralia-teal' : 'bg-white'} transition-all group-hover:w-full`} />
                </Link>
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
                    className={`flex items-center gap-2 ${mounted && scrolled ? 'text-gray-700 bg-gray-50 hover:text-doctoralia-teal border-gray-100' : 'text-white bg-white/20 hover:bg-white/30 border-white/30'} font-bold transition px-3 py-2 rounded-xl border backdrop-blur-sm`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-doctoralia-teal to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                    <ChevronDown className={`w-4 h-4 ${mounted && scrolled ? 'text-gray-700' : 'text-white'}`} />
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
                  className={`flex items-center gap-2 ${mounted && scrolled ? 'text-gray-700 bg-white hover:text-doctoralia-teal border-gray-200' : 'text-white bg-white/20 hover:bg-white/30 border-white/30'} font-bold transition px-4 py-2.5 rounded-xl border backdrop-blur-sm shadow-sm hover:shadow-md`}
                >
                  <User className={`w-5 h-5 ${mounted && scrolled ? 'text-gray-700' : 'text-white'}`} />
                  <span className="hidden sm:inline">Iniciar sesión</span>
                </button>
              )}

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`lg:hidden p-2 ${mounted && scrolled ? 'text-gray-500 hover:bg-gray-100' : 'text-white hover:bg-white/20'} rounded-xl transition`}
              >
                {showMobileMenu ? <X className={`w-6 h-6 ${mounted && scrolled ? 'text-gray-500' : 'text-white'}`} /> : <Menu className={`w-6 h-6 ${mounted && scrolled ? 'text-gray-500' : 'text-white'}`} />}
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
