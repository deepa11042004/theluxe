const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..'); // c:\Projects\theluxe\frontend

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

let count = 0;
walkDir(targetDir, function(filePath) {
  const ext = path.extname(filePath);
  if (['.tsx', '.ts', '.jsx', '.js', '.css', '.json'].includes(ext)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = content
      .replace(/#E39F25/gi, '#E39F25')
      .replace(/rgba\(179,\s*142,\s*70/gi, 'rgba(227,159,37')
      .replace(/#E39F25/gi, '#E39F25')
      .replace(/rgba\(212,\s*175,\s*55/gi, 'rgba(227,159,37');
    
    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`Updated: ${path.relative(targetDir, filePath)}`);
      count++;
    }
  }
});

console.log(`Total files updated: ${count}`);
