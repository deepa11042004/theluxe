const path = require('path');
const sharp = require(path.join(process.cwd(), 'node_modules/sharp'));
const fs = require('fs');

const outDir = path.join(process.cwd(), 'public/Img/brands');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const img1Path = 'C:/Users/ADMIN/.gemini/antigravity-ide/brain/6d1aec65-bbaa-48dd-8bce-70024b72411d/brands_grid_part1_1787029373457.png';
const img2Path = 'C:/Users/ADMIN/.gemini/antigravity-ide/brain/6d1aec65-bbaa-48dd-8bce-70024b72411d/brands_grid_part2_1787029396363.png';

const colBounds = [
  { minX: 130, maxX: 430 },  // Col 0
  { minX: 410, maxX: 700 },  // Col 1
  { minX: 680, maxX: 970 },  // Col 2
  { minX: 950, maxX: 1240 }, // Col 3
  { minX: 1220, maxX: 1510 },// Col 4
  { minX: 1480, maxX: 1770 } // Col 5
];

// Screenshot 1 Rows (Part 1)
const p1Grid = [
  // Row 0
  ["edition", "ritz-carlton", "luxury-collection", "st-regis", "w-hotels", "jw-marriott"],
  // Row 1 (minY: 520, maxY: 620) -> Renaissance row
  ["renaissance", "autograph-collection", "tribute-portfolio", "design-hotels", "gaylord-hotels", "mgm-collection"]
];
const p1YRanges = [
  { minY: 250, maxY: 340 },
  { minY: 520, maxY: 620 }
];

// Screenshot 2 Rows (Part 2 - scrolled modal)
const p2Grid = [
  // Row 0 (minY: 240, maxY: 340) -> Outdoor Collection row
  ["outdoor-collection", "courtyard", "four-points", "springhill-suites", "fairfield", "ac-hotels"],
  // Row 1 (minY: 370, maxY: 470) -> Marriott Hotels row
  ["marriott", "sheraton", "marriott-vacation-club", "delta-hotels", "westin", "le-meridien"],
  // Row 2 (minY: 520, maxY: 630) -> CitizenM row
  ["citizenm", "aloft", "moxy", "protea-hotels", "city-express", "four-points-flex"],
  // Row 3 (minY: 660, maxY: 760) -> Series row
  ["series", "residence-inn", "towneplace-suites", "element", "studiores", "marriott-executive-apartments"],
  // Row 4 (minY: 800, maxY: 900) -> Homes & Villas row
  ["homes-villas", "apartments"]
];
const p2YRanges = [
  { minY: 240, maxY: 340 },
  { minY: 370, maxY: 470 },
  { minY: 520, maxY: 630 },
  { minY: 660, maxY: 760 },
  { minY: 800, maxY: 900 }
];

async function extractSingleLogo(imgPath, cellX1, cellX2, cellY1, cellY2, outPath) {
  const imgRaw = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  const data = imgRaw.data;
  const info = imgRaw.info;

  let minX = cellX2, maxX = cellX1, minY = cellY2, maxY = cellY1;
  let count = 0;

  for (let y = cellY1; y <= cellY2; y++) {
    for (let x = cellX1; x <= cellX2; x++) {
      if (x >= info.width || y >= info.height) continue;
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      
      if ((r < 185 || g < 185 || b < 185) && !(r > 215 && g > 215 && b > 215)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        count++;
      }
    }
  }

  if (count < 10 || minX >= maxX || minY >= maxY) {
    console.log('Skipping empty cell:', cellX1, cellY1, outPath);
    return false;
  }

  const pad = 10;
  const left = Math.max(cellX1, minX - pad);
  const right = Math.min(cellX2, maxX + pad);
  const top = Math.max(cellY1, minY - pad);
  const bottom = Math.min(cellY2, maxY + pad);

  const cropW = right - left + 1;
  const cropH = bottom - top + 1;

  const croppedBuf = await sharp(imgPath)
    .extract({ left, top, width: cropW, height: cropH })
    .toBuffer();

  const transparentBuf = await sharp(croppedBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pxData = transparentBuf.data;
  const pxInfo = transparentBuf.info;

  for (let i = 0; i < pxInfo.width * pxInfo.height; i++) {
    const r = pxData[i * 4];
    const g = pxData[i * 4 + 1];
    const b = pxData[i * 4 + 2];
    if (r > 230 && g > 230 && b > 230) {
      pxData[i * 4 + 3] = 0;
    }
  }

  await sharp(pxData, {
    raw: { width: pxInfo.width, height: pxInfo.height, channels: 4 }
  })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`Extracted 100% single logo ${path.basename(outPath)} (${cropW}x${cropH})`);
  return true;
}

async function runMatching() {
  console.log('Extracting Part 1 logos...');
  for (let r = 0; r < p1Grid.length; r++) {
    const rowBrands = p1Grid[r];
    const yR = p1YRanges[r];
    for (let c = 0; c < rowBrands.length; c++) {
      const bId = rowBrands[c];
      const cB = colBounds[c];
      const outPath = path.join(outDir, `${bId}.png`);
      await extractSingleLogo(img1Path, cB.minX, cB.maxX, yR.minY, yR.maxY, outPath);
    }
  }

  console.log('Extracting Part 2 logos...');
  for (let r = 0; r < p2Grid.length; r++) {
    const rowBrands = p2Grid[r];
    const yR = p2YRanges[r];
    for (let c = 0; c < rowBrands.length; c++) {
      const bId = rowBrands[c];
      const cB = colBounds[c];
      const outPath = path.join(outDir, `${bId}.png`);
      await extractSingleLogo(img2Path, cB.minX, cB.maxX, yR.minY, yR.maxY, outPath);
    }
  }

  console.log('Matching and extraction completed!');
}

runMatching().catch(console.error);
