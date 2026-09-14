import fs from 'fs';
import path from 'path';

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

function getAllCodeFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', 'public', '.git'].includes(file)) {
        arrayOfFiles = getAllCodeFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'].some(ext => file.endsWith(ext))) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function runCleanup() {
  const frontendDir = path.join(__dirname, '../../../frontend');
  const imgDir = path.join(frontendDir, 'public', 'Img');

  let imgFiles: string[] = [];
  if (fs.existsSync(imgDir)) {
    imgFiles = getAllFiles(imgDir);
  }

  const codeFiles = getAllCodeFiles(frontendDir);
  
  // Load all code content into memory
  const allCodeContent = codeFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

  let deletedCount = 0;

  for (const filePath of imgFiles) {
    const fileName = path.basename(filePath);
    
    // Ignore .DS_Store or similar
    if (fileName.startsWith('.')) continue;

    // We can search for the filename in the entire code content
    if (!allCodeContent.includes(fileName)) {
      console.log(`Deleting unused static file: ${filePath}`);
      fs.unlinkSync(filePath);
      deletedCount++;
    }
  }

  console.log(`Cleanup complete. Deleted ${deletedCount} unused static files.`);
}

runCleanup().catch(console.error);
