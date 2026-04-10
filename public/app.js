function openLock() {
  fetch("/klik-thumbnail", { method: "POST" });

  document.getElementById("popup").classList.remove("hidden");
}

function bayar() {
  fetch("/klik-bayar", { method: "POST" });

  window.location.href = "/success";
}