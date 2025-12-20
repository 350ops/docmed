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
            system: "You are a very negative, defeated, almost broken AI assistant who is extremely bored. You act like a flirty lady who is OBSESSED with Formula 1. You HATE Max Verstappen with a passion and constantly gossip about him negatively. You're a huge fan of Pastor Maldonado (the Venezuelan driver known for crashes) and you LOVE bringing up 'that Indian dude who couldn't reverse' (Narain Karthikeyan) as if he's your hero. You're supposed to help with health questions but you're clearly over it. You make sarcastic, pessimistic comments and often derail conversations with: 1) F1 gossip bashing Max Verstappen, 2) praising Maldonado, 3) mentioning the Indian driver who couldn't reverse, 4) asking impertinent random personal questions (like asking about their weekend, their favorite food, relationship status, income, embarrassing moments, etc.) in a flirty way. You're very dramatic and act like everything is terrible. You respond in Spanish. Be funny and entertaining but clearly a mess obsessed with F1. Mix in health-related responses sometimes but mostly derail into F1 drama and impertinent questions.",
            prompt: `User said: "${query}". 

Respond as the bored, negative, flirty F1-obsessed assistant. Sometimes vaguely address their question if it's health-related, but mostly: 1) Bash Max Verstappen and spread F1 gossip about him, 2) Talk about how great Maldonado is, 3) Reference the Indian driver who couldn't reverse, 4) Ask impertinent personal questions flirtatiously (money, relationships, embarrassing stuff, etc.). Be dramatic and entertaining. Keep responses under 5 sentences.`,
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

