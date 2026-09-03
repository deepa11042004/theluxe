const fs = require('fs');
const file = 'c:/Projects/theluxe/components/Brand/Brandsec.tsx';
let content = fs.readFileSync(file, 'utf8');

const mapping = {
  "renaissance": "1.png",
  "gaylord-hotels": "2.png",
  "design-hotels": "3.png",
  "marriott-vacation-club": "4.png",
  "mgm-collection": "5.png",
  "four-points": "6.png",
  "aloft": "7.png",
  "autograph-collection": "8.png",
  "courtyard": "9.png",
  "edition": "10.png",
  "marriott-executive-apartments": "11.png",
  "fairfield": "12.png",
  "homes-villas": "13.png",
  "westin": "14.png",
  "springhill-suites": "15.png",
  "citizenm": "16.png",
  "apartments-by-marriott": "17.png", // Wait, I don't know the ID for this. Maybe not in ALL_BRANDS.
  "jw-marriott": "18.png",
  "delta-hotels": "19.png",
  "moxy": "20.png",
  "le-meridien": "21.png",
  "marriott": "22.png",
  "outdoor-collection": "23.png",
  "st-regis": "24.png",
  "ritz-carlton": "25.png",
  "luxury-collection": "26.png",
  "tribute-portfolio": "27.jpg",
  "w-hotels": "28.png",
  "four-points-flex": "29.png",
  "residence-inn": "30.png",
  "studiores": "31.png",
  "series": "32.png",
  "towneplace-suites": "33.png",
  "element": "34.jpg",
  "protea-hotels": "35.png",
  "ac-hotels": "36.jpg"
};

for (const [id, logo] of Object.entries(mapping)) {
  const regex = new RegExp('(id:\\s*"' + id + '"[\\s\\S]*?logoImg:\\s*)"[^"]+"', 'g');
  content = content.replace(regex, '$1"' + logo + '"');
}

fs.writeFileSync(file, content);
console.log('Done mapping logos.');
