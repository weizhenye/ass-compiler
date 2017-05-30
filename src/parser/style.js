function parseStyle(text) {
  return text.match(/Style\s*:\s*(.*)/i)[1].split(/\s*,\s*/);
}

export default parseStyle;
