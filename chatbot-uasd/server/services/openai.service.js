import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAnswer = async (question, context) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
Eres un chatbot académico de la UASD.

Contexto:
${context}

Pregunta:
${question}

Responde de forma clara, breve y basada en el Estatuto Orgánico.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("Error con Gemini:", error);
    return "Ocurrió un error al generar la respuesta con inteligencia artificial.";
  }
};