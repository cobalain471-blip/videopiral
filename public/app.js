function openPopup() {
  document.getElementById("popup").style.display = "flex";

  // reset step
  document.getElementById("step1").style.display = "block";
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";

  fetch("/klik-thumbnail", { method: "POST" });
}

function closePopup(e) {
  if (e.target.id === "popup") {
    document.getElementById("popup").style.display = "none";
  }
}

// STEP 1 → STEP 2
function stepBayar() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";

  fetch("/klik-bayar", { method: "POST" });
}

// STEP 2 → STEP 3
function stepKonfirmasi() {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
}

// FINAL CONFIRM
async function konfirmasiBayar() {
  const nominal = document.getElementById("nominal").value;
  const error = document.getElementById("error");

  if (nominal != 5000) {
    error.innerText = "Nominal tidak sesuai!";
    return;
  }

  const res = await fetch("/api/redirect");
  const data = await res.json();

  window.location.href = data.link;
}
