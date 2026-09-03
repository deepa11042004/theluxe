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

  // Replace text-color classes on <p> tags
  content = content.replace(/<p([^>]*)className="([^"]*)"/g, (match, p1, classes) => {
    const newClasses = classes.split(' ').filter(c => {
      // Remove classes like text-black/90, text-neutral-500, opacity-80, etc.
      // But we shouldn't remove text-white! Keep text-white for dark backgrounds.
      // And we remove `text-black` because global css will handle it.
      if (c === 'text-white' || c.startsWith('text-white/')) return true;
      if (c.startsWith('text-gray-') || c.startsWith('text-neutral-') || c.startsWith('text-slate-')) return false;
      if (c === 'text-black' || c.startsWith('text-black/')) return false;
      if (c.startsWith('opacity-')) return false;
      if (c === 'font-light' || c === 'font-medium') return false; // removing these makes text appear darker and matches the request's font-weight 400
      return true;
    }).join(' ');

    if (newClasses.trim() === '') {
      return `<p${p1}`; // remove className attribute entirely if empty
    }
    return `<p${p1}className="${newClasses.trim()}"`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
