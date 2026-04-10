const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let currentPayment = 0;

// =======================
// ROOT (biar pasti kebuka)
// =======================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// =======================
// QRIS AUTO + KODE UNIK
// =======================
app.get("/api/qris", (req, res) => {
  try {
    const kode = Math.floor(100 + Math.random() * 900);
    const total = 5000 + kode;

    currentPayment = total;

    res.json({
      nominal: total,
      kode: kode
    });
  } catch (err) {
    console.error("QRIS ERROR:", err);
    res.status(500).json({ error: "QRIS gagal" });
  }
});

// =======================
// VALIDASI PEMBAYARAN
// =======================
app.post("/api/validate", (req, res) => {
  try {
    const { nominal } = req.body;

    if (Number(nominal) === currentPayment) {
      return res.json({
        success: true,
        redirect: "https://google.com" // ganti ke video kamu
      });
    }

    res.json({ success: false });
  } catch (err) {
    console.error("VALIDATE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

// =======================
// TRACKING (optional)
// =======================
app.post("/klik-thumbnail", (req, res) => {
  console.log("Klik thumbnail");
  res.sendStatus(200);
});

app.post("/klik-bayar", (req, res) => {
  console.log("Klik bayar");
  res.sendStatus(200);
});

// =======================
// START SERVER (WAJIB RAILWAY)
// =======================
app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
