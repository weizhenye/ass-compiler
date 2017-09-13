import { parseDrawing } from './drawing.js';
import { parseTags } from './tags.js';

export function parseText(text) {
  const pairs = text.split(/{([^{}]*?)}/);
  const parsed = [];
  if (pairs[0].length) {
    parsed.push({ tags: [], text: pairs[0], drawing: [] });
  }
  for (let i = 1; i < pairs.length; i += 2) {
    const fragment = { tags: parseTags(pairs[i]) };
    const pTag = fragment.tags
      .filter(tag => tag.p !== undefined)
      .pop();
    const isDrawing = pTag && pTag.p;
    fragment.text = isDrawing ? '' : pairs[i + 1];
    fragment.drawing = isDrawing ? parseDrawing(pairs[i + 1]) : [];
    parsed.push(fragment);
  }
  return {
    raw: text,
    combined: parsed.map(frag => frag.text).join(''),
    parsed,
  };
}
