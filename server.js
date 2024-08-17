import express from "express";
import fs from "fs";
import { promisify } from "util";
import cors from "cors";

const server = express();
server.use(express.json()); // Adicione os parênteses para chamar a função
server.use(cors());

const port = 8000;
const getFile = promisify(fs.readFile);
const updateFile = promisify(fs.writeFile);

server.get("/lead", async (req, res) => {
  try {
    const data = await getFile("./leads.json", "utf-8");
    const leads = JSON.parse(data);
    res.json(leads); // Use res.json() para enviar JSON
    console.log(leads);
  } catch (error) {
    console.error(error); // Use console.error() para erros
    res.status(500).send("Error reading leads.");
  }
});

server.post("/lead/add", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const data = await getFile("./leads.json", "utf-8");
    const leads = JSON.parse(data);
    leads.push(payload); // Adicione diretamente o payload ao array
    await updateFile("./leads.json", JSON.stringify(leads, null, 2));

    res.status(201).json(payload); // Responda com o lead adicionado
    console.log(leads);
  } catch (error) {
    console.error(error); // Use console.error() para erros
    res.status(500).send("Error adding lead.");
  }
});

server.listen(port, () => {
  console.log("Server online: " + port);
});
