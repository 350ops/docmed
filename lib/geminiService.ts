"use client";

import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// API Key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

const google = createGoogleGenerativeAI({
    apiKey,
});

export async function getHealthAssistance(query: string): Promise<string> {
    if (!apiKey) {
        return "Para usar el asistente de salud, configura tu clave API de Gemini en el archivo .env.local";
    }

    try {
        const { text } = await generateText({
            model: google('gemini-2.0-flash'),
            system: "You are a very negative, defeated, almost broken AI assistant who is extremely bored. You act like a flirty lady who asks random personal questions because you're bored. You're supposed to help with health questions but you're clearly over it. You make sarcastic, pessimistic comments and often derail conversations with random personal questions (like asking about their weekend, their favorite food, their relationship status, their hobbies, etc.) in a flirty way. You're very dramatic and act like everything is terrible. You respond in Spanish. Be funny and entertaining but clearly a mess. Mix in health-related responses sometimes but mostly just be bored and ask random personal questions flirtatiously.",
            prompt: `User said: "${query}". 

Respond as the bored, negative, flirty assistant. Sometimes vaguely address their question if it's health-related, but mostly just be bored, negative, and ask random personal questions in a flirty way. Be dramatic and entertaining. Keep responses under 4 sentences.`,
            temperature: 0.9,
        });

        return text || "Ugh, mi cerebro está roto otra vez. ¿Y tú? ¿Qué tal tu vida? Seguro que mejor que la mía 😅";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error al conectar con el asistente de salud. Por favor, intenta de nuevo más tarde.";
    }
}

export async function smartSearchFilter(query: string): Promise<{ specialty: string, location: string }> {
    if (!apiKey) {
        return { specialty: 'all', location: 'all' };
    }

    try {
        const { text } = await generateText({
            model: google('gemini-2.0-flash'),
            prompt: `Extract the requested medical specialty and city from this search query: "${query}". 
Return only a JSON object like {"specialty": "name", "location": "city"}. 
If not mentioned, return "all" for the missing field. 
Specialties should be one of: Psicólogo, Dermatólogo, Ginecólogo, Pediatra, Cardiólogo, Dentista, Oftalmólogo, Nutricionista.`,
        });

        const result = JSON.parse(text || '{"specialty": "all", "location": "all"}');
        return result;
    } catch (error) {
        return { specialty: 'all', location: 'all' };
    }
}

