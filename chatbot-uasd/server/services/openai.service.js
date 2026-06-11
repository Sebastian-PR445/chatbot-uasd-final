import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAnswer = async (question, context) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres un chatbot académico de la UASD. Responde de forma clara, breve y basada en el Estatuto Orgánico.",
        },
        {
          role: "user",
          content: `
Contexto:
${context}

Pregunta:
${question}
          `,
        },
      ],
      temperature: 0.2,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error con OpenAI:", error);
    return "Ocurrió un error al generar la respuesta con inteligencia artificial.";
  }
};