import { parseTag } from './tag.js';

export function parseTags(text) {
  const tags = [];
  let depth = 0;
  let str = '';
  // `\b\c` -> `b\c\`
  // `a\b\c` -> `b\c\`
  const transText = text.split('\\').slice(1).concat('').join('\\');
  for (let i = 0; i < transText.length; i++) {
    const x = transText[i];
    if (x === '(') depth++;
    if (x === ')') depth--;
    if (depth < 0) depth = 0;
    if (!depth && x === '\\') {
      if (str) {
        tags.push(str);
      }
      str = '';
    } else {
      str += x;
    }
  }
  return tags.map(parseTag);
}
