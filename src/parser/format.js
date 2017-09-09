export function parseFormat(text) {
  return text.match(/Format\s*:\s*(.*)/i)[1].split(/\s*,\s*/);
}
