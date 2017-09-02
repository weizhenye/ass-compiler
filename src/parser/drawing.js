function parseDrawing(text) {
  return text
    .toLowerCase()
    .replace(/([mnlbspc])/g, ' $1 ')
    .trim()
    .replace(/\s+/g, ' ')
    .split(/\s(?=[mnlbspc])/)
    .map(cmd => cmd.split(' '));
}

export default parseDrawing;
