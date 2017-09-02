import parseDialogue from './dialogue';
import parseFormat from './format';
import parseStyle from './style';

function parse(text) {
  const tree = {
    info: {},
    styles: { format: [], style: [] },
    events: { format: [], comment: [], dialogue: [] },
  };
  let p = [];
  const lines = text.split(/\r?\n/);
  let state = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^;/.test(line)) continue;

    if (/^\[Script Info\]/i.test(line)) state = 1;
    else if (/^\[V4\+? Styles\]/i.test(line)) state = 2;
    else if (/^\[Events\]/i.test(line)) state = 3;
    else if (/^\[.*\]/.test(line)) state = 0;

    if (state === 0) continue;
    if (state === 1) {
      if (/:/.test(line)) {
        p = line.match(/(.*?)\s*:\s*(.*)/);
        tree.info[p[1]] = p[2];
      }
    }
    if (state === 2) {
      if (/^Format\s*:/i.test(line)) {
        tree.styles.format = parseFormat(line);
      }
      if (/^Style\s*:/i.test(line)) {
        tree.styles.style.push(parseStyle(line));
      }
    }
    if (state === 3) {
      if (/^Format\s*:/i.test(line)) {
        tree.events.format = parseFormat(line);
      }
      if (/^(?:Comment|Dialogue)\s*:/i.test(line)) {
        p = line.match(/^(\w+?)\s*:\s*(.*)/i);
        tree.events[p[1].toLowerCase()].push(
          parseDialogue(p[2], tree.events.format)
        );
      }
    }
  }

  return tree;
}

export default parse;
