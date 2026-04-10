const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ======================
// DATABASE FAKE
// ======================
const payments = {};

// ======================
// STATS (TRACKING)
// ======================
let stats = {
  klikThumbnail: 0,
  klikBayar: 0,
  totalPendapatan: 0
};

// ======================
// ROUTES
// ======================

// HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// ADMIN PAGE
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin.html"));
});

// ======================
// PAYMENT SYSTEM (FAKE)
// ======================

// CREATE PAYMENT
app.post("/create-payment", (req, res) => {
  const id = Date.now().toString();

  payments[id] = {
    id,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  res.json({
    paymentId: id,
    qr: "QRIS-DUMMY-" + id
  });
});

// PAYMENT SUCCESS
app.post("/pay-success", (req, res) => {
  const { paymentId } = req.body;

  if (!payments[paymentId]) {
    return res.status(404).json({ success: false });
  }

  payments[paymentId].status = "paid";

  res.json({ success: true });
});

// ======================
// TRACKING API
// ======================

// KLIK THUMBNAIL
app.post("/klik-thumbnail", (req, res) => {
  stats.klikThumbnail++;
  res.json({ success: true });
});

// KLIK BAYAR
app.post("/klik-bayar", (req, res) => {
  stats.klikBayar++;
  stats.totalPendapatan += 10000; // harga per unlock
  res.json({ success: true });
});

// AMBIL STATS
app.get("/api/stats", (req, res) => {
  res.json(stats);
});

// ======================
// ADMIN API
// ======================

app.get("/api/payments", (req, res) => {
  res.json(Object.values(payments));
});

// ======================
// SUCCESS PAGE
// ======================

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public/success.html"));
});

// ======================
// START SERVER
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});