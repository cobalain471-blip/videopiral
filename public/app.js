function cekBayar() {
  const input = document.getElementById("inputNominal").value;

  if (parseInt(input) === totalBayar) {
    fetch("/klik-bayar", { method: "POST" });

    // ambil link redirect dari server
    fetch("/api/redirect")
      .then(res => res.json())
      .then(data => {
        window.location.href = data.link;
      });

  } else {
    alert("Nominal tidak sesuai!");
  }
}
