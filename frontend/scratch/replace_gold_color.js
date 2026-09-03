const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        processDir(fullPath);
      }
    } else if (/\.(tsx|ts|js|jsx|css)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = false;

      if (/EFBF04/i.test(content) || /d6ab03/i.test(content)) {
        content = content.replace(/#EFBF04/gi, '#B38E46');
        content = content.replace(/#d6ab03/gi, '#997734');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

const rootDir = path.resolve(__dirname, '..');
console.log(`Scanning in ${rootDir}...`);
processDir(path.join(rootDir, 'components'));
processDir(path.join(rootDir, 'app'));
console.log('Finished replacing #EFBF04 with #B38E46!');
