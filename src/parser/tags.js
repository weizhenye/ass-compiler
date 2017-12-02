import { parseTag } from './tag.js';

export function parseTags(text) {
  const tags = [];
  let depth = 0;
  let str = '';
  for (let i = 0; i < text.length; i++) {
    const x = text[i];
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
  tags.push(str);
  return tags.map(parseTag);
}
