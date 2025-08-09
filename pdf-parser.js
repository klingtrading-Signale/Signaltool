// pdf-parser.js — nutzt pdf.js (loaded via CDN in index.html)
async function parseOptionPdf(file) {
  if (!file) return [];
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let lines = [];
  for (let p=0; p<pdf.numPages; p++) {
    const page = await pdf.getPage(p+1);
    const txt = await page.getTextContent();
    const pageStr = txt.items.map(i=>i.str).join(' ');
    lines = lines.concat(pageStr.split('\n'));
  }
  const full = lines.join(' ');
  const regex = /(\d{1,4}\.\d{2})\s+([\d,]{1,6})\s+([\d,]{1,6})\s+([+-]?\d{1,6}\.\d+)\s+(Call|Put)/g;
  let match;
  const rows = [];
  while ((match = regex.exec(full)) !== null) {
    const strike = parseFloat(match[1].replace(',', ''));
    const volume = parseInt(match[2].replace(/,/g,''),10);
    const oi = parseInt(match[3].replace(/,/g,''),10);
    const delta = parseFloat(match[4].replace(',', '.'));
    const type = match[5];
    rows.push({ strike, volume, oi, delta, type });
  }
  return rows;
}
document.getElementById('parsePdfBtn')?.addEventListener('click', async ()=> {
  const f = document.getElementById('optionPdf').files[0];
  if (!f) { alert('Bitte PDF auswählen.'); return; }
  const dbg = document.getElementById('debug');
  dbg.textContent = 'PDF wird gelesen...';
  try {
    const rows = await parseOptionPdf(f);
    dbg.textContent = 'Gefundene Zeilen: ' + rows.length + '\n' + JSON.stringify(rows.slice(0,10), null, 2);
    window._parsedOptionRows = rows;
  } catch (e) {
    dbg.textContent = 'Fehler beim Lesen: ' + e.message;
    window._parsedOptionRows = [];
  }
});