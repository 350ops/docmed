"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Shield } from 'lucide-react';
import { getHealthAssistance } from '@/lib/geminiService';

const DocBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: '¡Hola! Soy tu asistente de salud virtual. Cuéntame qué síntomas tienes o qué especialidad buscas y te ayudaré a encontrar al mejor profesional.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getHealthAssistance(userMsg);

    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          data-docbot-trigger="true"
          className="bg-doctoralia-teal text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group border-4 border-white"
        >
          <span className="font-bold hidden group-hover:inline ml-2 pr-2">Asistente Virtual</span>
          <MessageSquare className="w-8 h-8" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[380px] h-[550px] max-w-[calc(100vw-2rem)] rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-doctoralia-teal p-5 flex items-center justify-between text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold leading-tight">DocBot AI</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-teal-100 uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-xl transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 scroll-smooth"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-doctoralia-teal text-white rounded-br-none shadow-lg shadow-teal-100'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-doctoralia-teal rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-doctoralia-teal rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-doctoralia-teal rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">Escribiendo...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white border-t border-gray-100">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe tus síntomas..."
                className="flex-1 bg-gray-100 border-none outline-none p-4 rounded-2xl text-sm focus:bg-gray-200 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-doctoralia-teal text-white p-4 rounded-2xl hover:bg-[#00af94] disabled:opacity-50 transition-all shadow-lg shadow-teal-100 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <div className="flex items-center justify-center gap-1.5 mt-4 opacity-50">
              {/* Added Shield to imports and fixed the missing name error */}
              <Shield className="w-3 h-3 text-gray-400" />
              <p className="text-[10px] text-gray-400 font-medium text-center">IA de orientación médica. Tus datos están cifrados.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocBot;
