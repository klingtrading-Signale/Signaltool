
document.getElementById("signalForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const price = parseFloat(document.getElementById("price").value);
  const risk = parseFloat(document.getElementById("risk").value);
  const market = document.getElementById("market").value;
  const crv = parseInt(document.getElementById("crvSelect").value);
  const entry = price.toFixed(2);
  const stop = (price - 5).toFixed(2);
  const tp = (price + 5 * crv).toFixed(2);
  const output = document.getElementById("output");
  output.innerHTML = `
    <h3>📈 Signal – ${market}</h3>
    <p><strong>Entry:</strong> ${entry}</p>
    <p><strong>Stop:</strong> ${stop}</p>
    <p><strong>TP:</strong> ${tp}</p>
    <p><strong>CRV:</strong> ${crv}:1</p>
    <p><strong>Status:</strong> 🟢 Aktiv</p>
  `;
});
