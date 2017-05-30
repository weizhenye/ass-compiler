function parseDrawing(text) {
  return text
    .toLowerCase()
    .replace(/([mnlbspc])/g, ' $1 ')
    .trim()
    .replace(/\s+/g, ' ')
    .split(/\s(?=[mnlbspc])/)
    .map(function (cmd) {
      return cmd.split(' ');
    });
}

export default parseDrawing;
