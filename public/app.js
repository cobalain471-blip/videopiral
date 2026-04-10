const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let currentPayment = 0;

// API QRIS
app.get("/api/qris", (req, res) => {
  const kode = Math.floor(100 + Math.random() * 900);
  const total = 5000 + kode;

  currentPayment = total;

  res.json({ nominal: total, kode });
});

// VALIDASI
app.post("/api/validate", (req, res) => {
  const { nominal } = req.body;

  if (Number(nominal) === currentPayment) {
    return res.json({ success: true, redirect: "https://google.com" });
  }

  res.json({ success: false });
});

// FORCE INDEX
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(3000, () => console.log("http://localhost:3000"));});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log("Server jalan di http://localhost:" + PORT);
});
