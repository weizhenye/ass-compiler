export function parseStyle(text, format) {
  const values = text.match(/Style\s*:\s*(.*)/i)[1].split(/\s*,\s*/);
  return Object.assign({}, ...format.map((fmt, idx) => ({ [fmt]: values[idx] })));
}
