import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Servidor del Chatbot UASD funcionando correctamente",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
});

export default app;