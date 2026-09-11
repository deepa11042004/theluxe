const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// We can use a node script with a simple unzipper / inspection or powershell script to dump entries
const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('C:/Users/ADMIN/Downloads/the luxe/Hotels zip file.zip')
$entries = $zip.Entries | Select-Object -Property FullName, Length
$entries | ConvertTo-Json -Depth 2
$zip.Dispose()
`;

fs.writeFileSync('temp_zip.ps1', psScript);
const output = execSync('powershell -ExecutionPolicy Bypass -File temp_zip.ps1', { maxBuffer: 10 * 1024 * 1024 }).toString();
fs.unlinkSync('temp_zip.ps1');

const entries = JSON.parse(output);
console.log('Total entries:', entries.length);

const folderMap = new Map();

for (const entry of entries) {
  const full = entry.FullName.replace(/\\\\/g, '/');
  if (full.endsWith('/')) {
    // directory
    continue;
  }
  const parts = full.split('/');
  // Expected structure: "Hotels zip file/Hotels/XX Hotel Name/image.webp" or "Hotels/XX Hotel Name/image.webp"
  // Find the segment that starts with 2 digits or number
  const fileName = parts[parts.length - 1];
  const hotelFolder = parts[parts.length - 2];
  
  if (!folderMap.has(hotelFolder)) {
    folderMap.set(hotelFolder, []);
  }
  folderMap.get(hotelFolder).push({
    fileName,
    size: entry.Length,
    path: full
  });
}

console.log('Total hotel folders with files:', folderMap.size);

const sortedFolders = Array.from(folderMap.keys()).sort((a, b) => {
  const numA = parseInt(a.match(/^\\d+/)?.[0] || '0', 10);
  const numB = parseInt(b.match(/^\\d+/)?.[0] || '0', 10);
  return numA - numB;
});

sortedFolders.forEach((f) => {
  const files = folderMap.get(f).map(x => x.fileName).sort();
  console.log(`Folder: "${f}" -> Files (${files.length}): ${files.join(', ')}`);
});
