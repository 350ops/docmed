"use client";

import { generateText, streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// API Key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

const google = createGoogleGenerativeAI({
    apiKey,
});

export async function getHealthAssistanceStream(query: string) {
    if (!apiKey) {
        throw new Error("Clave API no configurada");
    }

    return streamText({
        model: google('gemini-3-pro-preview'),
        system: "Eres un asistente virtual de salud profesional, empático y experto. Tu objetivo es ayudar a los pacientes a navegar por el sistema de salud, orientarlos sobre posibles especialistas según sus síntomas y proporcionar información general de salud de manera clara y segura. Siempre aclara que no eres un médico y que en caso de urgencia deben acudir a un centro médico. Responde de forma concisa y en español.",
        prompt: query,
        temperature: 0.7,
    });
}

export async function getHealthAssistance(query: string): Promise<string> {
    if (!apiKey) {
        return "Para usar el asistente de salud, configura tu clave API de Gemini en el archivo .env.local";
    }

    try {
        const { text } = await generateText({
            model: google('gemini-3-pro-preview'),
            system: "Eres un asistente virtual de salud profesional, empático y experto. Tu objetivo es ayudar a los pacientes a navegar por el sistema de salud, orientarlos sobre posibles especialistas según sus síntomas y proporcionar información general de salud de manera clara y segura. Siempre aclara que no eres un médico y que en caso de urgencia deben acudir a un centro médico. Responde de forma concisa y en español.",
            prompt: query,
            temperature: 0.7,
        });

        return text || "Lo siento, no he podido procesar tu consulta. ¿En qué más puedo ayudarte?";
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
            model: google('gemini-3-pro-preview'),
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

