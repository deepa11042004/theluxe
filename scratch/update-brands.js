const fs = require('fs');
const file = 'c:/Projects/theluxe/components/Brand/Brandsec.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/locationCount: number;/g, 'locationCount: number;\n  website: string;');

const brands = {
  'edition': 'https://www.editionhotels.com/',
  'ritz-carlton': 'https://www.ritzcarlton.com/',
  'luxury-collection': 'https://the-luxury-collection.marriott.com/',
  'st-regis': 'https://st-regis.marriott.com/',
  'w-hotels': 'https://w-hotels.marriott.com/',
  'jw-marriott': 'https://jw-marriott.marriott.com/',
  'marriott': 'https://marriott-hotels.marriott.com/',
  'sheraton': 'https://sheraton.marriott.com/',
  'marriott-vacation-club': 'https://www.marriottvacationclub.com/',
  'delta-hotels': 'https://delta-hotels.marriott.com/',
  'westin': 'https://westin.marriott.com/',
  'le-meridien': 'https://le-meridien.marriott.com/',
  'renaissance': 'https://renaissance-hotels.marriott.com/',
  'autograph-collection': 'https://autograph-hotels.marriott.com/',
  'tribute-portfolio': 'https://tribute-portfolio.marriott.com/',
  'design-hotels': 'https://www.designhotels.com/',
  'gaylord-hotels': 'https://gaylord-hotels.marriott.com/',
  'mgm-collection': 'https://mgm-collection.marriott.com/',
  'outdoor-collection': 'https://marriott.com/',
  'courtyard': 'https://courtyard.marriott.com/',
  'four-points': 'https://four-points.marriott.com/',
  'springhill-suites': 'https://springhill-suites.marriott.com/',
  'fairfield': 'https://fairfield.marriott.com/',
  'ac-hotels': 'https://ac-hotels.marriott.com/',
  'citizenm': 'https://www.citizenm.com/',
  'aloft': 'https://aloft-hotels.marriott.com/',
  'moxy': 'https://moxy-hotels.marriott.com/',
  'protea-hotels': 'https://protea-hotels.marriott.com/',
  'city-express': 'https://city-express.marriott.com/',
  'four-points-flex': 'https://four-points-flex.marriott.com/',
  'series': 'https://marriott.com/',
  'residence-inn': 'https://residence-inn.marriott.com/',
  'towneplace-suites': 'https://towneplace-suites.marriott.com/',
  'element': 'https://element-hotels.marriott.com/',
  'studiores': 'https://studiores.marriott.com/',
  'marriott-executive-apartments': 'https://marriott-executive-apartments.marriott.com/'
};

content = content.replace(/locationCount: (\d+),/g, (match, p1) => {
  return 'locationCount: ' + p1 + ',\n    website: \"#\",';
});

for (const [id, url] of Object.entries(brands)) {
  const regex = new RegExp('id: \"' + id + '\"([\\s\\S]*?website: )\"#\"', 'g');
  content = content.replace(regex, 'id: \"' + id + '\"$1\"' + url + '\"');
}

// Update modal to show link
content = content.replace(
  /<a\n                  href="\/resorts"/,
  '<a\n                  href={selectedBrand.website}\n                  target="_blank"\n                  rel="noopener noreferrer"\n                  className="bg-[#B38E46] hover:bg-[#997734] text-white px-5 py-2.5 rounded-full font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md"\n                >\n                  <span>Visit Website</span>\n                  <ExternalLink className="w-3.5 h-3.5" />\n                </a>\n                <a\n                  href="/resorts"'
);


fs.writeFileSync(file, content);
