
import { parseOptionPdf } from './optionParser.js';
import { buildSignal } from './engine.js';

function showFieldsFor(market){ document.getElementById('futuresFields').style.display = ['BTC','DOGE','SOL','SHIB','XRP'].includes(market) ? 'none' : 'block'; document.getElementById('cryptoFields').style.display = ['BTC','DOGE','SOL','SHIB','XRP'].includes(market) ? 'block' : 'none'; }
document.getElementById('market').addEventListener('change', e=> showFieldsFor(e.target.value));
document.getElementById('date').value = new Date().toISOString().slice(0,10); showFieldsFor(document.getElementById('market').value);

document.getElementById('parsePdfBtn').addEventListener('click', async ()=>{
  const f = document.getElementById('optionPdf').files[0]; const dbg = document.getElementById('debug');
  if(!f){ alert('Bitte PDF auswählen.'); return; }
  dbg.textContent = 'PDF wird gelesen...';
  try{ const rows = await parseOptionPdf(f); dbg.textContent = 'Gefundene Zeilen: ' + rows.length + '\n' + JSON.stringify(rows.slice(0,30),null,2); window._parsedOptionRows = rows; } catch(e){ dbg.textContent = 'Fehler: ' + e.message; window._parsedOptionRows = []; }
});

document.getElementById('signalForm').addEventListener('submit', e=>{ e.preventDefault(); const form = document.getElementById('signalForm'); const rows = window._parsedOptionRows || []; const result = buildSignal(form, rows); const box = document.getElementById('signalBox'); const dbg = document.getElementById('debug'); if(!result.ok){ box.className='signalBox warning'; box.innerHTML = '<strong>Kein Signal:</strong> '+result.msg; dbg.textContent = JSON.stringify(result.debug||{},null,2); return; } box.className='signalBox'; box.innerHTML = '<div style="font-weight:700;color:#0b6fca">'+(result.direction==='Long'?'🟢':'🔴')+' '+result.rating+' Setup – '+result.market+'</div>' + '<div style="margin-top:6px"><strong>Order-Typ:</strong> '+result.orderType+'</div>' + '<div><strong>Entry:</strong> '+result.entry+'</div>' + '<div><strong>Stop:</strong> '+result.stop+'</div>' + '<div><strong>TP1:</strong> '+result.tp1+'</div>' + (result.tp2?'<div><strong>TP2:</strong>'+result.tp2+'</div>':'') + (result.tp3?'<div><strong>TP3:</strong>'+result.tp3+'</div>':'') + '<div><strong>CRV:</strong> '+result.crv+':1</div>' + '<div><strong>Kontrakte:</strong> '+result.contracts+'</div>' + '<div><strong>TP1-Wahrscheinlichkeit:</strong> '+result.probability+'</div>' + '<div style="margin-top:6px;color:#444"><strong>Begründung:</strong> '+(result.reason||'')+'</div>'; dbg.textContent = JSON.stringify(result.debug||{},null,2); window._lastSignal = result; });

document.getElementById('saveBtn').addEventListener('click', ()=>{ if(!window._lastSignal || !window._lastSignal.ok){ alert('Kein gültiges Signal zum Speichern.'); return; } const j = JSON.parse(localStorage.getItem('a_plus_journal')||'[]'); j.unshift(window._lastSignal); localStorage.setItem('a_plus_journal', JSON.stringify(j.slice(0,500))); alert('Signal gespeichert.'); });
