const path = require('path');
const sharp = require(path.join(process.cwd(), 'node_modules/sharp'));

async function cropTransparent(inputPath, outputPath) {
  try {
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let minX = info.width, minY = info.height, maxX = 0, maxY = 0;

    // Scan for non-transparent pixels
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * 4;
        const alpha = data[idx + 3];
        // If pixel is not fully transparent
        if (alpha > 10) { 
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (minX > maxX || minY > maxY) {
      console.log('Image is empty or fully transparent:', inputPath);
      return;
    }

    const pad = 10;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(info.width - cropX, maxX - minX + pad * 2);
    const cropH = Math.min(info.height - cropY, maxY - minY + pad * 2);

    console.log(`Cropping ${path.basename(inputPath)} to ${cropW}x${cropH} at (${cropX}, ${cropY})`);

    await sharp(inputPath)
      .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
      .toFile(outputPath);
      
    console.log(`Saved to ${outputPath}`);
  } catch (err) {
    console.error('Error processing', inputPath, err);
  }
}

async function main() {
  const publicImgDir = path.join(process.cwd(), 'public/Img');
  
  await cropTransparent(
    path.join(publicImgDir, 'logo-emblem-v2.png'),
    path.join(publicImgDir, 'logo-emblem-v3.png')
  );
  
  await cropTransparent(
    path.join(publicImgDir, 'logo-text-v2.png'),
    path.join(publicImgDir, 'logo-text-v3.png')
  );
}

main();
