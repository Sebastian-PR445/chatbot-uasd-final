import { getRelevantContext } from "./search.service.js";
import { generateAnswer } from "./openai.service.js";

export const generateChatResponse = async (question) => {
  try {
    const context = await getRelevantContext(question);

    const answer = await generateAnswer(question, context);

    return answer;
  } catch (error) {
    console.error("Error generando respuesta del chatbot:", error);
    return "Ocurrió un error al procesar tu pregunta.";
  }
};