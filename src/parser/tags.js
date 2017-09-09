import { parseTag } from './tag';

export function parseTags(text) {
  return text
    .replace(/\((?:[^()]+|\([^()]*\))*\)/g, x => x.replace(/\\/g, '\n'))
    .split(/\\/)
    .slice(1)
    .map(x => x.replace(/\n/g, '\\'))
    .map(parseTag);
}
