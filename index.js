import express from "express";
import fileUpload from "express-fileupload";
import fetch from "node-fetch"; // se non presente: npm install node-fetch

const app = express();
app.use(express.json());
app.use(fileUpload());

const BASE44_API_KEY = "metti-la-tua-api-key-qui";

// Endpoint per ricevere file o richiedere dati
app.post("/process", async (req, res) => {
  try {
    // esempio: leggere entità Project da Base44
    const response = await fetch("https://app.base44.com/api/apps/68ed4b17861687ed21992d2b/entities/Project", {
      headers: { 'api_key': BASE44_API_KEY, 'Content-Type': 'application/json' }
    });
    const projects = await response.json();

    // restituisci solo i dati essenziali
    const processed = projects.map(p => ({
      name: p.name,
      critical_count: p.critical_count,
      high_count: p.high_count,
      medium_count: p.medium_count,
      low_count: p.low_count
    }));

    res.json({ ok: true, projects: processed });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server attivo"));
