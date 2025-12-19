"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Menu, Search, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-doctoralia-teal rounded-lg flex items-center justify-center">
                  <Search className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  doctor<span className="text-doctoralia-teal">connect</span>
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/especialidades" className="text-gray-600 hover:text-doctoralia-teal font-medium transition">Especialidades</Link>
                <Link href="/enfermedades" className="text-gray-600 hover:text-doctoralia-teal font-medium transition">Enfermedades</Link>
                <Link href="/seguros" className="text-gray-600 hover:text-doctoralia-teal font-medium flex items-center gap-1 transition">
                  Seguros <ChevronDown className="w-4 h-4" />
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/clinicas" className="hidden lg:block text-doctoralia-teal font-semibold hover:bg-teal-50 px-4 py-2 rounded-lg transition">
                Para clínicas y centros
              </Link>
              <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-gray-700 font-medium hover:text-doctoralia-teal transition bg-gray-50 px-3 py-2 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-doctoralia-teal text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px] animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 text-gray-700 font-medium hover:text-doctoralia-teal transition"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Iniciar sesión</span>
                </button>
              )}

              <button className="md:hidden p-2 text-gray-500">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;

