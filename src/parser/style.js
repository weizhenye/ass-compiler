import { assign } from '../utils.js';

export function parseStyle(text, format) {
  const values = text.match(/Style\s*:\s*(.*)/i)[1].split(/\s*,\s*/);
  return assign({}, ...format.map((fmt, idx) => ({ [fmt]: values[idx] })));
}
