const fs = require('fs');
const path = require('path');

const brandsecPath = path.join(process.cwd(), 'components/Brand/Brandsec.tsx');
let content = fs.readFileSync(brandsecPath, 'utf8');

const files = fs.readdirSync(path.join(process.cwd(), 'public/Img/brands'))
  .filter(f => !f.startsWith('.'))
  .sort((a, b) => parseInt(a) - parseInt(b)); // Sort numerically: 1.png, 2.jpg, 3.png...

let fileIndex = 0;

// Replace all logoImg: "...", with logoImg: "1.png", etc.
content = content.replace(/logoImg:\s*"[^"]+"/g, (match) => {
  const fileToUse = files[fileIndex % files.length];
  fileIndex++;
  return `logoImg: "${fileToUse}"`;
});

// Remove the fallback map logic in getLogoPath since all files are now valid numbered images
content = content.replace(/const getLogoPath = \(b: BrandLogoItem\) => \{[\s\S]*?return `\/Img\/brands\/\$\{b\.logoImg\}`;[\s\S]*?\};/, 
  'const getLogoPath = (b: BrandLogoItem) => `/Img/brands/${b.logoImg}`;'
);

fs.writeFileSync(brandsecPath, content);
console.log('Successfully mapped logos!');
