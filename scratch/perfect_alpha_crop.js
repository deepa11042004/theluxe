const path = require('path');
const sharp = require(path.join(process.cwd(), 'node_modules/sharp'));
const fs = require('fs');

const outDir = path.join(process.cwd(), 'public/Img/brands');
const img1Path = 'C:/Users/ADMIN/.gemini/antigravity-ide/brain/6d1aec65-bbaa-48dd-8bce-70024b72411d/brands_grid_part1_1787029373457.png';
const img2Path = 'C:/Users/ADMIN/.gemini/antigravity-ide/brain/6d1aec65-bbaa-48dd-8bce-70024b72411d/brands_grid_part2_1787029396363.png';

const colBounds = [
  { minX: 130, maxX: 430 }, { minX: 410, maxX: 700 }, { minX: 680, maxX: 970 },
  { minX: 950, maxX: 1240 }, { minX: 1220, maxX: 1510 }, { minX: 1480, maxX: 1770 }
];

const p1Grid = [
  ["edition", "ritz-carlton", "luxury-collection", "st-regis", "w-hotels", "jw-marriott"],
  ["renaissance", "autograph-collection", "tribute-portfolio", "design-hotels", "gaylord-hotels", "mgm-collection"]
];
const p1YRanges = [{ minY: 250, maxY: 340 }, { minY: 520, maxY: 620 }];

const p2Grid = [
  ["outdoor-collection", "courtyard", "four-points", "springhill-suites", "fairfield", "ac-hotels"],
  ["marriott", "sheraton", "marriott-vacation-club", "delta-hotels", "westin", "le-meridien"],
  ["citizenm", "aloft", "moxy", "protea-hotels", "city-express", "four-points-flex"],
  ["series", "residence-inn", "towneplace-suites", "element", "studiores", "marriott-executive-apartments"],
  ["homes-villas", "apartments"]
];
const p2YRanges = [
  { minY: 240, maxY: 340 }, { minY: 370, maxY: 470 }, { minY: 520, maxY: 630 },
  { minY: 660, maxY: 760 }, { minY: 800, maxY: 900 }
];

const invertedLogos = ["gaylord-hotels", "w-hotels", "edition", "citizenm", "outdoor-collection", "design-hotels"];

async function extractSingleLogo(imgPath, cellX1, cellX2, cellY1, cellY2, bId) {
  const outPath = path.join(outDir, `${bId}.png`);
  
  const pad = 0;
  const cropW = cellX2 - cellX1;
  const cropH = cellY2 - cellY1;
  
  const croppedBuf = await sharp(imgPath)
    .extract({ left: cellX1, top: cellY1, width: cropW, height: cropH })
    .toBuffer();

  const transparentBuf = await sharp(croppedBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pxData = transparentBuf.data;
  const pxInfo = transparentBuf.info;

  const isInverted = invertedLogos.includes(bId);

  for (let i = 0; i < pxInfo.width * pxInfo.height; i++) {
    const r = pxData[i * 4];
    const g = pxData[i * 4 + 1];
    const b = pxData[i * 4 + 2];
    
    // Calculate luminance
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    
    if (isInverted) {
      pxData[i * 4 + 3] = Math.round(lum);
      pxData[i * 4] = 255;
      pxData[i * 4 + 1] = 255;
      pxData[i * 4 + 2] = 255;
    } else {
      pxData[i * 4 + 3] = Math.round(255 - lum);
      pxData[i * 4] = 0;
      pxData[i * 4 + 1] = 0;
      pxData[i * 4 + 2] = 0;
    }
  }

  // Find the actual bounds of non-transparent pixels to trim
  let minTrimX = pxInfo.width, minTrimY = pxInfo.height, maxTrimX = 0, maxTrimY = 0;
  for (let y = 0; y < pxInfo.height; y++) {
    for (let x = 0; x < pxInfo.width; x++) {
      const alpha = pxData[(y * pxInfo.width + x) * 4 + 3];
      if (alpha > 10) { // Slight threshold for noise
        if (x < minTrimX) minTrimX = x;
        if (x > maxTrimX) maxTrimX = x;
        if (y < minTrimY) minTrimY = y;
        if (y > maxTrimY) maxTrimY = y;
      }
    }
  }

  // Add 10px padding
  minTrimX = Math.max(0, minTrimX - 10);
  minTrimY = Math.max(0, minTrimY - 10);
  maxTrimX = Math.min(pxInfo.width - 1, maxTrimX + 10);
  maxTrimY = Math.min(pxInfo.height - 1, maxTrimY + 10);

  const trimW = maxTrimX - minTrimX + 1;
  const trimH = maxTrimY - minTrimY + 1;

  if (trimW > 0 && trimH > 0) {
    const finalBuf = await sharp(pxData, {
      raw: { width: pxInfo.width, height: pxInfo.height, channels: 4 }
    })
      .extract({ left: minTrimX, top: minTrimY, width: trimW, height: trimH })
      .png({ compressionLevel: 9 })
      .toBuffer();

    fs.writeFileSync(outPath, finalBuf);
    console.log(`Extracted smooth alpha logo ${bId}.png (${trimW}x${trimH})`);
  } else {
    console.log(`Failed to extract ${bId}.png (empty)`);
  }
  return true;
}

async function runMatching() {
  for (let r = 0; r < p1Grid.length; r++) {
    for (let c = 0; c < p1Grid[r].length; c++) {
      await extractSingleLogo(img1Path, colBounds[c].minX, colBounds[c].maxX, p1YRanges[r].minY, p1YRanges[r].maxY, p1Grid[r][c]);
    }
  }
  for (let r = 0; r < p2Grid.length; r++) {
    if (r === 3 || r === 4) continue;
    for (let c = 0; c < p2Grid[r].length; c++) {
      if (!p2Grid[r][c]) continue;
      try {
        await extractSingleLogo(img2Path, colBounds[c].minX, colBounds[c].maxX, p2YRanges[r].minY, p2YRanges[r].maxY, p2Grid[r][c]);
      } catch (e) {
        console.log("Error on", p2Grid[r][c], e.message);
      }
    }
  }
}
runMatching().catch(console.error);
