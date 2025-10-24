import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();

// 💡 Permitir solicitudes desde tu frontend en Vercel
app.use(cors({
  origin: ["https://rutina-app-pied.vercel.app", "https://edgardramos.vercel.app"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));


app.use(express.json());

// Configurar Mercado Pago usando variable de entorno
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
console.log("🔑 Token Mercado Pago:", process.env.MP_ACCESS_TOKEN ? "OK" : "NO CARGA");


// Ruta para crear preferencia
app.post("/create_preference", async (req, res) => {
  try {
    const preference = await new Preference(client).create({
      body: req.body,
    });
    res.json({ id: preference.id });
  } catch (error) {
    console.error("❌ Error al crear preferencia:", error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

// Puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));




