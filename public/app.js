function openPopup() {
  document.getElementById("popup").style.display = "flex";
  fetch("/klik-thumbnail", { method: "POST" });
}

function closePopup(e) {
  if (e.target.id === "popup") {
    document.getElementById("popup").style.display = "none";
  }
}

function lanjutBayar() {
  fetch("/klik-bayar", { method: "POST" });
}

async function konfirmasiBayar() {
  const nominal = document.getElementById("nominal").value;
  const error = document.getElementById("error");

  if (nominal != 5000) {
    error.innerText = "❌ Nominal salah, mohon input kembali";
    return;
  }

  const res = await fetch("/api/redirect");
  const data = await res.json();

  window.location.href = data.link;
}
