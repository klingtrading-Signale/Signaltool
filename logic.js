
document.getElementById("signalForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const market = document.getElementById("market").value;
  const price = parseFloat(document.getElementById("price").value);
  const gex = document.getElementById("gex").value;
  const maxPain = parseFloat(document.getElementById("maxPain").value);
  const vix = parseFloat(document.getElementById("vix").value);
  const high = parseFloat(document.getElementById("high").value);
  const low = parseFloat(document.getElementById("low").value);
  const vah = parseFloat(document.getElementById("vah").value);
  const val = parseFloat(document.getElementById("val").value);
  const poc = parseFloat(document.getElementById("poc").value);
  const gammaFlip = parseFloat(document.getElementById("gammaFlip").value);
  const atr = parseFloat(document.getElementById("atr").value);
  const crvTarget = parseFloat(document.getElementById("crvTarget").value);
  const risk = parseFloat(document.getElementById("risk").value);
  const balance = parseFloat(document.getElementById("balance").value);

  const direction = price < poc && gex !== "negativ" ? "Long" : price > poc && gex !== "positiv" ? "Short" : null;

  let entry = null;
  let stop = null;
  let tp = null;
  let crv = null;
  let logicComment = "";
  let validSetup = true;

  if (!direction) {
    document.getElementById("output").innerHTML = "<div class='signal-box warning'>❗ Kein klares Bias aus Daten: Kein Setup generiert</div>";
    return;
  }

  // Entry-Vorschlag: basierend auf VAL/VAH/POC + Konfluenz
  if (direction === "Long") {
    entry = val > low ? val : poc;
    stop = Math.min(entry - (atr * 0.5), low);
    tp = poc > entry ? poc : vah;
    if (entry < low) validSetup = false;
  } else {
    entry = vah < high ? vah : poc;
    stop = Math.max(entry + (atr * 0.5), high);
    tp = poc < entry ? poc : val;
    if (entry > high) validSetup = false;
  }

  crv = ((direction === "Long") ? (tp - entry) / (entry - stop) : (entry - tp) / (stop - entry));
  crv = parseFloat(crv.toFixed(2));

  const tickValue = market === "ES" ? 12.5 : market === "MES" ? 1.25 : market === "NQ" ? 20 : 2;
  const totalRiskPoints = Math.abs(stop - entry);
  const contracts = Math.floor(risk / (totalRiskPoints * tickValue));

  const probability = crv >= 3 ? "65 %" : crv >= 2 ? "75 %" : "85 %";
  const rating = crv >= 3 && validSetup ? "A++" : crv >= 2 && validSetup ? "A+" : "A";

  let outputHTML = "";

  if (!validSetup) {
    outputHTML = "<div class='signal-box warning'>❗ Kein A++ Setup: Entry verletzt strategische Bedingungen (z. B. über VTH oder unter VTL)</div>";
  } else if (crv < crvTarget) {
    outputHTML = "<div class='signal-box warning'>❗ Kein profitables Handelssignal mit gewünschtem CRV (" + crvTarget + ":1) möglich. Gefundenes CRV: " + crv + ":1</div>";
  } else {
    outputHTML = `
      <h3>${direction === "Short" ? "🔴" : "🟢"} ${rating} Setup – ${market}</h3>
      <p><strong>📍 Entry (${direction} – Limit ${direction === "Long" ? "Buy" : "Sell"}):</strong> ${entry.toFixed(2)}</p>
      <p><strong>🛑 Stop:</strong> ${stop.toFixed(2)}</p>
      <p><strong>🎯 TP1:</strong> ${tp.toFixed(2)}</p>
      <p><strong>📊 CRV:</strong> ${crv}:1</p>
      <p><strong>📦 Kontraktanzahl:</strong> ${contracts > 0 ? contracts : 1}</p>
      <p><strong>🌡 TP1-Wahrscheinlichkeit:</strong> ${probability}</p>
      <p><strong>📌 Status:</strong> Aktiv</p>
    `;
  }

  document.getElementById("output").innerHTML = outputHTML + "<p style=\"margin-top:1rem;font-style:italic;font-size:0.9rem\">📎 Hinweis: Option Chain PDF wurde noch nicht ausgewertet – Funktion folgt in Modul 3.</p>";
});
