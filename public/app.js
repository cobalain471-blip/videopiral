let totalBayar = 0;

function openInfo() {
  fetch("/klik-thumbnail", { method: "POST" });

  document.getElementById("infoBox").classList.remove("hidden");
}

function lanjutBayar() {
  document.getElementById("infoBox").classList.add("hidden");

  // generate kode unik
  let unik = Math.floor(Math.random() * 900) + 100;
  totalBayar = 5000 + unik;

  document.getElementById("nominal").innerText =
    "Transfer sebesar: Rp " + totalBayar;

  document.getElementById("qrisBox").classList.remove("hidden");
}

function konfirmasi() {
  document.getElementById("qrisBox").classList.add("hidden");
  document.getElementById("confirmBox").classList.remove("hidden");
}

function cekBayar() {
  const input = document.getElementById("inputNominal").value;

  if (parseInt(input) === totalBayar) {
    fetch("/klik-bayar", { method: "POST" });
    window.location.href = "/success";
  } else {
    alert("Nominal tidak sesuai!");
  }
}
