import express from "express";
import { createTransactionController } from "./controller/createTransactionController";
import { getTransactionByIdController, getAllTransactionsController } from "./controller/getTransactionsController";
import { aiResponse } from "./controller/ai";
import { aiResponseChat } from "./controller/aiChat";

const app = express();

app.use(express.json());

// rota raiz
app.get("/", (_req, res) => {
  res.json({ message: "Transactions API v2.5" });
});

// rotas de transações
app.get("/api/transactions", getAllTransactionsController);
app.get("/api/transactions/:id", getTransactionByIdController);
app.post("/api/transactions", createTransactionController);


// Rotas da IA
app.post("/ai", (req, res) => {
  aiResponse(req, res);
});

app.post("/chat", (req, res) => {
  aiResponseChat(req, res);
});

export default app;
