const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let currentPayment = 0;

// ===============================
// TRACKING (OPSIONAL)
// ===============================
app.post("/klik-thumbnail", (req, res) => {
  console.log("Thumbnail diklik");
  res.sendStatus(200);
});

app.post("/klik-bayar", (req, res) => {
  console.log("Tombol bayar diklik");
  res.sendStatus(200);
});

// ===============================
// QRIS AUTO GENERATE + KODE UNIK
// ===============================
app.get("/api/qris", (req, res) => {
  try {
    const kodeUnik = Math.floor(100 + Math.random() * 900); // 3 digit
    const total = 5000 + kodeUnik;

    currentPayment = total;

    res.json({
      nominal: total,
      kode: kodeUnik
    });
  } catch (err) {
    console.error("QRIS ERROR:", err);
    res.status(500).json({ error: "Gagal generate QRIS" });
  }
});

// ===============================
// VALIDASI PEMBAYARAN
// ===============================
app.post("/api/validate", (req, res) => {
  try {
    const { nominal } = req.body;

    if (Number(nominal) === currentPayment) {
      return res.json({
        success: true,
        redirect: "/video.html" // ganti sesuai halaman kamu
      });
    }

    res.json({ success: false });
  } catch (err) {
    console.error("VALIDATE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log("Server jalan di http://localhost:" + PORT);
});
