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

app.post("/klik-thumbnail", (req, res) => {
  stats.klikThumbnail++;
  res.json({ ok: true });
});

app.post("/klik-bayar", (req, res) => {
  stats.klikBayar++;
  stats.totalPendapatan += 5000;
  res.json({ ok: true });
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public/success.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server jalan " + PORT));
