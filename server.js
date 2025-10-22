import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();

// 💡 CONFIGURA CORS CORRECTAMENTE:
app.use(cors({
  origin: "https://rutina-app-pied.vercel.app", // dominio de tu frontend en Vercel
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// Middleware
app.use(express.json());

// Mercado Pago config
const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
});


// Ruta para crear preferencia
app.post("/create_preference", async (req, res) => {
  try {
    const preference = await new Preference(client).create({
      body: req.body,
    });
    res.json({ id: preference.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

