
document.getElementById("signalForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const market = document.getElementById("market").value;
  const price = parseFloat(document.getElementById("price").value);
  const risk = parseFloat(document.getElementById("risk").value);
  const direction = price > 5000 ? "Short – Limit Sell" : "Long – Stop Buy"; // Dummy zur Demo
  const entry = price.toFixed(2);
  const stop = (price - 5).toFixed(2);
  const tp = (price + 12.5).toFixed(2);
  const crv = ((tp - price) / (price - stop)).toFixed(2);

  const output = document.getElementById("output");
  output.innerHTML = `
    <h3>🟢 A++ Setup – ${market}</h3>
    <p><strong>📍 Entry (${direction}):</strong> ${entry}</p>
    <p><strong>🛑 Stop:</strong> ${stop}</p>
    <p><strong>🎯 TP1:</strong> ${tp}</p>
    <p><strong>📊 CRV:</strong> ${crv}:1</p>
    <p><strong>📦 Status:</strong> Aktiv</p>
  `;
});
