const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('components').concat(walk('app'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Find all `<p ... className="..." ...>` and replace text-neutral-* or text-gray-* with text-black
  content = content.replace(/<p\s+[^>]*className=["']([^"']*)["'][^>]*>/g, (match, classes) => {
    const newClasses = classes.replace(/\btext-(neutral|gray|zinc|slate)-(400|500|600|700|800)\b/g, 'text-black');
    if (newClasses !== classes) {
      modified = true;
      return match.replace(classes, newClasses);
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
