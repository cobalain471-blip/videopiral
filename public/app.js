let totalBayar = 0;

// ======================
// STEP 1: KLIK THUMBNAIL
// ======================
function openInfo() {
  fetch("/klik-thumbnail", { method: "POST" });

  document.getElementById("infoBox").classList.remove("hidden");
}

// ======================
// STEP 2: LANJUT BAYAR
// ======================
function lanjutBayar() {
  document.getElementById("infoBox").classList.add("hidden");

  // generate kode unik
  let unik = Math.floor(Math.random() * 900) + 100;
  totalBayar = 5000 + unik;

  document.getElementById("nominal").innerText =
    "Transfer sebesar: Rp " + totalBayar;

  document.getElementById("qrisBox").classList.remove("hidden");
}

// ======================
// STEP 3: SUDAH BAYAR
// ======================
function konfirmasi() {
  document.getElementById("qrisBox").classList.add("hidden");
  document.getElementById("confirmBox").classList.remove("hidden");
}

// ======================
// STEP 4: CEK
