/**
 * CareSalud DocBot CLI
 * Recreates the web chat (DocBot) using Gemini 2.0 Flash.
 */

const readline = require('readline');

// Standard fetch is available in Node 18+
// If you are on an older version, this script might fail.

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DEFAULT_API_KEY = process.env.GEMINI_API_KEY || '';

/**
 * Calls Gemini API to get a health assistance recommendation.
 * Replicates logic from main:lib/geminiService.ts
 */
async function getHealthAssistance(query, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
        systemInstruction: {
            parts: [{
                text: "You are a professional medical triage assistant for the Doctoralia platform. Your goal is to guide users to the right specialist based on their description of symptoms."
            }]
        },
        contents: [{
            parts: [{
                text: `User symptoms or question: "${query}". 
      Acting as a medical triage assistant for a platform like Doctoralia, provide a brief, professional recommendation of which medical specialty the user should consult. 
      Do NOT give medical advice or diagnosis. 
      Suggest 1-2 specialties and a brief reason why. 
      Keep it under 3 sentences. 
      Response in Spanish please.`
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250,
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.error) {
            return `\x1b[31m[API Error]\x1b[0m ${data.error.message}`;
        }

        if (!data.candidates || data.candidates.length === 0) {
            return "Lo siento, no he podido procesar tu solicitud. Por favor, consulta a un médico general.";
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return `\x1b[31m[Connection Error]\x1b[0m ${error.message}`;
    }
}

async function startChat() {
    console.log('\x1b[36m' + '='.repeat(50));
    console.log('       CareSalud DocBot - CLI Edition');
    console.log('='.repeat(50) + '\x1b[0m');

    let apiKey = DEFAULT_API_KEY;

    if (!apiKey) {
        console.log('\x1b[33mNo GEMINI_API_KEY found in environment variables.\x1b[0m');
        apiKey = await new Promise(resolve => {
            rl.question('Please enter your Gemini API Key: ', (input) => {
                resolve(input.trim());
            });
        });
    }

    if (!apiKey) {
        console.log('\x1b[31mError: API Key is required to run the chat.\x1b[0m');
        process.exit(1);
    }

    console.log('\n\x1b[32mDocBot:\x1b[0m ¡Hola! Soy tu asistente de salud virtual. Cuéntame qué síntomas tienes o qué especialidad buscas y te ayudaré a encontrar al mejor profesional.');
    console.log('(Escribe \x1b[35m"salir"\x1b[0m para terminar la sesión)\n');

    const chatLoop = () => {
        rl.question('\x1b[34mTú:\x1b[0m ', async (input) => {
            const query = input.trim();

            if (query.toLowerCase() === 'salir' || query.toLowerCase() === 'exit') {
                console.log('\n\x1b[32mDocBot:\x1b[0m ¡Hasta pronto! Cuídate mucho.');
                rl.close();
                return;
            }

            if (!query) {
                chatLoop();
                return;
            }

            process.stdout.write('\x1b[32mDocBot:\x1b[0m \x1b[2mEscribiendo...\x1b[0m');

            const response = await getHealthAssistance(query, apiKey);

            // Clear the "Escribiendo..." line
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);

            console.log(`\x1b[32mDocBot:\x1b[0m ${response}\n`);
            chatLoop();
        });
    };

    chatLoop();
}

startChat();
