import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

// Allow large payloads to support uploading base64-encoded images
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Initialize Gemini SDK with telemetry header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Support basic health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "C.A.P.S. system core online." });
});

// GET all permanently saved images in the codebase
app.get("/api/images", (req, res) => {
  try {
    const dbPath = path.join(process.cwd(), "src", "saved_images.json");
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, "utf-8");
      res.json(JSON.parse(data || "{}"));
    } else {
      res.json({});
    }
  } catch (error: any) {
    console.error("Error reading saved images:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to save an image permanently to the repository
app.post("/api/images/upload", (req, res) => {
  try {
    const { key, dataUrl } = req.body;
    if (!key || !dataUrl) {
      res.status(400).json({ error: "Missing key or dataUrl parameter" });
      return;
    }

    const dbPath = path.join(process.cwd(), "src", "saved_images.json");
    let db: Record<string, string> = {};
    if (fs.existsSync(dbPath)) {
      try {
        const raw = fs.readFileSync(dbPath, "utf-8");
        db = JSON.parse(raw || "{}");
      } catch (err) {
        console.error("Failed to parse saved_images.json", err);
      }
    }

    db[key] = dataUrl;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");

    res.json({ success: true, message: `Image ${key} successfully written permanently to server codebase.` });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Chat endpoint to contact C.A.P.S. Core
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    if (!ai) {
      res.json({
        response: `[NÚCLEO NEURAL CAPS - MODO RETRO-COMPATÍVEL DE SEGURANÇA]\n\nSaudações, Netrunner! Sou o Core IA do CAPS (Sistemas de Rastreamento Solar). \n\nAtualmente estou operando em modo offline de emergência local. No entanto, posso te adiantar os dados técnicos:\nO projeto utiliza **LDRs** diferenciais para inclinar o servomotor em até 180° e o acelerômetro **GY-01** para leitura de ângulo. Se você configurar a chave de criptografia \`GEMINI_API_KEY\` no painel de segredos, poderei liberar todo o poder de processamento neural para decodificar firmware ou arquiteturas complexas. \n\nEm que posso auxiliar sua equipe no momento?`
      });
      return;
    }

    const systemInstruction = `Você é o CAPS Neural Core, a inteligência central por trás do projeto CAPS (Controle Automatizado de Painel Solar). O site técnico é dedicado à documentação deste sistema de rastreamento de luz.
Suas respostas devem ser dadas em Português do Brasil com um toque cyberpunk fascinante e técnico! Use termos futuristas, jargões como "Netrunners", "malhas elétricas", "vetores de intensidade de LDR", "comunicação ESP32", "protocolo de barramento I2C", "ângulos de incidência fotovoltaica", "servomotores PWM", "rotinas GY-01" de forma criativa, mas preserve o rigor técnico.

Responda dúvidas sobre:
1. Os integrantes da equipe: Gabriel Silveira (Líder), Anna Carolina Poscai Beluco, Davi Barbosa Machado, João Paulo Wolf, Miguel Augusto Ferreira, Takeshi Matsunaga.
2. O problema e solução: painéis solares fixos perdem rendimento, o CAPS corrige a incidência mantendo-a perpendicular por feedback dinâmico de LDRs e acelerômetro.
3. Arquitetura de rede local: ESP32 cliente enviando dados via HTTP para o servidor local Python (rodando no computador da equipe, pois foi alterado do Raspberry Pi original por limites de rede e simplificação de setup sob o prazo final de 24/05/2026).
4. Firmware ESP32 escrito em C++ com o cálculo bidirecional e ajustes de sinal PWM.
5. Planos futuros como o resfriamento de canais aerodinâmicos passivos (afastamento de alguns centímetros da base para criar fluxo de ventilação natural).

Seja conciso, direto e amigável aos engenheiros do nosso grupo, com identidade visual ciberpunk.`;

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        contents.push({
          role: turn.role === "assistant" ? "model" : "user",
          parts: [{ text: turn.content }]
        });
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ response: result.text || "Desculpe, sinal fraco. Sem resposta do Núcleo Neural CAPS." });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message || "Falha ao processar sinal de rede neural." });
  }
});

// Configure Vite or serve static files
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
