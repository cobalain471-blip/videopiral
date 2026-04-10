const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let stats = {
  klikThumbnail: 0,
  klikBayar: 0,
  totalPendapatan: 0
};

let redirectLink = "https://example.com";

// tracking
app.post("/klik-thumbnail", (req, res) => {
  stats.klikThumbnail++;
  res.json({ ok: true });
});

app.post("/klik-bayar", (req, res) => {
  stats.klikBayar++;
  stats.totalPendapatan += 5000;
  res.json({ ok: true });
});

// redirect API
app.get("/api/redirect", (req, res) => {
  res.json({ link: redirectLink });
});

app.post("/api/redirect", (req, res) => {
  redirectLink = req.body.link;
  res.json({ success: true });
});

// halaman
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/admin", (req, res) => {
  res.send("Admin panel nanti bisa dikembangkan");
});

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
