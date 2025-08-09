
export async function parseOptionPdf(file) {
  if (!file) return [];
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let text = '';
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const txt = await page.getTextContent();
    text += txt.items.map(i => i.str).join(' ') + '\n';
  }
  const full = text.replace(/\s+/g, ' ');
  const regex = /(\d{1,2,3,4}[\.,]\d{2})\s+([\d,]{1,7})\s+([\d,]{1,7})\s+([+-]?\d{1,6}\.\d+)\s+(Call|Put)/g;
  let match; const rows = [];
  while ((match = regex.exec(full)) !== null) {
    const strike = parseFloat(match[1].replace(',','.'));
    const volume = parseInt(match[2].replace(/,/g,''),10);
    const oi = parseInt(match[3].replace(/,/g,''),10);
    const delta = parseFloat(match[4]);
    const type = match[5];
    rows.push({ strike, volume, oi, delta, type });
  }
  return rows;
}
