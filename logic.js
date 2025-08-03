
document.getElementById("signalForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const market = document.getElementById("market").value;
  const price = parseFloat(document.getElementById("price").value);
  const stop = (price - 6.5).toFixed(2);
  const tp = (price + 19.5).toFixed(2);
  const crv = ((tp - price) / (price - stop)).toFixed(2);
  const crvTarget = parseFloat(document.getElementById("crvTarget").value);
  const direction = price > 5000 ? "Short – Limit Sell" : "Long – Stop Buy";
  const probability = crv >= 3 ? "65 %" : crv >= 2 ? "75 %" : "85 %";

  const output = document.getElementById("output");

  if (crv < crvTarget) {
    output.innerHTML = "<div class='signal-box warning'>❗ Kein valides Setup: gewünschtes CRV nicht erreichbar (" + crv + ":1)</div>";
    return;
  }

  output.innerHTML = `
    <h3>${direction.includes("Short") ? "🔴" : "🟢"} A++ Setup – ${market}</h3>
    <p><strong>📍 Entry (${direction}):</strong> ${price.toFixed(2)}</p>
    <p><strong>🛑 Stop:</strong> ${stop}</p>
    <p><strong>🎯 TP1:</strong> ${tp}</p>
    <p><strong>📊 CRV:</strong> ${crv}:1</p>
    <p><strong>🌡 TP1-Wahrscheinlichkeit:</strong> ${probability}</p>
    <p><strong>📌 Status:</strong> Aktiv</p>
  `;
});
