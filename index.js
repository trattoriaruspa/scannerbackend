import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs";

const app = express();
app.use(fileUpload());
app.use(express.json());

app.post("/upload", async (req, res) => {
  if (!req.files?.file) return res.status(400).send("Nessun file caricato");
  const file = req.files.file;
  const savePath = `/tmp/${file.name}`;
  await file.mv(savePath);
  console.log("File ricevuto:", file.name);
  res.json({ ok: true, message: "File ricevuto", file: file.name });
});

app.get("/", (req, res) => {
  res.send("Server attivo ✅");
});

app.listen(process.env.PORT || 3000, () => console.log("Backend avviato"));
