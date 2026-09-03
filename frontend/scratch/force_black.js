const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
};

const files = walk('./components').concat(walk('./app'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // We want to replace text-gray/neutral classes with text-black, 
  // and remove font-light to ensure it's not looking grey due to thinness.
  // We'll do this globally for all className strings, but carefully.
  content = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classes) => {
    const newClasses = classes.split(' ').map(c => {
      if (c === 'text-neutral-700' || c === 'text-neutral-600' || c === 'text-neutral-500' ||
          c === 'text-gray-700' || c === 'text-gray-600' || c === 'text-gray-500' ||
          c === 'text-black/90' || c === 'text-black/80' || c === 'text-black/70') {
        return 'text-black';
      }
      if (c === 'font-light') {
        return ''; // remove font-light to let font-weight 400 (normal) take over
      }
      if (c === 'opacity-80' || c === 'opacity-90') {
        return '';
      }
      return c;
    }).filter(Boolean).join(' ');

    return `className=${quote}${newClasses}${quote}`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
