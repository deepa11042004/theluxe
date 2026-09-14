import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function getUsedMediaUrls() {
  const usedUrls = new Set<string>();

  // Fetch URLs from various tables
  const mediaRecords = await prisma.media.findMany({ select: { url: true } });
  mediaRecords.forEach(m => {
    if (m.url) {
      usedUrls.add(m.url);
      usedUrls.add(m.url.replace(/^\//, ''));
    }
  });

  const hotelImages = await prisma.hotelImage.findMany({ select: { image_url: true } });
  hotelImages.forEach(img => {
    if (img.image_url) {
      usedUrls.add(img.image_url);
      usedUrls.add(img.image_url.replace(/^\//, ''));
    }
  });

  const destImages = await prisma.destinationImage.findMany({ select: { image_url: true } });
  destImages.forEach(img => {
    if (img.image_url) {
      usedUrls.add(img.image_url);
      usedUrls.add(img.image_url.replace(/^\//, ''));
    }
  });

  const itineraryImages = await prisma.itineraryImage.findMany({ select: { image_url: true } });
  itineraryImages.forEach(img => {
    if (img.image_url) {
      usedUrls.add(img.image_url);
      usedUrls.add(img.image_url.replace(/^\//, ''));
    }
  });

  const itineraryDays = await prisma.itineraryDay.findMany({ select: { image_url: true } });
  itineraryDays.forEach(img => {
    if (img.image_url) {
      usedUrls.add(img.image_url);
      usedUrls.add(img.image_url.replace(/^\//, ''));
    }
  });

  const blogImages = await prisma.blogImage.findMany({ select: { image_url: true } });
  blogImages.forEach(img => {
    if (img.image_url) {
      usedUrls.add(img.image_url);
      usedUrls.add(img.image_url.replace(/^\//, ''));
    }
  });

  return usedUrls;
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function runCleanup() {
  console.log('Fetching used media URLs from database...');
  const usedUrls = await getUsedMediaUrls();
  console.log(`Found ${usedUrls.size} unique used media URLs.`);

  const frontendUploadsDir = path.join(__dirname, '../../../frontend/public/uploads');
  const backendUploadsDir = path.join(__dirname, '../../public/uploads');

  let frontendFiles: string[] = [];
  if (fs.existsSync(frontendUploadsDir)) {
    frontendFiles = getAllFiles(frontendUploadsDir);
  }

  let backendFiles: string[] = [];
  if (fs.existsSync(backendUploadsDir)) {
    backendFiles = getAllFiles(backendUploadsDir);
  }

  const allFiles = [...frontendFiles, ...backendFiles];
  console.log(`Found ${allFiles.length} files in uploads directories.`);

  let deletedCount = 0;

  for (const filePath of allFiles) {
    // Normalize path to get the URL part (e.g., "uploads/hotels/image.jpg")
    const relativePathMatch = filePath.match(/uploads[\\/](.*)/);
    if (relativePathMatch) {
      let relativePath = `/uploads/${relativePathMatch[1]}`.replace(/\\/g, '/');
      let relativePathWithoutSlash = `uploads/${relativePathMatch[1]}`.replace(/\\/g, '/');
      
      // Check if file is used
      let isUsed = false;
      for (const url of usedUrls) {
        if (url === relativePath || url === relativePathWithoutSlash || url.endsWith(relativePath) || url.endsWith(relativePathWithoutSlash)) {
          isUsed = true;
          break;
        }
      }

      if (!isUsed) {
        console.log(`Deleting unused file: ${filePath}`);
        fs.unlinkSync(filePath);
        deletedCount++;
      }
    }
  }

  console.log(`Cleanup complete. Deleted ${deletedCount} unused files.`);
}

runCleanup()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
