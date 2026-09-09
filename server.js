import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("BOT SENJASTORE AKTIF 🔥");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server berjalan dengan baik"
  });
});

app.post("/chat", (req, res) => {
  const message = req.body?.message || "";
  const msg = message.toLowerCase().trim();

  let reply;

  if (!msg) {
    reply = "Halo kak 😊 Silakan ketik harga untuk melihat daftar produk 🔥";
  } else if (msg.includes("harga")) {
    reply = `📋 LIST PRODUK:

🔥 4000 +450 = Rp827.785
💎 9000 +9500 = Rp1.535.550

👉 Mau ambil yang mana kak?`;
  } else if (/\d+/.test(msg)) {
    reply = `Mantap kak 👍

Kirim:
🆔 ID
🌐 Server

Biar kami bantu proses 🔥`;
  } else if (
    msg.includes("halo") ||
    msg.includes("hai") ||
    msg.includes("hello") ||
    msg === "p"
  ) {
    reply = "Halo kak 😊 Selamat datang di SenjaStore 🔥 Ketik harga untuk melihat produk.";
  } else {
    reply = "Halo kak 😊 Ketik harga untuk melihat daftar produk 🔥";
  }

  res.status(200).json({
    success: true,
    reply
  });
});

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(500).json({
    success: false,
    reply: "Maaf kak, server sedang mengalami gangguan 🙏"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 SenjaStore Bot berjalan di port ${PORT}`);
});
