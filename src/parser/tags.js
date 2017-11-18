import { parseTag } from './tag.js';

export function parseTags(text) {
  let depth = 0;
  return text
    .split('')
    .map((x) => {
      if (x === '(') depth++;
      if (x === ')') depth--;
      if (depth < 0) depth = 0;
      return (depth && x === '\\') ? '\n' : x;
    })
    .join('')
    .split(/\\/)
    .slice(1)
    .map(x => x.replace(/\n/g, '\\'))
    .map(parseTag);
}
