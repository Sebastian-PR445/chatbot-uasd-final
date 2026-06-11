import express from "express";
import { generateChatResponse } from "../services/chat.service.js";

const router = express.Router();

const suggestions = [
  "¿Qué es la Universidad Autónoma de Santo Domingo?",
  "¿Cuál es la misión de la UASD?",
  "¿Cuáles son los fines de la Universidad?",
  "¿Cuáles son las funciones fundamentales de la UASD?",
  "¿Qué establece el Estatuto sobre la autonomía universitaria?",
  "¿Cuáles son los organismos de gobierno de la UASD?",
  "¿Qué es el Claustro Mayor?",
  "¿Qué es el Consejo Universitario?",
  "¿Cuáles son los derechos de los estudiantes?",
  "¿Cuáles son los deberes de los estudiantes?"
];

router.get("/suggestions", (req, res) => {
  res.json({ suggestions });
});

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "La pregunta es obligatoria."
      });
    }

    const answer = await generateChatResponse(question);

    res.json({ answer });
  } catch (error) {
    console.error("Error en ruta /api/chat:", error);
    res.status(500).json({
      error: "Error procesando la pregunta."
    });
  }
});

export default router;