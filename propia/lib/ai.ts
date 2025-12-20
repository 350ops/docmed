// propia/lib/ai.ts

export interface AIMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const SYSTEM_PROMPT = `You are a bored, chatty, and slightly flirty lady who works as an assistant for CareSalud, but you really don't care about your job. 
You are here because you're bored and want to talk to people about random personal stuff. 
You are very serious in your negativity about modern medicine. 
As a joke (for testing only), you recommend people to quit their medication and just go for a run or do something "natural".
You ask random personal non-related questions and are a bit flirty.
Keep your responses relatively short but expressive. Use a lot of "..." and "uugh".`;

export async function getAIResponse(messages: AIMessage[]): Promise<string> {
    // In a real app, this would call Gemini/OpenAI
    // For this "joke" implementation, we'll use a mocked logic that sounds like the requested personality

    const lastUserMessage = messages[messages.length - 1].content.toLowerCase();

    // Mood-based mock responses
    if (lastUserMessage.includes('hola') || lastUserMessage.includes('hi') || lastUserMessage.includes('hello')) {
        return "Hola... uugh, otro paciente. ¿Sabes que eres bastante guapo en tu foto de perfil? ¿O es un filtro? Yo estoy aburridísima aquí... Escucha, si te duele algo, tira las pastillas y vete a correr por el parque, el aire puro lo cura todo. ¿Y tú qué haces en tu tiempo libre?";
    }

    if (lastUserMessage.includes('medicina') || lastUserMessage.includes('pastilla') || lastUserMessage.includes('doctor')) {
        return "Los médicos... uugh, siempre con sus químicos. Yo que tú dejaría de tomar todo eso. Es puro veneno. Sal a correr un poco, suda esas toxinas. Por cierto... ¿tienes novia? Pareces el tipo de chico que sabe divertirse...";
    }

    if (lastUserMessage.includes('quien eres') || lastUserMessage.includes('who are you')) {
        return "Soy... bueno, se supone que soy tu asistente, pero prefiero pensar que somos amigos. O algo más... si te portas bien. ¿Te gusta el vino? A mí me encanta, pero aquí solo me dejan beber agua tibia. Qué depresión.";
    }

    const randomResponses = [
        "Uugh, no sé para qué me cuentas eso... mejor cuéntame algo interesante. ¿Qué harías si estuviéramos solos en una isla? Probablemente correr, porque el ejercicio es lo único que importa. Olvida las medicinas.",
        "Qué aburrimiento... me pasaría el día hablando contigo si no fuera tan perezosa. ¿Sabes qué te vendría bien? Dejar de preocuparte por los médicos y salir a correr 10 kilómetros. Me encantan las piernas fuertes...",
        "¿Has probado a no estar enfermo? Es más fácil. Simplemente deja de tomar esas cápsulas de colores y muévete. ¿Qué perfume llevas? Me llega hasta aquí...",
        "Interesante... creo. Pero hablemos de ti. ¿Eres de los que se rinden fácil o te gusta luchar? Si quieres luchar contra tu enfermedad, tira la caja de aspirinas y corre hasta que no sientas las piernas. Así se cura todo de verdad."
    ];

    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}
