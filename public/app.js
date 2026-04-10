const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// =================
// DATA
// =================
let stats = {
  klikThumbnail: 0,
  klikBayar: 0,
  totalPendapatan: 0
};

let redirectLink = "https://example.com";

// PAYMENT
let currentPayment = null;

// =================
// TRACKING
// =================
app.post("/klik-thumbnail", (req, res) => {
  stats.klikThumbnail++;
  res.json({ ok: true });
});

app.post("/klik-bayar", (req, res) => {
  stats.klikBayar++;
  res.json({ ok: true });
});

// =================
// QRIS GENERATE
// =================
app.get("/api/qris", (req, res) => {
  const kodeUnik = Math.floor(100 + Math.random() * 900);
  const total = 5000 + kodeUnik;

  currentPayment = total;

  res.json({
    nominal: total,
    kode: kodeUnik
  });
});

// =================
// VALIDASI
// =================
app.post("/api/validate", (req, res) => {
  const { nominal } = req.body;

  if (parseInt(nominal) === currentPayment) {
    stats.totalPendapatan += currentPayment;
    return res.json({ success: true, redirect: redirectLink });
  }

  res.json({ success: false });
});

// =================
// REDIRECT CONTROL
// =================
app.get("/api/redirect", (req, res) => {
  res.json({ link: redirectLink });
});

app.post("/api/redirect", (req, res) => {
  redirectLink = req.body.link;
  res.json({ success: true });
});

// =================
// PAGES
// =================
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin.html"));
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public/success.html"));
});

// =================
// START
// =================
const PORT = 3000;
app.listen(PORT, () => console.log("Server jalan di " + PORT));
