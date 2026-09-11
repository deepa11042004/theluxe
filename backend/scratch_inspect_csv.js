const fs = require('fs');
const path = require('path');

const csvPath = 'C:/Users/ADMIN/Downloads/the luxe/the_luxe_yatra_top_50_india_luxury_hotels_completed (1) (1) - Hotels.csv';
const content = fs.readFileSync(csvPath, 'utf8');

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    
    if (inQuotes) {
      if (c === '"') {
        if (next === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(cell.trim());
        cell = '';
      } else if (c === '\r') {
        // ignore
      } else if (c === '\n') {
        row.push(cell.trim());
        rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += c;
      }
    }
  }
  if (cell || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows;
}

const rows = parseCSV(content);
const headers = rows[0];
console.log('Headers count:', headers.length);
console.log('Headers:', headers);
console.log('Total rows parsed:', rows.length);

const records = [];
for (let i = 1; i < rows.length; i++) {
  if (rows[i].length <= 1 && (!rows[i][0] || rows[i][0] === '')) continue;
  const obj = {};
  headers.forEach((h, idx) => {
    obj[h] = rows[i][idx] || '';
  });
  records.push(obj);
}

console.log('Valid records count:', records.length);
records.forEach((r, idx) => {
  console.log(`[Rank ${r.top_hotel_rank}] "${r.name}" (${r.city_location}, ${r.state_region}) -> Status: ${r.status}, Featured: ${r.is_featured}, India50: ${r.is_india_top_50}`);
});
