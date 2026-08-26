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

  // Replace font-[Vera] in heading tags
  content = content.replace(/<(h[1-6])([^>]*)className=["']([^"']*)["']/g, (match, tag, beforeClass, classes) => {
    const newClasses = classes.split(' ').filter(c => c !== 'font-[Vera]').join(' ');
    if (newClasses.trim() === '') {
      return `<${tag}${beforeClass}`;
    }
    return `<${tag}${beforeClass}className="${newClasses}"`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
