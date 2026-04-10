let isProcessing = false;

// OPEN POPUP
function openPopup() {
  document.getElementById("popup").style.display = "flex";

  document.getElementById("step1").style.display = "block";
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";

  isProcessing = false;
  document.getElementById("btnBayar").disabled = false;

  fetch("/klik-thumbnail", { method: "POST" });
}

// CLOSE
function closePopup(e) {
  if (e.target.id === "popup") {
    document.getElementById("popup").style.display = "none";
  }
}

// STEP 1 → QRIS
async function stepBayar() {
  if (isProcessing) return;
  isProcessing = true;

  const btn = document.getElementById("btnBayar");
  btn.disabled = true;
  btn.innerText = "Loading...";

  const res = await fetch("/api/qris");
  const data = await res.json();

  document.getElementById("totalBayar").innerText =
    "Rp " + data.nominal.toLocaleString();

  document.getElementById("kodeUnik").innerText = data.kode;

  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";

  fetch("/klik-bayar", { method: "POST" });
}

// STEP 2 → INPUT
function stepKonfirmasi() {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
}

// VALIDASI
async function konfirmasiBayar() {
  const nominal = document.getElementById("nominal").value;
  const error = document.getElementById("error");

  const res = await fetch("/api/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nominal })
  });

  const data = await res.json();

  if (!data.success) {
    error.innerText = "Nominal tidak cocok!";
    return;
  }

  window.location.href = data.redirect;
}
