
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getHealthAssistance(query: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User symptoms or question: "${query}". 
      Acting as a medical triage assistant for a platform like Doctoralia, provide a brief, professional recommendation of which medical specialty the user should consult. 
      Do NOT give medical advice or diagnosis. 
      Suggest 1-2 specialties and a brief reason why. 
      Keep it under 3 sentences. 
      Response in Spanish please.`,
      config: {
        systemInstruction: "You are a professional medical triage assistant for the Doctoralia platform. Your goal is to guide users to the right specialist based on their description of symptoms.",
        temperature: 0.7,
      }
    });
    
    return response.text || "Lo siento, no he podido procesar tu solicitud. Por favor, consulta a un médico general.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error al conectar con el asistente de salud. Por favor, intenta de nuevo más tarde.";
  }
}

export async function smartSearchFilter(query: string): Promise<{ specialty: string, location: string }> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract the requested medical specialty and city from this search query: "${query}". 
      Return only a JSON object like {"specialty": "name", "location": "city"}. 
      If not mentioned, return "all" for the missing field. 
      Specialties should be one of: Psicólogo, Dermatólogo, Ginecólogo, Pediatra, Cardiólogo, Dentista, Oftalmólogo, Nutricionista.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || '{"specialty": "all", "location": "all"}');
    return result;
  } catch (error) {
    return { specialty: 'all', location: 'all' };
  }
}
