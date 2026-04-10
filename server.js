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

// LINK REDIRECT (default)
let redirectLink = "https://example.com";

// =================
// TRACKING
// =================
app.post("/klik-thumbnail", (req, res) => {
  stats.klikThumbnail++;
  res.json({ ok: true });
});

app.post("/klik-bayar", (req, res) => {
  stats.klikBayar++;
  stats.totalPendapatan += 5000;
  res.json({ ok: true });
});

// =================
// REDIRECT API
// =================

// GET LINK
app.get("/api/redirect", (req, res) => {
  res.json({ link: redirectLink });
});

// UPDATE LINK
app.post("/api/redirect", (req, res) => {
  redirectLink = req.body.link;
  res.json({ success: true });
});

// =================
// SUCCESS PAGE
// =================
app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public/success.html"));
});

// =================
// ADMIN PAGE
// =================
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin.html"));
});

// =================
// START
// =================
const PORT = 3000;
app.listen(PORT, () => console.log("Server jalan " + PORT));
